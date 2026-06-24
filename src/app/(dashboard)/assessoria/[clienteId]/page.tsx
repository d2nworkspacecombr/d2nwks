import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PlanoAssessoriaTabs from "./PlanoAssessoriaTabs";

const PILARES = ["Comercial", "Marketing", "Processos", "Pessoas", "Finanças"];

export default async function ClienteAssessoriaPage({
  params,
}: {
  params: { clienteId: string };
}) {
  const supabase = createClient();
  const clienteId = params.clienteId;

  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", clienteId)
    .single();

  if (!cliente) notFound(); // também cobre o caso de RLS bloquear o acesso

  const [{ data: sessoes }, { data: planejamento }, { data: okrs }] =
    await Promise.all([
      supabase
        .from("assessoria_sessoes")
        .select("*")
        .eq("cliente_id", clienteId)
        .order("data_sessao", { ascending: false }),
      supabase
        .from("assessoria_planejamento")
        .select("*")
        .eq("cliente_id", clienteId),
      supabase
        .from("assessoria_okrs")
        .select("*")
        .eq("cliente_id", clienteId)
        .order("prazo"),
    ]);

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wide text-teal-dark mb-1">
          Plano de Assessoria
        </div>
        <h1 className="font-display text-[28px] font-bold uppercase tracking-wide text-navy">
          {cliente.nome}
        </h1>
        {cliente.interlocutor && (
          <p className="text-xs text-ink-faint mt-1">
            Interlocutor: {cliente.interlocutor}
          </p>
        )}
      </div>

      <PlanoAssessoriaTabs
        clienteId={clienteId}
        sessoes={sessoes || []}
        planejamento={planejamento || []}
        okrs={okrs || []}
        pilares={PILARES}
      />
    </div>
  );
}
