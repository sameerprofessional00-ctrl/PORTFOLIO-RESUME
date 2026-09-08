# Blog + Admin Panel — Supabase Setup Guide (v3)

## SQL — SQL Editor me ye pura block run karo (safe hai, "if not exists" use karta hai)

```sql
-- ===== Website Content tables =====

create table if not exists site_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tag text,
  stack text,
  link text,
  featured boolean default false,
  order_num int default 0,
  created_at timestamptz default now()
);
alter table site_projects enable row level security;
create policy "Public read projects" on site_projects for select using (true);
create policy "Auth manage projects" on site_projects for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists site_skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  order_num int default 0
);
alter table site_skills enable row level security;
create policy "Public read skills" on site_skills for select using (true);
create policy "Auth manage skills" on site_skills for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists site_timeline (
  id uuid primary key default gen_random_uuid(),
  kind text check (kind in ('experience','education')),
  title text not null,
  date_label text,
  description text,
  link text,
  order_num int default 0
);
alter table site_timeline enable row level security;
create policy "Public read timeline" on site_timeline for select using (true);
create policy "Auth manage timeline" on site_timeline for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create table if not exists site_contact (
  id int primary key default 1,
  email text, phone text, linkedin text, github text, whatsapp text,
  heading text, subtext text
);
alter table site_contact enable row level security;
create policy "Public read contact" on site_contact for select using (true);
create policy "Auth manage contact" on site_contact for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
insert into site_contact (id, email, phone, linkedin, github, whatsapp, heading, subtext)
values (1, 'sameerprofessional00@gmail.com', '918171672191',
  'https://www.linkedin.com/in/sameer-ca-final/', 'https://github.com/sameerprofessional00-ctrl',
  'https://wa.me/918171672191', 'Got a workflow worth automating?',
  'Whether you''re a CA firm drowning in manual entries, a student who wants smarter tools, or an e-commerce seller who needs GST clarity — let''s talk.')
on conflict (id) do nothing;

-- ===== Seed existing Skills (so site keeps working while you switch to dynamic content) =====
insert into site_skills (name, order_num) values
('Workflow Analysis',1),('AI Agents',2),('Retrieval-Augmented Generation (RAG)',3),
('Claude API Integration',4),('Excel Automation',5),('Electron Desktop Apps',6),
('GST Compliance & Filing',7),('Statutory Audit',8),('Direct & Indirect Tax',9),
('Tally Integration',10)
on conflict do nothing;
```

Baaki setup (posts table, enquiries table, storage bucket, admin user) pehle jaisa hi — is file ke purane versions me diya tha.

## Note
Ye tables ban jaane ke baad, admin panel me **"Website Content"** tab se Projects/Skills/Experience/Education/Contact edit kar sakte ho. Homepage abhi bhi static content dikhata hai jab tak tum in tables me data na daalo ya edit na karo — admin panel me jo bhi save karoge wahi live site pe reflect hoga.
