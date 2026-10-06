# Consultas útiles de administración

Ejecuta estas consultas desde **Supabase → SQL Editor** con una cuenta propietaria del proyecto.

Tablas utilizadas:

- `auth.users`: cuentas y autenticación (correo, fecha de creación, último inicio de sesión).
- `public.perfiles`: nombre visible y rol (`admin` o `participante`).
- `public.intentos`: resultados de los exámenes.

> **Precaución:** las consultas `UPDATE` y `DELETE` modifican datos. Reemplaza siempre los correos, nombres y demás valores de ejemplo antes de ejecutarlas.

---

## 1. Ver todos los usuarios, nombres y roles

```sql
select
  u.id,
  u.email,
  p.nombre,
  p.rol,
  u.created_at as cuenta_creada_en,
  u.last_sign_in_at as ultimo_acceso
from auth.users u
left join public.perfiles p on p.id = u.id
order by u.created_at desc;
```

## 2. Buscar un usuario por correo

```sql
select
  u.id,
  u.email,
  p.nombre,
  p.rol,
  u.created_at,
  u.last_sign_in_at
from auth.users u
left join public.perfiles p on p.id = u.id
where lower(u.email) = lower('persona@ejemplo.com');
```

## 3. Cambiar el nombre visible de un participante

```sql
update public.perfiles
set nombre = 'Valentina Pérez'
where id = (
  select id
  from auth.users
  where lower(email) = lower('persona@ejemplo.com')
);
```

## 4. Convertir un participante en administrador

```sql
update public.perfiles
set rol = 'admin'
where id = (
  select id
  from auth.users
  where lower(email) = lower('persona@ejemplo.com')
);
```

## 5. Devolver a alguien al rol participante

```sql
update public.perfiles
set rol = 'participante'
where id = (
  select id
  from auth.users
  where lower(email) = lower('persona@ejemplo.com')
);
```

## 6. Ver solo administradores

```sql
select
  u.email,
  p.nombre,
  p.rol,
  u.last_sign_in_at
from public.perfiles p
join auth.users u on u.id = p.id
where p.rol = 'admin'
order by p.nombre, u.email;
```

## 7. Encontrar cuentas sin perfil asociado

Las cuentas sin perfil no podrán usar correctamente el simulador.

```sql
select
  u.id,
  u.email,
  u.created_at
from auth.users u
left join public.perfiles p on p.id = u.id
where p.id is null
order by u.created_at desc;
```

## 8. Crear el perfil faltante de una cuenta

```sql
insert into public.perfiles (id, nombre, rol)
select
  u.id,
  'Nombre Apellido',
  'participante'
from auth.users u
where lower(u.email) = lower('persona@ejemplo.com')
  and not exists (
    select 1
    from public.perfiles p
    where p.id = u.id
  );
```

## 9. Ver todos los intentos de examen

```sql
select
  i.id,
  p.nombre as participante,
  u.email,
  i.modo,
  i.puntos,
  i.puntos_totales,
  i.aprobado,
  i.incompleto,
  i.respondidas,
  i.finalizado_en,
  i.publicado
from public.intentos i
join public.perfiles p on p.id = i.usuario_id
join auth.users u on u.id = i.usuario_id
order by i.finalizado_en desc;
```

## 10. Ver historial de una persona

```sql
select
  i.modo,
  i.puntos,
  i.puntos_totales,
  i.aprobado,
  i.incompleto,
  i.respondidas,
  i.finalizado_en
from public.intentos i
where i.usuario_id = (
  select id
  from auth.users
  where lower(email) = lower('persona@ejemplo.com')
)
order by i.finalizado_en desc;
```

## 11. Resumen de rendimiento por participante

```sql
select
  p.nombre,
  u.email,
  count(i.id) as intentos,
  count(i.id) filter (where i.aprobado and not i.incompleto) as aprobados,
  round(avg(i.puntos)::numeric, 1) as promedio_puntos,
  max(i.puntos) as mejor_puntaje,
  max(i.finalizado_en) as ultimo_intento
from public.perfiles p
join auth.users u on u.id = p.id
left join public.intentos i on i.usuario_id = p.id
where p.rol = 'participante'
group by p.id, p.nombre, u.email
order by mejor_puntaje desc nulls last, p.nombre;
```

## 12. Ranking de mejores resultados

```sql
select
  p.nombre,
  i.puntos,
  i.puntos_totales,
  i.aprobado,
  i.finalizado_en
from public.intentos i
join public.perfiles p on p.id = i.usuario_id
where not i.incompleto
order by i.puntos desc, i.finalizado_en asc
limit 20;
```

## 13. Ver resultados publicados

```sql
select
  i.alias_publico,
  i.puntos,
  i.puntos_totales,
  i.aprobado,
  i.finalizado_en
from public.intentos i
where i.publicado = true
order by i.puntos desc, i.finalizado_en asc;
```

## 14. Ocultar todos los resultados publicados

Útil para reiniciar el ranking público.

```sql
update public.intentos
set
  publicado = false,
  alias_publico = null
where publicado = true;
```

## 15. Eliminar los intentos de una cuenta, manteniendo el usuario

```sql
delete from public.intentos
where usuario_id = (
  select id
  from auth.users
  where lower(email) = lower('persona@ejemplo.com')
);
```

## 16. Eliminar definitivamente una cuenta

Primero elimina sus intentos y su perfil. Después, elimina el usuario desde **Authentication → Users** en el Dashboard de Supabase.

```sql
-- Paso 1: eliminar intentos
delete from public.intentos
where usuario_id = (
  select id
  from auth.users
  where lower(email) = lower('persona@ejemplo.com')
);

-- Paso 2: eliminar perfil
delete from public.perfiles
where id = (
  select id
  from auth.users
  where lower(email) = lower('persona@ejemplo.com')
);
```

## 17. Comprobar políticas RLS activas

```sql
select
  schemaname,
  tablename,
  policyname,
  cmd,
  roles,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename in ('perfiles', 'intentos')
order by tablename, policyname;
```

## 18. Comprobar permisos de tablas

```sql
select
  table_name,
  grantee,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('perfiles', 'intentos')
order by table_name, grantee, privilege_type;
```
