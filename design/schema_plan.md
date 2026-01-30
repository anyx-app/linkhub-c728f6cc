# Schema Plan: LinkHub

## Overview
LinkHub requires a schema to manage user profiles, their customizable links, a content feed (likely for integrations or posts), and basic analytics tracking. We will leverage Supabase (PostgreSQL) and its Auth system.

## Core Entities

### 1. `profiles`
Extends the basic Supabase `auth.users` table. Stores public-facing profile information.
- `id`: uuid (Primary Key, Foreign Key referencing `auth.users.id`)
- `username`: text (Unique, Indexed)
- `full_name`: text
- `avatar_url`: text
- `bio`: text
- `theme_preference`: text (Stores JSON or string identifier for chosen theme/colors)
- `created_at`: timestamp with time zone (default: now())
- `updated_at`: timestamp with time zone (default: now())

### 2. `links`
Represents the buttons on a user's LinkHub page.
- `id`: uuid (Primary Key, default: uuid_generate_v4())
- `user_id`: uuid (Foreign Key referencing `profiles.id`)
- `title`: text (Button label)
- `url`: text (Destination URL)
- `icon`: text (Icon identifier/name)
- `is_active`: boolean (default: true)
- `sort_order`: integer (For ordering buttons)
- `style_config`: jsonb (Stores individual button styling overrides if needed)
- `created_at`: timestamp with time zone
- `updated_at`: timestamp with time zone

### 3. `content_posts`
Stores the "dynamic content feed" items. This could be manual posts or fetched content.
- `id`: uuid (Primary Key)
- `user_id`: uuid (Foreign Key referencing `profiles.id`)
- `title`: text
- `description`: text
- `image_url`: text
- `link_url`: text (Where the content card clicks through to)
- `type`: text (e.g., 'video', 'blog', 'product')
- `sort_order`: integer
- `created_at`: timestamp with time zone

### 4. `analytics_events`
Tracks clicks and views.
- `id`: uuid (Primary Key)
- `user_id`: uuid (Foreign Key referencing `profiles.id` - owner of the page being viewed)
- `link_id`: uuid (Foreign Key referencing `links.id`, Nullable - if null, it might be a page view)
- `event_type`: text (e.g., 'page_view', 'link_click')
- `visitor_id`: text (Anonymous session ID or hash)
- `referrer`: text
- `created_at`: timestamp with time zone (default: now())

## Relationships
- `profiles` 1:N `links`
- `profiles` 1:N `content_posts`
- `profiles` 1:N `analytics_events` (Page owner)
- `links` 1:N `analytics_events` (Link clicked)

## Security (RLS) policies Plan
- `profiles`:
    - Public: SELECT
    - Owner: INSERT, UPDATE, DELETE
- `links`:
    - Public: SELECT (where is_active = true)
    - Owner: INSERT, UPDATE, DELETE
- `content_posts`:
    - Public: SELECT
    - Owner: INSERT, UPDATE, DELETE
- `analytics_events`:
    - Public: INSERT (Anon users tracking clicks)
    - Owner: SELECT (Dashboard view)

## Indexes
- `profiles.username` (for fast lookup by url slug)
- `links.user_id`
- `content_posts.user_id`
- `analytics_events.user_id`
