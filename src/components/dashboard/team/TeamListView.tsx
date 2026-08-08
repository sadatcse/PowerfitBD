"use client";

import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LuPencil, LuPlus, LuTrash2 } from "react-icons/lu";
import { ImageWithSkeleton } from "@/components/common/ImageWithSkeleton";
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
import { formatDate } from "@/utils/format";
import { PLACEHOLDER_IMAGE } from "@/utils/image";
import { type ApiResponse, type PaginatedData } from "@/types/api";
import { type TeamMember } from "@/types/team";

const FILTER_OPTIONS = [{ label: "All statuses", value: "all" }, ...STATUS_OPTIONS];

async function fetchTeam(params: Record<string, string | number | undefined>) {
  const { data } = await apiClient.get<ApiResponse<PaginatedData<TeamMember>>>(
    API_ROUTES.team,
    { params },
  );
  return data.data;
}

/** Full team list: search, filter, sort, paginate, edit, delete. */
export function TeamListView() {
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
      "team",
      "list",
      { page, limit, sortBy, sortOrder, search: debouncedSearch, status },
    ],
    queryFn: () =>
      fetchTeam({
        page,
        limit,
        sortBy,
        sortOrder,
        search: debouncedSearch || undefined,
        status: status !== "all" ? status : undefined,
      }),
    placeholderData: (previous) => previous,
  });

  const handleDelete = async (member: TeamMember) => {
    const confirmed = await confirm({
      title: "Delete this record?",
      message: `"${member.name}" will be permanently removed. This action cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!confirmed) return;

    try {
      await apiClient.delete(API_ROUTES.teamById(member._id));
      toast.success("Team member deleted.");
      await queryClient.invalidateQueries({ queryKey: ["team", "list"] });
    } catch (error) {
      toast.apiError(toApiError(error));
    } finally {
      close();
    }
  };

  const columns: Column<TeamMember>[] = [
    {
      key: "name",
      header: "Member",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden border border-line bg-ink-950">
            <ImageWithSkeleton
              src={row.image || PLACEHOLDER_IMAGE}
              alt=""
              fill
              sizes="40px"
              className="object-cover"
              wrapperClassName="size-full"
            />
          </div>
          <span className="font-bold text-white">{row.name}</span>
        </div>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      sortable: true,
      render: (row) => row.designation,
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
      header: "Actions",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <Link
            href={ROUTES.dashboard.teamEdit(row._id)}
            aria-label={`Edit ${row.name}`}
            title="Edit Member"
            className="grid size-8 place-items-center border border-line text-mist transition-colors hover:border-brand hover:text-brand"
          >
            <LuPencil className="size-3.5" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => void handleDelete(row)}
            aria-label={`Delete ${row.name}`}
            title="Delete Member"
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
        title="Team Members"
        description="Manage the coaches and staff shown on the public Team page."
        action={
          <Button href={ROUTES.dashboard.teamCreate} leftIcon={<LuPlus className="size-4" aria-hidden />}>
            Add Member
          </Button>
        }
      />

      <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by name or designation…"
          label="Search team members"
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
        emptyTitle="No team members yet"
        emptyDescription="Add your first coach or staff member to have them appear here and on the public Team page."
        emptyAction={
          <Button href={ROUTES.dashboard.teamCreate} size="sm">
            Add Member
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
