"use client";

import { LuTriangleAlert } from "react-icons/lu";
import { Button } from "../common/Button";
import { Modal } from "../modal/Modal";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** `danger` styles the confirm button red — used for deletions. */
  tone?: "danger" | "default";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Generic confirmation prompt. Pair with `useConfirm` for promise-style use. */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "default",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={loading ? () => undefined : onCancel}
      size="sm"
      // Prevents an accidental backdrop click while the action is in flight.
      closeOnBackdrop={!loading}
      footer={
        <>
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        {tone === "danger" ? (
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-danger/15 text-xl text-danger">
            <LuTriangleAlert aria-hidden />
          </span>
        ) : null}
        <div>
          <h2 className="text-display-4 text-white">{title}</h2>
          <p className="mt-2 text-body-sm text-sand">{message}</p>
        </div>
      </div>
    </Modal>
  );
}

/** Deletion-specific preset so every delete flow reads identically. */
export function DeleteDialog({
  open,
  itemName,
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  itemName: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <ConfirmDialog
      open={open}
      tone="danger"
      title="Delete this record?"
      message={`"${itemName}" will be permanently removed. This action cannot be undone.`}
      confirmLabel="Delete"
      loading={loading ?? false}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
