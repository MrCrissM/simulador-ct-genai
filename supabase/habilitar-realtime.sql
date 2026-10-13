-- Ejecutar una vez mediante Supabase CLI o SQL Editor.
-- Es seguro repetirlo: si la tabla ya está publicada, no realiza cambios.
do $$
begin
  alter publication supabase_realtime add table public.intentos;
exception
  when duplicate_object then null;
end;
$$;
