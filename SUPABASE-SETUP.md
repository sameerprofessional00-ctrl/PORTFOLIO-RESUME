# Blog + Admin Panel — Supabase Setup Guide

## Kya ban chuka hai
- [blog/index.html](blog/index.html) — public blog listing (sirf "published" posts)
- [blog/post.html](blog/post.html) — single blog post reader
- [admin/index.html](admin/index.html) — login-protected admin panel (rich text editor, image upload, draft/publish, edit/delete)
- [assets/js/supabase-config.js](assets/js/supabase-config.js) — Supabase keys yahan daalni hain

## Setup steps (~10 min)

### 1. Supabase project banao
1. https://supabase.com/ → Sign in → **New project**
2. Naam do, database password set karo (yaad rakhna), region choose karo → Create

### 2. Keys copy karo
1. Project banne ke baad: **Project Settings → API**
2. **Project URL** copy karo → [assets/js/supabase-config.js](assets/js/supabase-config.js) me `SUPABASE_URL` me paste karo
3. **anon public** key copy karo → `SUPABASE_ANON_KEY` me paste karo

### 3. Database table banao
1. Left sidebar → **SQL Editor** → New query → ye paste karke Run karo:

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  tag text,
  status text default 'draft',
  content text,
  cover_url text,
  slug text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table posts enable row level security;

-- Anyone can read published posts
create policy "Public can read published posts"
  on posts for select
  using (status = 'published');

-- Only logged-in users (you) can read everything (drafts too)
create policy "Authenticated can read all posts"
  on posts for select
  using (auth.role() = 'authenticated');

-- Only logged-in users can insert/update/delete
create policy "Authenticated can insert posts"
  on posts for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated can update posts"
  on posts for update
  using (auth.role() = 'authenticated');

create policy "Authenticated can delete posts"
  on posts for delete
  using (auth.role() = 'authenticated');
```

### 4. Storage bucket banao (cover images ke liye)
1. Left sidebar → **Storage** → New bucket → naam `blog-covers` → **Public bucket** toggle ON → Create
2. Bucket ke Policies tab me (ya SQL Editor me) ye run karo:

```sql
create policy "Public read blog-covers"
  on storage.objects for select
  using (bucket_id = 'blog-covers');

create policy "Authenticated upload blog-covers"
  on storage.objects for insert
  with check (bucket_id = 'blog-covers' and auth.role() = 'authenticated');
```

### 5. Admin user banao (login ke liye)
1. Left sidebar → **Authentication → Users** → **Add user** → apna email + password daalo
2. **Auto Confirm User** ON rakhna (taaki email verify na karna pade)

### 6. Test karo
- [admin/index.html](admin/index.html) kholo → login karo (step 5 wale email/password se) → post likho, "Published" select karke Save karo
- [blog/index.html](blog/index.html) kholo → post dikhna chahiye

## Deploy (Vercel)
1. Poora project folder GitHub repo me push karo (`.gitignore` already ban chuka hai)
2. https://vercel.com/ → Add New → Project → GitHub repo import karo
3. Framework preset: **Other** (static site) → Deploy
4. Live URL milega — `/admin` route pe sirf login-authenticated user hi post manage kar payega

## Security note
Supabase anon key public hoti hai by design — security **Row Level Security (RLS) policies** se hoti hai (step 3 me set kiya). Isliye `.env` me chhupane ki zaroorat nahi, but agar chaho to bhi rakh sakte ho.
