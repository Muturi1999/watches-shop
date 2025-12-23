# Admin Path Migration Inventory

Date: 2025-12-23

Summary: The dashboard routes at `/dashboard` were migrated to `/admin`. Old dashboard files were removed and equivalent admin pages were added.

Removed files:

- `app/dashboard` folder (deleted)
  - `app/dashboard/page.tsx` (was redirect to `/admin` before deletion)
  - `app/dashboard/layout.tsx` (sidebar layout; moved to `app/admin/layout.tsx` previously)
  - `app/dashboard/dashboard.css` (styles; a copy exists at `app/admin/dashboard.css`)
  - `app/dashboard/products/page.tsx` (was redirect to `/admin/products` before deletion)
  - `app/dashboard/products/[id]/page.tsx` (was redirect to `/admin/products/[id]` before deletion)
  - `app/dashboard/settings/page.tsx` (moved to `app/admin/settings/page.tsx`)

Added/Updated files:

- `app/admin/page.tsx` (admin overview)
- `app/admin/layout.tsx` (admin layout / sidebar)
- `app/admin/dashboard.css` (copied styles)
- `app/admin/products/page.tsx` (products list)
- `app/admin/products/[id]/page.tsx` (product detail)
- `app/admin/settings/page.tsx` (migrated settings page)

Routing mapping (old -> new):

- `/dashboard` → `/admin`
- `/dashboard/products` → `/admin/products`
- `/dashboard/products/[id]` → `/admin/products/[id]`
- `/dashboard/settings` → `/admin/settings`

Notes:

- Component names and folder `components/dashboard/*` were kept as-is (internal naming only) but all user-facing links now use `/admin`.
- Redirects from `/dashboard` were present to preserve compatibility during migration, but the old files were removed to avoid duplication; server-level redirects will handle old bookmarks if necessary.

Verification steps:

1. Run `npm run dev` and visit `http://localhost:3001/admin` to confirm admin UI loads.
2. Confirm product list at `http://localhost:3001/admin/products` and product detail pages.
3. Confirm settings at `http://localhost:3001/admin/settings`.

If you want the old `/dashboard` URLs to permanently redirect at the server level (instead of being removed), consider adding explicit redirects to `next.config.mjs`.
