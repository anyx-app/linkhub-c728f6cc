-- Migration for LinkHub Schema
-- Based on design/schema_plan.md

-- 1. Profiles Table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  theme_preference text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Links Table
create table links (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  icon text,
  is_active boolean default true,
  sort_order integer default 0,
  style_config jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Content Posts Table
create table content_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text,
  description text,
  image_url text,
  link_url text,
  type text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Analytics Events Table
create table analytics_events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null, -- The owner of the page being viewed
  link_id uuid references links(id) on delete set null, -- Optional, if specific link clicked
  event_type text not null, -- 'page_view', 'link_click'
  visitor_id text, -- Anonymous hash
  referrer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for performance
create index profiles_username_idx on profiles (username);
create index links_user_id_idx on links (user_id);
create index content_posts_user_id_idx on content_posts (user_id);
create index analytics_events_user_id_idx on analytics_events (user_id);

-- RLS Policies

-- Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

-- Links
alter table links enable row level security;
create policy "Public links are viewable by everyone" on links for select using ( is_active = true );
create policy "Users can insert their own links" on links for insert with check ( auth.uid() = user_id );
create policy "Users can update their own links" on links for update using ( auth.uid() = user_id );
create policy "Users can delete their own links" on links for delete using ( auth.uid() = user_id );

-- Content Posts
alter table content_posts enable row level security;
create policy "Public content is viewable by everyone" on content_posts for select using ( true );
create policy "Users can manage their own content" on content_posts for all using ( auth.uid() = user_id );

-- Analytics
alter table analytics_events enable row level security;
create policy "Anyone can insert analytics events" on analytics_events for insert with check ( true );
create policy "Users can view analytics for their own page" on analytics_events for select using ( auth.uid() = user_id );

-- Handle updated_at automatically
create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at before update on profiles
  for each row execute procedure moddatetime (updated_at);

create trigger handle_updated_at before update on links
  for each row execute procedure moddatetime (updated_at);
