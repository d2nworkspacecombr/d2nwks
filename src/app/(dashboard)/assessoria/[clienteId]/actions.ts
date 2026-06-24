"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function criarSessao(clienteId: string, formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from("assessoria_sessoes").insert({
    cliente_id: clienteId,
    titulo: formData.get("titulo") as string,
    data_sessao: formData.get("data_sessao") as string,
    pauta: formData.get("pauta") as string,
    resumo: formData.get("resumo") as string,
    encaminhamentos: formData.get("encaminhamentos") as string,
    registrado_por: user?.id,
  });

  revalidatePath(`/assessoria/${clienteId}`);
}

export async function salvarPilar(
  clienteId: string,
  pilar: string,
  formData: FormData
) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from("assessoria_planejamento").upsert(
    {
      cliente_id: clienteId,
      pilar,
      objetivo: formData.get("objetivo") as string,
      diagnostico: formData.get("diagnostico") as string,
      estrategia: formData.get("estrategia") as string,
      atualizado_por: user?.id,
      atualizado_em: new Date().toISOString(),
    },
    { onConflict: "cliente_id,pilar" }
  );

  revalidatePath(`/assessoria/${clienteId}`);
}

export async function criarOkr(clienteId: string, formData: FormData) {
  const supabase = createClient();

  await supabase.from("assessoria_okrs").insert({
    cliente_id: clienteId,
    objetivo: formData.get("objetivo") as string,
    resultado_chave: formData.get("resultado_chave") as string,
    progresso: Number(formData.get("progresso") || 0),
    prazo: (formData.get("prazo") as string) || null,
  });

  revalidatePath(`/assessoria/${clienteId}`);
}

export async function atualizarProgressoOkr(okrId: string, progresso: number, clienteId: string) {
  const supabase = createClient();
  await supabase
    .from("assessoria_okrs")
    .update({ progresso, atualizado_em: new Date().toISOString() })
    .eq("id", okrId);

  revalidatePath(`/assessoria/${clienteId}`);
}
