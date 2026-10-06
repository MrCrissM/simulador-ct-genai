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

function esUuid(valor: unknown): valor is string {
  return typeof valor === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(valor);
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

  const clienteSesion = createClient(url, anonKey, {
    global: { headers: { Authorization: authorization } }
  });
  const {
    data: { user: solicitante },
    error: errorSesion
  } = await clienteSesion.auth.getUser();

  if (errorSesion || !solicitante) {
    return respuesta({ error: "Sesión no válida." }, 401);
  }

  const administrador = createClient(url, serviceRoleKey);
  const { data: perfilSolicitante, error: errorPerfil } = await administrador
    .from("perfiles")
    .select("rol")
    .eq("id", solicitante.id)
    .maybeSingle();

  if (errorPerfil) {
    console.error("No se pudo validar el perfil administrador.", errorPerfil);
    return respuesta({ error: "No se pudo verificar el perfil administrador." }, 500);
  }
  if (perfilSolicitante?.rol !== "admin") {
    return respuesta({ error: "No tienes permisos para administrar usuarios." }, 403);
  }

  let datos: { accion?: unknown; usuarioId?: unknown; rol?: unknown };
  try {
    datos = await request.json();
  } catch {
    return respuesta({ error: "Los datos enviados no son válidos." }, 400);
  }

  if (datos.accion === "listar") {
    const { data: perfiles, error: errorPerfiles } = await administrador
      .from("perfiles")
      .select("id, nombre, rol, creado_en")
      .order("creado_en", { ascending: false });

    if (errorPerfiles) {
      console.error("No se pudieron listar los perfiles.", errorPerfiles);
      return respuesta({ error: "No se pudo cargar el listado de usuarios." }, 500);
    }

    const { data: usuariosAuth, error: errorUsuariosAuth } = await administrador.auth.admin.listUsers({
      page: 1,
      perPage: 1000
    });
    if (errorUsuariosAuth) {
      console.error("No se pudieron listar los usuarios.", errorUsuariosAuth);
      return respuesta({ error: "No se pudo cargar el listado de usuarios." }, 500);
    }

    const correosPorId = new Map(
      usuariosAuth.users.map((usuario) => [usuario.id, usuario.email || ""])
    );
    return respuesta({
      ok: true,
      usuarios: perfiles.map((perfil) => ({
        ...perfil,
        email: correosPorId.get(perfil.id) || ""
      }))
    });
  }

  if (!esUuid(datos.usuarioId)) {
    return respuesta({ error: "El usuario indicado no es válido." }, 400);
  }
  const usuarioId = datos.usuarioId;

  if (usuarioId === solicitante.id) {
    return respuesta({ error: "No puedes modificar ni eliminar tu propia cuenta desde este panel." }, 400);
  }

  const { data: perfilObjetivo, error: errorObjetivo } = await administrador
    .from("perfiles")
    .select("id, nombre, rol")
    .eq("id", usuarioId)
    .maybeSingle();

  if (errorObjetivo) {
    console.error("No se pudo consultar el perfil objetivo.", errorObjetivo);
    return respuesta({ error: "No se pudo verificar el usuario seleccionado." }, 500);
  }
  if (!perfilObjetivo) {
    return respuesta({ error: "El usuario ya no existe o no tiene perfil." }, 404);
  }

  if (datos.accion === "cambiar-rol") {
    if (datos.rol !== "admin" && datos.rol !== "participante") {
      return respuesta({ error: "El rol indicado no es válido." }, 400);
    }

    if (perfilObjetivo.rol === "admin" && datos.rol === "participante") {
      const { count, error: errorConteo } = await administrador
        .from("perfiles")
        .select("id", { count: "exact", head: true })
        .eq("rol", "admin");

      if (errorConteo) {
        console.error("No se pudo contar los administradores.", errorConteo);
        return respuesta({ error: "No se pudo verificar los administradores." }, 500);
      }
      if ((count || 0) <= 1) {
        return respuesta({ error: "Debe mantenerse al menos un administrador." }, 400);
      }
    }

    const { error: errorCambio } = await administrador
      .from("perfiles")
      .update({ rol: datos.rol })
      .eq("id", usuarioId);

    if (errorCambio) {
      console.error("No se pudo cambiar el rol.", errorCambio);
      return respuesta({ error: "No se pudo cambiar el rol del usuario." }, 500);
    }
    return respuesta({ ok: true, mensaje: "Rol actualizado correctamente." });
  }

  if (datos.accion === "eliminar") {
    if (perfilObjetivo.rol === "admin") {
      const { count, error: errorConteo } = await administrador
        .from("perfiles")
        .select("id", { count: "exact", head: true })
        .eq("rol", "admin");

      if (errorConteo) {
        console.error("No se pudo contar los administradores.", errorConteo);
        return respuesta({ error: "No se pudo verificar los administradores." }, 500);
      }
      if ((count || 0) <= 1) {
        return respuesta({ error: "Debe mantenerse al menos un administrador." }, 400);
      }
    }

    const { error: errorEliminar } = await administrador.auth.admin.deleteUser(usuarioId);
    if (errorEliminar) {
      console.error("No se pudo eliminar el usuario.", errorEliminar);
      return respuesta({ error: "No se pudo eliminar la cuenta." }, 500);
    }
    return respuesta({ ok: true, mensaje: "Cuenta eliminada correctamente." });
  }

  return respuesta({ error: "La acción indicada no es válida." }, 400);
});
