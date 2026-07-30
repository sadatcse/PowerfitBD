# Powerfit — Build Status

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind 4 · MongoDB/Mongoose · Firebase Auth

Verified green: `tsc --noEmit`, `eslint --max-warnings=0`, `next build`.

---

## Getting started

```bash
cp .env.example .env.local
```

Fill in `MONGODB_URI`, the `NEXT_PUBLIC_FIREBASE_*` values, the
`FIREBASE_ADMIN_*` service-account values, and a `JWT_SECRET`
(`openssl rand -base64 32`). Then:

```bash
npm run dev
```

The public site renders without Firebase configured — Firebase is initialised
lazily and is only required for the dashboard sign-in path.

---

## Architecture

| Layer | Location | Notes |
| --- | --- | --- |
| Design tokens | `src/app/globals.css` | `@theme` block; colors, type scale, spacing extracted from Figma. Never hardcode hex in components. |
| Constants | `src/constants/` | `routes.ts`, `site.ts`, `config.ts` |
| Types | `src/types/` | API envelope, team, testimonial, auth |
| Validation | `src/lib/validations/` | Zod schemas shared by RHF forms **and** API routes |
| Data access | `src/services/crud.service.ts` | Generic factory — list/search/sort/paginate/CRUD |
| Models | `src/models/` | Mongoose schemas with validation, indexes, timestamps, virtuals |
| API | `src/app/api/` | Route handlers returning `{ success, message, data }` |
| Auth | `src/lib/auth/`, `src/proxy.ts` | Firebase verifies credentials → own JWT session cookie |
| UI kit | `src/components/` | Grouped by role: common, forms, table, modal, dialog, loading, etc. |

### Adding a new module (Blog, Services, FAQ…)

No architectural change is needed:

1. `src/models/Foo.ts` — Mongoose schema
2. `src/lib/validations/foo.ts` — Zod schema + sort/search field allowlists
3. `src/services/foo.service.ts` — `createCrudService({ model, ... })`
4. `src/app/api/foo/route.ts` + `[id]/route.ts` — thin handlers
5. Dashboard page reusing `DataTable`, `Pagination`, `SearchBox`, `ConfirmDialog`

### Security notes

- The Edge proxy (`src/proxy.ts`) does redirects only. `src/lib/auth/guard.ts`
  is the authoritative check and runs in every protected route handler.
- All user input passes Zod, then `sanitizeMongoInput` strips `$`/dotted keys.
- Search terms go through `escapeRegex` before reaching a Mongo regex.
- Security headers in `next.config.ts`; rate limiting in `src/lib/api/rate-limit.ts`
  (in-process — swap for Vercel KV/Upstash for multi-region).

---

## Completed

- Full project scaffold, strict TS, ESLint + Prettier, security headers, env template
- Design-token layer extracted from Figma (`#0a192f` / `#060d1a` / `#233554` /
  `#ad0224` / `#d0c6ab`; Bebas Neue display scale 80/48/32, Montserrat body scale)
- **Backend, complete**: Team + Testimonial models, generic CRUD service,
  REST routes (GET/POST/PATCH/DELETE) with pagination, search, sorting,
  filtering, reusable response envelope, typed error hierarchy, rate limiting
- **Auth, complete**: lazy Firebase client, Firebase Admin token verification,
  `jose` JWT session cookie, Edge proxy protection, role guards (admin/editor)
- UI kit (21 components), 7 custom hooks, utility layer
- Header + MobileNav + Footer + Logo
- **Home page**: Hero, Core Training Services, Premier Locations, Experience the Difference
- SEO: metadata builder, OpenGraph, Twitter cards, JSON-LD, `robots.txt`,
  `sitemap.xml`, canonical URLs; 404 page and root error boundary

## Remaining

Ordered by dependency. Figma node IDs included for direct `get_design_context` calls
against file `DdZREoFbIrM69WCFqXeh47`.

1. **Home** — "Latest Intelligence" carousel section (Swiper) — node `12:146`
2. **Public pages** — About `12:279`, Pricing `12:434`, Team `12:690`,
   Contact `12:827`, Equipment `12:1026`, Gallery `12:1211`
3. **UI kit gaps** — `ImageUpload` (wire to existing `useUpload`), `Drawer`,
   `Breadcrumb`, `PageTitle`, `Card`
4. **Admin dashboard** — login page, dashboard shell (sidebar/topbar), stats home,
   Team CRUD screens, Testimonial CRUD screens, profile, settings.
   All data plumbing already exists; these are UI compositions over the
   finished API + `DataTable`/`Pagination`/`SearchBox`/`ConfirmDialog`.
5. **Imagery** — section photography currently falls back to
   `public/images/placeholder.svg`. Figma's raster exports are low-resolution
   (the hero exported at 512×279), so production photography should be sourced
   at full resolution rather than pulled from the design file.

### Note on design consistency

The Figma pages are not internally consistent: the nav logo appears as a bare
mark on Home, a white wordmark on Team/Contact, and a gold wordmark on
Pricing/Gallery, and the footer column structure differs per page. `Header`,
`Footer`, and `Logo` were built once with variant props (`tone`, `showWordmark`,
`transparent`) rather than duplicated per page — worth confirming which variant
should be canonical.
