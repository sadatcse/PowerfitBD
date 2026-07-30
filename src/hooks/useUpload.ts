"use client";

import { useCallback, useState } from "react";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { getFirebaseStorage } from "@/config/firebase.client";
import { validateImageFile } from "@/utils/image";
import { slugify } from "@/utils/format";

/**
 * Uploads an image straight from the browser to Firebase Storage and returns
 * the public download URL (which is what gets persisted in MongoDB).
 *
 * Uploading client-side keeps large files off the serverless function — Vercel
 * has a request body limit and a read-only filesystem, so proxying the bytes
 * through a route handler would be both slower and size-capped.
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
      setProgress(0);

      try {
        const extension = file.name.split(".").pop() ?? "jpg";
        const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
        const path = `${folder}/${Date.now()}-${base}.${extension}`;

        const task = uploadBytesResumable(
          storageRef(getFirebaseStorage(), path),
          file,
          { contentType: file.type, cacheControl: "public,max-age=31536000" },
        );

        const url = await new Promise<string>((resolve, reject) => {
          task.on(
            "state_changed",
            (snapshot) => {
              setProgress(
                Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                ),
              );
            },
            reject,
            () => {
              getDownloadURL(task.snapshot.ref).then(resolve).catch(reject);
            },
          );
        });

        return url;
      } catch (uploadError) {
        const message =
          uploadError instanceof Error
            ? uploadError.message
            : "Upload failed. Please try again.";
        setError(message);
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
