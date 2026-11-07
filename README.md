# Sarthak's Diwali — Vercel deployment

A responsive Diwali greeting website with the animated entrance gate, visitor-name greeting, five interactive diyas, fireworks, lanterns, festive gallery, visitor admin dashboard, and photo uploads.

## Project files

- `index.html` — complete frontend
- `api/` — Vercel serverless API for visitor records and admin/photo operations
- `supabase-setup.sql` — database setup
- `vercel.json` — Vercel function configuration

## 1. Create the Supabase backend

1. Create a project at https://supabase.com/.
2. Open **SQL Editor**, paste the contents of `supabase-setup.sql`, and run it.
3. Open **Storage** and create a bucket named `diwali-gallery`.
4. Set `diwali-gallery` to **Public bucket** so the public gallery can display images.
5. Open **Project Settings → API**. Copy the Project URL and the `service_role` key. Keep the service-role key private.

## 2. Deploy to Vercel

1. Upload these project files to your GitHub repository root.
2. In Vercel, import that GitHub repository.
3. Set Framework Preset to **Other**.
4. Leave Build Command blank.
5. Set Output Directory to `.`.
6. Add the three Environment Variables below in Vercel → Project → Settings → Environment Variables:

| Name | Value |
|---|---|
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase `service_role` key |
| `ADMIN_PASSWORD` | A long, unique password only you know |

7. Enable the variables for Production (and Preview if you want preview deployments to use the backend).
8. Redeploy after saving the variables.

## 3. Admin dashboard

Open the deployed website and tap the **Admin** button in the bottom-left corner. Enter the `ADMIN_PASSWORD` value you set in Vercel.

The dashboard can:
- View visitor names and visit timestamps
- See total entries and unique visitor count
- Copy the visitor list
- Delete an individual visitor record
- Upload images (maximum 8 MB each)
- Delete uploaded gallery images

The admin password is checked by serverless API routes. The Supabase service-role key is never sent to the browser.

## Important notes

- The visitor log and photo gallery need the Supabase setup above. The greeting website itself can load without the backend, but saving names and admin features will not work until the environment variables and database are configured.
- This project uses Vercel serverless functions and Supabase. It is not compatible with a third-party proprietary database runtime.
- If you previously committed any Supabase service-role key or admin secret to a public repository, rotate it in Supabase/Vercel before deploying this version.
- Visitor names are personal data. Tell visitors that their name will be recorded if you share the site publicly, and remove records when no longer needed.
