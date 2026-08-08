"use client";

import { useCallback, useState } from "react";
import { apiClient, toApiError } from "@/lib/api/client";
import { type ApiResponse } from "@/types/api";
import { validateImageFile } from "@/utils/image";

interface UploadResponse {
  url: string;
  key: string;
}

/**
 * Uploads an image via our AWS S3 backend route handler (`/api/upload`)
 * storing files inside the `powerfit/` folder prefix on S3.
 */
export function useUpload(folder = "uploads") {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File): Promise<string | null> => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error ?? "Invalid file.");
        return null;
      }

      setError(null);
      setUploading(true);
      setProgress(20);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        setProgress(50);
        const { data } = await apiClient.post<ApiResponse<UploadResponse>>(
          "/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        setProgress(100);
        return data.data.url;
      } catch (uploadError) {
        const apiErr = toApiError(uploadError);
        setError(apiErr.message || "Upload failed. Please try again.");
        return null;
      } finally {
        setUploading(false);
      }
    },
    [folder],
  );

  const reset = useCallback(() => {
    setProgress(0);
    setError(null);
    setUploading(false);
  }, []);

  return { upload, uploading, progress, error, reset };
}
