import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function respuesta(
  body: Record<string, unknown>,
  status = 200
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return respuesta({ error: "Método no permitido." }, 405);
  }

  const url = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !anonKey || !serviceRoleKey) {
    console.error("Faltan variables de entorno de Supabase.");
    return respuesta({ error: "La función no está configurada." }, 500);
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return respuesta({ error: "Sesión no válida." }, 401);
  }

  /* El cliente de sesión valida quién llama con el JWT enviado por el navegador. */
  const clienteSesion = createClient(url, anonKey, {
    global: { headers: { Authorization: authorization } }
  });
  const {
    data: { user },
    error: errorSesion
  } = await clienteSesion.auth.getUser();

  if (errorSesion || !user) {
    return respuesta({ error: "Sesión no válida." }, 401);
  }

  /* La service_role nunca llega al navegador: solo vive dentro de esta función. */
  const administrador = createClient(url, serviceRoleKey);

  /*
   * La comprobación usa la service_role para no depender de políticas RLS
   * durante el proceso de alta. El usuario a evaluar ya fue validado con
   * auth.getUser() a partir del JWT enviado por el navegador.
   */
  const { data: perfil, error: errorPerfil } = await administrador
    .from("perfiles")
    .select("rol")
    .eq("id", user.id)
    .maybeSingle();

  if (errorPerfil) {
    console.error("No se pudo consultar el perfil administrador.", errorPerfil);
    return respuesta({ error: "No se pudo verificar el perfil administrador." }, 500);
  }
  if (!perfil) {
    return respuesta({ error: "Tu cuenta no tiene un perfil de acceso habilitado." }, 403);
  }
  if (perfil.rol !== "admin") {
    return respuesta({ error: "Tu perfil no tiene rol administrador." }, 403);
  }

  let datos: { nombre?: unknown; email?: unknown; password?: unknown };
  try {
    datos = await request.json();
  } catch {
    return respuesta({ error: "Los datos enviados no son válidos." }, 400);
  }

  const nombre = typeof datos.nombre === "string" ? datos.nombre.trim() : "";
  const email = typeof datos.email === "string" ? datos.email.trim().toLowerCase() : "";
  const password = typeof datos.password === "string" ? datos.password : "";

  if (!nombre || nombre.length > 120) {
    return respuesta({ error: "Indica un nombre de entre 1 y 120 caracteres." }, 400);
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respuesta({ error: "Indica un correo electrónico válido." }, 400);
  }
  if (password.length < 6) {
    return respuesta({ error: "La contraseña debe tener al menos 6 caracteres." }, 400);
  }

  const { data: creado, error: errorCreacion } = await administrador.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { nombre }
  });

  if (errorCreacion || !creado.user) {
    const mensaje = errorCreacion?.message || "No se pudo crear la cuenta.";
    const estado = /already been registered|already exists|duplicate/i.test(mensaje) ? 409 : 400;
    return respuesta({ error: mensaje }, estado);
  }

  /*
   * El trigger crear_perfil_usuario crea la fila del perfil usando user_metadata.
   * Esta actualización asegura el nombre incluso si el trigger usó un valor previo.
   */
  const { error: errorNombre } = await administrador
    .from("perfiles")
    .update({ nombre })
    .eq("id", creado.user.id);

  if (errorNombre) {
    console.error("Usuario creado, pero no se pudo actualizar su nombre.", errorNombre);
    return respuesta(
      {
        error:
          "La cuenta se creó, pero no se pudo guardar su nombre. Edítalo desde perfiles en Supabase.",
        usuarioCreado: true
      },
      207
    );
  }

  return respuesta({
    ok: true,
    usuario: {
      id: creado.user.id,
      email: creado.user.email,
      nombre
    }
  });
});
