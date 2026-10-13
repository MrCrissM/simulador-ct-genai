-- Permite a cada participante eliminar únicamente sus propios intentos.
-- Los administradores pueden eliminar intentos de cualquier participante.
drop policy if exists "intentos: eliminar propios o administrar" on public.intentos;
drop policy if exists "intentos: solo administrar elimina" on public.intentos;

create policy "intentos: eliminar propios o administrar"
  on public.intentos for delete
  to authenticated
  using (usuario_id = auth.uid() or public.es_admin());
