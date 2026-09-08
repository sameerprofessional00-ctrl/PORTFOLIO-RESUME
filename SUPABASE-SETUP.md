# Blog + Admin Panel — Supabase Setup Guide (v2)

## SQL — SQL Editor me ye pura block ek saath run karo

```sql
-- ===== Extend posts table (agar pehle se bani hai to ye add columns karega) =====
alter table posts add column if not exists slug text;
alter table posts add column if not exists category text default 'General';
alter table posts add column if not exists author text default 'Sameer';
alter table posts add column if not exists meta_title text;
alter table posts add column if not exists meta_description text;

-- ===== Enquiries table (Contact form submissions) =====
create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table enquiries enable row level security;

create policy "Anyone can submit an enquiry"
  on enquiries for insert
  with check (true);

create policy "Authenticated can read enquiries"
  on enquiries for select
  using (auth.role() = 'authenticated');

create policy "Authenticated can update enquiries"
  on enquiries for update
  using (auth.role() = 'authenticated');

create policy "Authenticated can delete enquiries"
  on enquiries for delete
  using (auth.role() = 'authenticated');
```

(Agar `posts` table hi nahi bani abhi tak, pehle purana `create table posts (...)` wala block chalao jo pehle diya tha, phir ye upar wala.)

## Storage bucket — pehle jaisa hi (`blog-covers`, public)
## Admin user — pehle jaisa hi (Authentication → Users)

Baaki sab same rahega — bas admin panel aur website me naye features add ho gaye hain (Dashboard, Enquiries, Contact form).
