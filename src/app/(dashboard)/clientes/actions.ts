"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function criarCliente(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const servicosRaw = formData.getAll("servicos") as string[];

  await supabase.from("clientes").insert({
    nome: formData.get("nome") as string,
    segmento: formData.get("segmento") as string,
    porte: formData.get("porte") as string,
    interlocutor: formData.get("interlocutor") as string,
    telefone: formData.get("telefone") as string,
    email: formData.get("email") as string,
    servicos: servicosRaw,
    criado_por: user?.id,
  });

  revalidatePath("/clientes");
}

export async function vincularColaborador(
  clienteId: string,
  usuarioId: string,
  modulo: string
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from("vinculo_colaborador_cliente").insert({
    cliente_id: clienteId,
    usuario_id: usuarioId,
    modulo,
    vinculado_por: user?.id,
  });

  revalidatePath(`/clientes/${clienteId}`);
}

export async function desvincularColaborador(vinculoId: string, clienteId: string) {
  const supabase = createClient();
  await supabase.from("vinculo_colaborador_cliente").delete().eq("id", vinculoId);
  revalidatePath(`/clientes/${clienteId}`);
}
