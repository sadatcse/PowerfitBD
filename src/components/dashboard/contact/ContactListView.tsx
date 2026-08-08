"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LuMail, LuTrash2, LuEye } from "react-icons/lu";
import { SearchBox } from "@/components/common/SearchBox";
import { StatusBadge } from "@/components/common/Badge";
import { DataTable, type Column } from "@/components/table/DataTable";
import { Pagination } from "@/components/pagination/Pagination";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Modal } from "@/components/modal/Modal";
import { useAuth } from "@/context/AuthContext";
import { useConfirm } from "@/hooks/useConfirm";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { useToast } from "@/hooks/useToast";
import { apiClient, toApiError } from "@/lib/api/client";
import { ROLES } from "@/constants/config";
import { formatDate } from "@/utils/format";
import { type ApiResponse, type PaginatedData } from "@/types/api";

export interface ContactItem {
  _id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: string;
  updatedAt: string;
}

async function fetchContacts(params: Record<string, string | number | undefined>) {
  const { data } = await apiClient.get<ApiResponse<PaginatedData<ContactItem>>>(
    "/api/contact",
    { params },
  );
  return data.data;
}

export function ContactListView() {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { confirm, dialog, close } = useConfirm();
  const [selectedMessage, setSelectedMessage] = useState<ContactItem | null>(null);

  const {
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    setPage,
    setSearch,
    toggleSort,
  } = usePagination();

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "contact",
      "list",
      { page, limit, sortBy, sortOrder, search: debouncedSearch },
    ],
    queryFn: () =>
      fetchContacts({
        page,
        limit,
        sortBy,
        sortOrder,
        search: debouncedSearch || undefined,
      }),
    placeholderData: (previous) => previous,
  });

  const handleOpenMessage = async (item: ContactItem) => {
    setSelectedMessage(item);
    if (item.status === "unread") {
      try {
        await apiClient.patch(`/api/contact/${item._id}`, { status: "read" });
        await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
      } catch {
        // Non-critical background status update
      }
    }
  };

  const handleDelete = async (item: ContactItem) => {
    const confirmed = await confirm({
      title: "Delete message?",
      message: `Enquiry from "${item.fullName}" will be permanently removed.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!confirmed) return;

    try {
      await apiClient.delete(`/api/contact/${item._id}`);
      toast.success("Enquiry deleted.");
      await queryClient.invalidateQueries({ queryKey: ["contact", "list"] });
    } catch (error) {
      toast.apiError(toApiError(error));
    } finally {
      close();
    }
  };

  const columns: Column<ContactItem>[] = [
    {
      key: "fullName",
      header: "Sender",
      sortable: true,
      render: (row) => (
        <div>
          <div className="font-bold text-white">{row.fullName}</div>
          <div className="text-xs text-muted">{row.email}</div>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <span className="font-medium text-mist max-w-xs truncate inline-block">
          {row.subject}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => <StatusBadge status={row.status === "unread" ? "inactive" : "active"} />,
    },
    {
      key: "createdAt",
      header: "Received",
      sortable: true,
      hideOnMobile: true,
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (row) => (
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => void handleOpenMessage(row)}
            aria-label={`View message from ${row.fullName}`}
            className="grid size-8 place-items-center border border-line text-mist transition-colors hover:border-brand hover:text-brand"
          >
            <LuEye className="size-3.5" aria-hidden />
          </button>
          {user?.role === ROLES.admin ? (
            <button
              type="button"
              onClick={() => void handleDelete(row)}
              aria-label={`Delete message from ${row.fullName}`}
              className="grid size-8 place-items-center border border-line text-mist transition-colors hover:border-danger hover:text-danger"
            >
              <LuTrash2 className="size-3.5" aria-hidden />
            </button>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Contact Enquiries"
        description="View and manage messages received from visitors through the public contact form."
      />

      <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search by sender name, email, or subject…"
          label="Search contact messages"
          className="sm:max-w-sm"
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
        emptyTitle="No enquiries received yet"
        emptyDescription="Public contact form submissions will automatically appear here."
      />

      {data ? (
        <Pagination meta={data.meta} onPageChange={setPage} className="mt-6" />
      ) : null}

      {/* View Message Modal */}
      {selectedMessage ? (
        <Modal
          open={Boolean(selectedMessage)}
          onClose={() => setSelectedMessage(null)}
          title="Direct Transmission Detail"
        >
          <div className="flex flex-col gap-4 pt-2">
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-line/60 bg-ink-950 p-4 text-xs">
              <div>
                <span className="text-muted uppercase font-semibold block mb-1">From</span>
                <span className="font-bold text-white text-sm">{selectedMessage.fullName}</span>
                <a href={`mailto:${selectedMessage.email}`} className="text-brand hover:underline block mt-0.5">
                  {selectedMessage.email}
                </a>
              </div>
              <div className="text-right">
                <span className="text-muted uppercase font-semibold block mb-1">Received</span>
                <span className="text-mist">{formatDate(selectedMessage.createdAt)}</span>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-gold block mb-1">Subject</span>
              <p className="font-bold text-white text-base">{selectedMessage.subject}</p>
            </div>

            <div className="border-t border-line/60 pt-4">
              <span className="text-xs uppercase font-semibold tracking-wider text-muted block mb-2">Message Body</span>
              <div className="rounded-xl border border-line bg-ink-950/80 p-4 text-sm text-mist whitespace-pre-wrap leading-relaxed">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-2 border-t border-line/60">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-brand-bright transition-colors"
              >
                <LuMail className="size-4" /> Reply via Email
              </a>
            </div>
          </div>
        </Modal>
      ) : null}

      {dialog}
    </>
  );
}
