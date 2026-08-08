"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LuPencil, LuPlus, LuStar, LuTrash2 } from "react-icons/lu";
import { Button } from "@/components/common/Button";
import { SearchBox } from "@/components/common/SearchBox";
import { Select } from "@/components/forms/Select";
import { StatusBadge } from "@/components/common/Badge";
import { DataTable, type Column } from "@/components/table/DataTable";
import { Pagination } from "@/components/pagination/Pagination";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useConfirm } from "@/hooks/useConfirm";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { useToast } from "@/hooks/useToast";
import { apiClient, toApiError } from "@/lib/api/client";
import { API_ROUTES, ROUTES } from "@/constants/routes";
import { STATUS_OPTIONS } from "@/constants/config";
import { truncate, formatDate } from "@/utils/format";
import { PLACEHOLDER_IMAGE } from "@/utils/image";
import { type ApiResponse, type PaginatedData } from "@/types/api";
import { type Testimonial } from "@/types/testimonial";

const FILTER_OPTIONS = [{ label: "All statuses", value: "all" }, ...STATUS_OPTIONS];

async function fetchTestimonials(
  params: Record<string, string | number | undefined>,
) {
  const { data } = await apiClient.get<
    ApiResponse<PaginatedData<Testimonial>>
  >(API_ROUTES.testimonials, { params });
  return data.data;
}

/** Full testimonial list: search, filter, sort, paginate, edit, delete. */
export function TestimonialListView() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { confirm, dialog, close } = useConfirm();

  const {
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    status,
    setPage,
    setSearch,
    setStatus,
    toggleSort,
  } = usePagination();

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "testimonials",
      "list",
      { page, limit, sortBy, sortOrder, search: debouncedSearch, status },
    ],
    queryFn: () =>
      fetchTestimonials({
        page,
        limit,
        sortBy,
        sortOrder,
        search: debouncedSearch || undefined,
        status: status !== "all" ? status : undefined,
      }),
    placeholderData: (previous) => previous,
  });

  const handleDelete = async (testimonial: Testimonial) => {
    const confirmed = await confirm({
      title: "Delete this record?",
      message: `The review from "${testimonial.clientName}" will be permanently removed. This action cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!confirmed) return;

    try {
      await apiClient.delete(API_ROUTES.testimonialById(testimonial._id));
      toast.success("Testimonial deleted.");
      await queryClient.invalidateQueries({ queryKey: ["testimonials", "list"] });
    } catch (error) {
      toast.apiError(toApiError(error));
    } finally {
      close();
    }
  };

  const columns: Column<Testimonial>[] = [
    {
      key: "clientName",
      header: "Client",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-line bg-ink-950">
            <Image
              src={row.image || PLACEHOLDER_IMAGE}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-bold text-white">{row.clientName}</p>
            {row.company ? (
              <p className="text-body-xs text-muted">{row.company}</p>
            ) : null}
          </div>
        </div>
      ),
    },
    {
      key: "review",
      header: "Review",
      hideOnMobile: true,
      render: (row) => truncate(row.review, 60),
    },
    {
      key: "rating",
      header: "Rating",
      sortable: true,
      render: (row) => (
        <span className="inline-flex items-center gap-1 text-gold">
          <LuStar className="size-3.5 fill-current" aria-hidden />
          {row.rating}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "updatedAt",
      header: "Updated",
      sortable: true,
      hideOnMobile: true,
      render: (row) => formatDate(row.updatedAt),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Link
            href={ROUTES.dashboard.testimonialEdit(row._id)}
            aria-label={`Edit review from ${row.clientName}`}
            className="grid size-8 place-items-center border border-line text-mist transition-colors hover:border-brand hover:text-brand"
          >
            <LuPencil className="size-3.5" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => void handleDelete(row)}
            aria-label={`Delete review from ${row.clientName}`}
            title="Delete Review"
            className="grid size-8 place-items-center border border-line text-mist transition-colors hover:border-danger hover:text-danger hover:bg-danger/10"
          >
            <LuTrash2 className="size-3.5" aria-hidden />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Curate the client reviews shown across the public site."
        action={
          <Button
            href={ROUTES.dashboard.testimonialCreate}
            leftIcon={<LuPlus className="size-4" aria-hidden />}
          >
            Add Testimonial
          </Button>
        }
      />

      <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by client or company…"
          label="Search testimonials"
          className="sm:max-w-sm"
        />
        <Select
          aria-label="Filter by status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          options={FILTER_OPTIONS}
          className="sm:w-48"
        />
      </div>

      <DataTable
        columns={columns}
        rows={data?.items ?? []}
        rowKey={(row) => row._id}
        loading={isLoading || (isFetching && !data)}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={toggleSort}
        emptyTitle="No testimonials yet"
        emptyDescription="Add your first client review to have it appear here and across the public site."
        emptyAction={
          <Button href={ROUTES.dashboard.testimonialCreate} size="sm">
            Add Testimonial
          </Button>
        }
      />

      {data ? (
        <Pagination meta={data.meta} onPageChange={setPage} className="mt-6" />
      ) : null}

      {dialog}
    </>
  );
}
