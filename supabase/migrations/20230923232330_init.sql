create table
public.user (
id uuid not null,
email text not null,
avatar_url text null,
name text null,
preferred_currency text not null default 'USD'::text,
constraint user_pkey primary key (id),
constraint user_id_fkey foreign key (id) references auth.users (id) on delete cascade
) tablespace pg_default;

create table
public.trip (
id bigint generated always as identity not null,
created_at timestamp with time zone not null default timezone ('utc'::text, now()),
title text not null,
date date not null,
elevation numeric not null,
elevation_unit text not null,
distance real not null,
distance_unit text not null,
base_weight real not null,
total_weight real not null,
weight_unit text not null,
user_id uuid not null,
constraint trip_pkey primary key (id),
constraint trip_user_id_fkey foreign key (user_id) references "user" (id) on delete cascade
) tablespace pg_default;

create table
public.wishlist (
id bigint generated always as identity not null,
created_at timestamp with time zone not null default timezone ('utc'::text, now()),
url text not null,
title text null,
image_url text null,
logo_url text null,
user_id uuid not null,
constraint wishlist_pkey primary key (id),
constraint wishlist_user_id_fkey foreign key (user_id) references "user" (id) on delete cascade
) tablespace pg_default;

create table
public.inventory (
id bigint generated always as identity not null,
created_at timestamp with time zone not null default timezone ('utc'::text, now()),
title text not null,
description text null,
image_url text null,
url text null,
price numeric not null,
weight numeric not null,
weight_unit text not null,
season text not null,
user_id uuid not null,
constraint inventory_pkey primary key (id),
constraint inventory_user_id_fkey foreign key (user_id) references "user" (id) on delete cascade
) tablespace pg_default;


create table
public.pack (
id bigint generated always as identity not null,
created_at timestamp with time zone not null default timezone ('utc'::text, now()),
title text not null,
description text not null,
base_weight numeric not null,
total_weight numeric not null,
weight_unit text not null,
total_cost numeric not null,
total_items numeric not null,
is_public boolean not null,
share_id uuid default uuid_generate_v4() not null,
user_id uuid not null,
constraint pack_pkey primary key (id),
constraint pack_user_id_fkey foreign key (user_id) references "user" (id) on delete cascade
) tablespace pg_default;

create table
public.group (
id bigint generated always as identity not null,
title text not null,
total_weight numeric not null,
total_quantity numeric not null,
pack_id bigint not null,
user_id uuid not null,
total_base_weight numeric not null,
total_price numeric not null,
weight_unit text not null,
position numeric not null,
constraint group_pkey primary key (id),
constraint group_pack_id_fkey foreign key (pack_id) references pack (id) on delete cascade,
constraint group_user_id_fkey foreign key (user_id) references "user" (id) on delete cascade
) tablespace pg_default;

create table
public.pack_item (
id bigint generated always as identity not null,
position numeric not null,
quantity numeric not null,
group_id bigint not null,
inventory_id bigint not null,
type text not null,
constraint pack_item_pkey primary key (id),
constraint pack_item_group_id_fkey foreign key (group_id) references "group" (id) on delete cascade,
constraint pack_item_inventory_id_fkey foreign key (inventory_id) references inventory (id) on delete cascade
) tablespace pg_default;

-- inserts a row into public.profile
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- update email on public.user
create or replace function public.handle_update_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
update public.user
set email = new.email
where id = new.id;
  return new;
end;
$$;

-- trigger the function every time user’s email is changed
create trigger on_auth_user_updated
after update of email on auth.users
  for each row execute procedure public.handle_update_user();

-- RLS
alter table public.group enable row level security;

create policy "Users can select their own groups" on public.group 
for select
to authenticated
using ( auth.uid() = user_id );

create policy "Users can insert their own groups" on public.group 
for insert
to authenticated
with check ( auth.uid() = user_id );

create policy "Users can update their own groups" on public.group 
for update
to authenticated
using ( auth.uid() = user_id );

create policy "Users can delete their own groups" on public.group 
for delete
to authenticated
using ( auth.uid() = user_id );

create policy "Everyone can select groups" on public.group
for select
using ( true );


alter table public.user enable row level security;

create policy "Users can select their own info" on public.user
for select
using ( auth.uid() = id );

create policy "Users can insert their own info" on public.user
for insert
with check ( auth.uid() = id );

create policy "Users can update their own info" on public.user
for update
using ( auth.uid() = id );

create policy "Everyone can select users" on public.user
for select
using ( true );


alter table public.inventory enable row level security;

create policy "Users can select their own inventory" on public.inventory
for select
to authenticated
using ( auth.uid() = user_id );

create policy "Users can insert their own inventory" on public.inventory
for insert
to authenticated
with check ( auth.uid() = user_id );

create policy "Users can update their own inventory" on public.inventory
for update
to authenticated
using ( auth.uid() = user_id );

create policy "Users can delete their own inventory" on public.inventory
for delete
to authenticated
using ( auth.uid() = user_id );

create policy "Everyone can select inventory" on public.inventory
for select
using ( true );



alter table public.pack enable row level security;

create policy "Users can select their own packs" on public.pack
for select
to authenticated
using ( auth.uid() = user_id );

create policy "Users can insert their own packs" on public.pack
for insert
to authenticated
with check ( auth.uid() = user_id );

create policy "Users can update their own packs" on public.pack
for update
to authenticated
using ( auth.uid() = user_id );

create policy "Users can delete their own packs" on public.pack
for delete
to authenticated
using ( auth.uid() = user_id );

create policy "Everyone can select pack" on public.pack
for select
using ( true );



alter table public.trip enable row level security;

create policy "Users can CRUD their own trips" on public.trip
for all
to authenticated
using ( auth.uid() = user_id );

alter table public.wishlist enable row level security;

create policy "Users can CRUD their own wishlist" on public.wishlist
for all
to authenticated
using ( auth.uid() = user_id );


alter table public.pack_item enable row level security;

create policy "Users can update their own pack item" on public.pack_item
for update
using ( true );

create policy "Users can insert their own pack item" on public.pack_item
for insert
with check ( true );

create policy "Users can delete their own pack item" on public.pack_item
for delete
using ( true );

create policy "Everyone can select pack item" on public.pack_item
for select
using ( true );

-- fuzzy text search for inventory

CREATE OR REPLACE FUNCTION public.search_inventory(search_term text)
RETURNS SETOF inventory
AS $$
BEGIN
    RETURN QUERY
        SELECT *
        FROM inventory i 
        WHERE search_term % ANY(STRING_TO_ARRAY(i.title, ' '));
END;
$$ LANGUAGE plpgsql; 