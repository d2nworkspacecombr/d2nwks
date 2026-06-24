import { createClient } from "@/lib/supabase/server";
import type { Usuario } from "@/types/database";

// Busca o usuário logado + seu perfil (role) na tabela "usuarios".
// Use em Server Components / Server Actions.
export async function getUsuarioAtual(): Promise<Usuario | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("usuarios")
    .select("id, nome, email, role, cargo, ativo")
    .eq("id", user.id)
    .single();

  return data as Usuario | null;
}
