import "server-only";
import { type Model, type QueryFilter } from "mongoose";
import { connectToDatabase, serialize } from "@/lib/db/mongoose";
import { buildSearchFilter, buildSort, parseListQuery } from "@/lib/api/query";
import { NotFoundError } from "@/lib/api/errors";
import { buildPaginationMeta } from "@/utils/pagination";
import { sanitizeMongoInput } from "@/utils/sanitize";
import { type PaginatedData } from "@/types/api";

/**
 * Generic data-access layer shared by the Team and Testimonial modules.
 *
 * Both resources need identical list/search/sort/paginate/CRUD behaviour, so
 * it lives here once. Adding a future module (Blog, Gallery, Services…) means
 * supplying a model plus its field allowlists — no new query code.
 */

export interface CrudServiceConfig<TDoc> {
  /** Mongoose model this service operates on. */
  model: Model<TDoc>;
  /** Human label used in error messages, e.g. "Team member". */
  resourceName: string;
  /** Fields the `?search=` term is matched against. */
  searchFields: readonly string[];
  /** Fields that may appear in `?sortBy=`. */
  sortFields: readonly string[];
  /** Fallback sort when none is supplied. */
  defaultSortBy?: string;
}

export function createCrudService<TDoc, TSerialized>(
  config: CrudServiceConfig<TDoc>,
) {
  const {
    model,
    resourceName,
    searchFields,
    sortFields,
    defaultSortBy = "displayOrder",
  } = config;

  return {
    /** Paginated list with search, status filter, and sorting. */
    async list(searchParams: URLSearchParams): Promise<PaginatedData<TSerialized>> {
      await connectToDatabase();

      const query = parseListQuery(searchParams, sortFields, defaultSortBy);

      const filter: QueryFilter<TDoc> = {
        ...buildSearchFilter<TDoc>(query.search, searchFields),
        ...(query.status ? { status: query.status } : {}),
      } as QueryFilter<TDoc>;

      const skip = (query.page - 1) * query.limit;

      // Run the page and the count together — they are independent.
      const [items, total] = await Promise.all([
        model
          .find(filter)
          .sort(buildSort(query.sortBy, query.sortOrder))
          .skip(skip)
          .limit(query.limit)
          .lean(),
        model.countDocuments(filter),
      ]);

      return {
        items: serialize<TSerialized[]>(items),
        meta: buildPaginationMeta(query.page, query.limit, total),
      };
    },

    /** Every active record in display order — used by the public pages. */
    async listPublic(limit = 100): Promise<TSerialized[]> {
      await connectToDatabase();
      const items = await model
        .find({ status: "active" } as QueryFilter<TDoc>)
        .sort({ displayOrder: 1, createdAt: -1 })
        .limit(limit)
        .lean();
      return serialize<TSerialized[]>(items);
    },

    async getById(id: string): Promise<TSerialized> {
      await connectToDatabase();
      const doc = await model.findById(id).lean();
      if (!doc) throw new NotFoundError(resourceName);
      return serialize<TSerialized>(doc);
    },

    async create(input: Record<string, unknown>): Promise<TSerialized> {
      await connectToDatabase();
      // `new` + `save()` rather than `create()` so schema validators run
      // against a typed document instead of a loose object literal.
      const doc = new model(sanitizeMongoInput(input));
      await doc.save();
      return serialize<TSerialized>(doc.toObject());
    },

    async update(
      id: string,
      input: Record<string, unknown>,
    ): Promise<TSerialized> {
      await connectToDatabase();
      const doc = await model
        .findByIdAndUpdate(
          id,
          { $set: sanitizeMongoInput(input) },
          { new: true, runValidators: true },
        )
        .lean();
      if (!doc) throw new NotFoundError(resourceName);
      return serialize<TSerialized>(doc);
    },

    async remove(id: string): Promise<{ _id: string }> {
      await connectToDatabase();
      const doc = await model.findByIdAndDelete(id).lean();
      if (!doc) throw new NotFoundError(resourceName);
      return { _id: id };
    },

    /** Dashboard stat tiles. */
    async counts(): Promise<{ total: number; active: number; inactive: number }> {
      await connectToDatabase();
      const [total, active] = await Promise.all([
        model.countDocuments({}),
        model.countDocuments({ status: "active" } as QueryFilter<TDoc>),
      ]);
      return { total, active, inactive: total - active };
    },
  };
}
