-- FABRI.com Supabase Schema
-- Run this in the Supabase SQL editor after connecting your project.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles (linked to auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

-- Contact submissions
create table if not exists contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  reason text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table contact_submissions enable row level security;
-- Only service role can insert/read contact submissions
create policy "Service role only" on contact_submissions for all using (false);

-- Finance entries
create table if not exists finance_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  type text check (type in ('income', 'expense')) not null,
  category text not null,
  amount numeric(10, 2) not null,
  description text,
  date date not null,
  created_at timestamptz default now()
);

alter table finance_entries enable row level security;
create policy "Users can manage own finance entries" on finance_entries for all using (auth.uid() = user_id);

-- Credit cards
create table if not exists credit_cards (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  last4 char(4),
  credit_limit numeric(10, 2) not null,
  current_balance numeric(10, 2) default 0,
  issuer text,
  created_at timestamptz default now()
);

alter table credit_cards enable row level security;
create policy "Users can manage own credit cards" on credit_cards for all using (auth.uid() = user_id);

-- Point balances
create table if not exists point_balances (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  program text not null,
  balance integer default 0,
  last_updated timestamptz default now()
);

alter table point_balances enable row level security;
create policy "Users can manage own point balances" on point_balances for all using (auth.uid() = user_id);

-- Social accounts
create table if not exists social_accounts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  platform text not null,
  handle text not null,
  followers integer default 0,
  last_synced timestamptz default now()
);

alter table social_accounts enable row level security;
create policy "Users can manage own social accounts" on social_accounts for all using (auth.uid() = user_id);

-- Travel searches
create table if not exists travel_searches (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  query text not null,
  response jsonb,
  created_at timestamptz default now()
);

alter table travel_searches enable row level security;
create policy "Users can manage own travel searches" on travel_searches for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();