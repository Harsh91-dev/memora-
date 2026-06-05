-- Run this in Supabase → SQL Editor

create table if not exists profiles (id uuid references auth.users primary key, name text, subject text default 'General', plan text default 'free', created_at timestamptz default now());
create table if not exists notes (id uuid default gen_random_uuid() primary key, user_id uuid references auth.users not null, title text not null, content text not null, subject text default 'General', created_at timestamptz default now());
create table if not exists progress (id uuid default gen_random_uuid() primary key, user_id uuid references auth.users not null, topic text not null, subject text default 'General', status text default 'in_progress', score integer default 0, created_at timestamptz default now());

alter table profiles enable row level security;
alter table notes enable row level security;
alter table progress enable row level security;

create policy "own profile" on profiles for all using (auth.uid()=id);
create policy "own notes" on notes for all using (auth.uid()=user_id);
create policy "own progress" on progress for all using (auth.uid()=user_id);
