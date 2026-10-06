-- CT-GenAI: usuarios, resultados e historial centralizado.
-- Ejecutar una sola vez en Supabase: SQL Editor → New query → Run.
-- No contiene ni requiere la clave service_role.

create table if not exists public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null default '',
  rol text not null default 'participante'
    check (rol in ('admin', 'participante')),
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create table if not exists public.intentos (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references public.perfiles(id) on delete cascade,
  creado_en timestamptz not null default now(),
  finalizado_en timestamptz,
  modo text not null check (modo in ('real', 'prueba')),
  puntos integer,
  puntos_totales integer not null default 46,
  aprobado boolean,
  incompleto boolean not null default false,
  por_tiempo boolean not null default false,
  respondidas integer not null default 0 check (respondidas between 0 and 40),
  minutos integer not null default 60 check (minutos in (60, 75)),
  publicado boolean not null default false,
  alias_publico text,
  detalle jsonb not null default '{}'::jsonb,
  actualizado_en timestamptz not null default now()
);

create index if not exists intentos_usuario_fecha_idx
  on public.intentos (usuario_id, creado_en desc);

create index if not exists intentos_publicados_idx
  on public.intentos (publicado, puntos desc, finalizado_en desc)
  where publicado = true;

alter table public.perfiles enable row level security;
alter table public.intentos enable row level security;

-- Función auxiliar: evita duplicar condiciones de rol en todas las políticas.
create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.perfiles
    where id = auth.uid() and rol = 'admin'
  );
$$;

-- Al crear un usuario en Authentication, se crea automáticamente su perfil.
create or replace function public.crear_perfil_usuario()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.perfiles (id, nombre)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'nombre'), ''),
      nullif(split_part(new.email, '@', 1), ''),
      'Participante'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario
  after insert on auth.users
  for each row execute procedure public.crear_perfil_usuario();

-- Un participante ve y modifica solamente su perfil, sin poder cambiarse de rol.
drop policy if exists "perfiles: leer propio o administrar" on public.perfiles;
create policy "perfiles: leer propio o administrar"
  on public.perfiles for select
  to authenticated
  using (id = auth.uid() or public.es_admin());

drop policy if exists "perfiles: actualizar nombre propio" on public.perfiles;
create policy "perfiles: actualizar nombre propio"
  on public.perfiles for update
  to authenticated
  using (id = auth.uid() or public.es_admin())
  with check (
    public.es_admin()
    or (id = auth.uid() and rol = (select rol from public.perfiles where id = auth.uid()))
  );

-- Participantes: solamente sus intentos. Administradores: todos.
drop policy if exists "intentos: leer propios o administrar" on public.intentos;
create policy "intentos: leer propios o administrar"
  on public.intentos for select
  to authenticated
  using (usuario_id = auth.uid() or public.es_admin());

drop policy if exists "intentos: crear propios" on public.intentos;
create policy "intentos: crear propios"
  on public.intentos for insert
  to authenticated
  with check (usuario_id = auth.uid());

drop policy if exists "intentos: actualizar propios o administrar" on public.intentos;
create policy "intentos: actualizar propios o administrar"
  on public.intentos for update
  to authenticated
  using (usuario_id = auth.uid() or public.es_admin())
  with check (usuario_id = auth.uid() or public.es_admin());

drop policy if exists "intentos: eliminar propios o administrar" on public.intentos;
create policy "intentos: eliminar propios o administrar"
  on public.intentos for delete
  to authenticated
  using (usuario_id = auth.uid() or public.es_admin());

-- Ranking público opcional: expone solo los campos necesarios, nunca respuestas ni detalle.
create or replace function public.resultados_publicados()
returns table (
  alias text,
  puntos integer,
  puntos_totales integer,
  aprobado boolean,
  finalizado_en timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(nullif(i.alias_publico, ''), 'Participante') as alias,
    i.puntos,
    i.puntos_totales,
    i.aprobado,
    i.finalizado_en
  from public.intentos i
  where i.publicado = true
    and i.finalizado_en is not null
  order by i.puntos desc, i.finalizado_en asc;
$$;

grant execute on function public.resultados_publicados() to anon, authenticated;

-- DESPUÉS de crear manualmente la primera cuenta administradora en
-- Authentication → Users, ejecuta esta única sentencia reemplazando el correo:
--
-- update public.perfiles
-- set rol = 'admin', nombre = 'Cristian Betancur'
-- where id = (select id from auth.users where email = 'cristianmbetancur@gmail.com');
