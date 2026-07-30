import mongoose, { type Mongoose } from "mongoose";

/**
 * Serverless-safe Mongoose connection.
 *
 * Vercel reuses a warm lambda across invocations but re-evaluates modules on
 * cold start, so the connection is cached on `globalThis`. Without this every
 * request would open a new pool and exhaust the Atlas connection limit.
 */

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = globalThis._mongooseCache ?? {
  conn: null,
  promise: null,
};

globalThis._mongooseCache = cached;

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env.local and fill it in.",
    );
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB_NAME ?? "powerfit",
      // Buffering hides connection failures behind a timeout; fail fast instead.
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
      socketTimeoutMS: 45_000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the rejected promise so the next request retries the connection.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

/** Strips Mongo internals and converts ObjectIds/Dates to JSON-safe values. */
export function serialize<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}
