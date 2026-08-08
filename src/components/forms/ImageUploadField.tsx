"use client";

import Image from "next/image";
import { useRef } from "react";
import { LuUpload } from "react-icons/lu";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/forms/Input";
import { useUpload } from "@/hooks/useUpload";
import { useToast } from "@/hooks/useToast";
import { PLACEHOLDER_IMAGE } from "@/utils/image";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  /** AWS S3 subfolder the file is written to under powerfit/, e.g. "team". */
  folder: string;
  hasError?: boolean;
}

/**
 * Combines an AWS S3 upload button with a manual URL fallback.
 * Images are uploaded to AWS S3 bucket under `powerfit/{folder}/`.
 */
export function ImageUploadField({
  value,
  onChange,
  folder,
  hasError,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, uploading, progress, error } = useUpload(folder);
  const toast = useToast();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const url = await upload(file);
    if (url) {
      onChange(url);
      toast.success("Image uploaded", "Successfully stored in AWS S3.");
    } else {
      toast.error(
        "Upload failed",
        error || "Check the file type and size (max 10MB), then try again.",
      );
    }
  };

  return (
    <div className="flex items-start gap-4">
      <div className="relative size-24 shrink-0 overflow-hidden border border-line bg-ink-950 rounded-lg shadow-inner">
        <Image
          src={value || PLACEHOLDER_IMAGE}
          alt=""
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
          className="hidden"
          onChange={(event) => {
            void handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => inputRef.current?.click()}
          loading={uploading}
          leftIcon={!uploading ? <LuUpload className="size-4" aria-hidden /> : undefined}
          className="self-start text-xs font-semibold uppercase tracking-wider"
        >
          {uploading ? `Uploading to S3... ${progress}%` : "Upload AWS S3 Image"}
        </Button>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Or paste an image URL"
          hasError={hasError}
        />
      </div>
    </div>
  );
}
