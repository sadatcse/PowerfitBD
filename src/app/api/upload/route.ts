import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type NextRequest } from "next/server";
import { BadRequestError, UnauthorizedError } from "@/lib/api/errors";
import { enforceRateLimit, getClientIp } from "@/lib/api/rate-limit";
import { ok, withErrorHandling } from "@/lib/api/response";
import { getCurrentUser } from "@/lib/auth/guard";
import { slugify } from "@/utils/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * POST /api/upload
 * Accepts FormData with `file` and optional `folder`.
 * Uploads the image directly to AWS S3 under the `powerfit/` folder prefix key.
 */
export const POST = withErrorHandling(async (request: NextRequest) => {
  enforceRateLimit(`upload:${getClientIp(request)}`, {
    limit: 30,
    windowMs: 60_000,
  });

  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError("Authentication required to upload images.");
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    throw new BadRequestError("No file uploaded or invalid file object.");
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new BadRequestError(
      `Unsupported file format: ${file.type}. Allowed: JPEG, PNG, WebP, AVIF, GIF, SVG.`,
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new BadRequestError(
      `File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum limit of 10MB.`,
    );
  }

  const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
  const bucketName = process.env.AWS_STORAGE_BUCKET_NAME || "multigym-website";
  const region = process.env.AWS_S3_REGION || "ap-southeast-1";

  if (!accessKeyId || !secretAccessKey) {
    throw new BadRequestError("AWS S3 storage credentials are not configured.");
  }

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const rawFolder = (formData.get("folder") as string) || "uploads";
  const sanitizedFolder = slugify(rawFolder) || "uploads";

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";

  // Target object key under powerfit/ folder in S3 bucket
  const key = `powerfit/${sanitizedFolder}/${Date.now()}-${baseName}.${extension}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: "public, max-age=31536000",
    }),
  );

  const endpointUrl =
    process.env.AWS_S3_ENDPOINT_URL ||
    `https://${bucketName}.s3.${region}.amazonaws.com`;
  
  const baseUrl = endpointUrl.endsWith("/")
    ? endpointUrl.slice(0, -1)
    : endpointUrl;

  const url = `${baseUrl}/${key}`;

  return ok({ url, key }, "Image uploaded to AWS S3 successfully.");
});
