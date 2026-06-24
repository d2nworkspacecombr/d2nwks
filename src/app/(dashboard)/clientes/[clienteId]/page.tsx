import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUsuarioAtual } from "@/lib/auth";
import VinculosForm from "./VinculosForm";

export default async function ClienteDetalhePage({
  params,
}: {
  params: { clienteId: string };
}) {
  const supabase = createClient();
  const usuario = await getUsuarioAtual();
  const clienteId = params.clienteId;

  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("id", clienteId)
    .single();

  if (!cliente) notFound();

  const { data: vinculos } = await supabase
    .from("vinculo_colaborador_cliente")
    .select("id, modulo, usuario_id, usuarios:usuario_id(nome, cargo)")
    .eq("cliente_id", clienteId);

  const { data: colaboradores } = await supabase
    .from("usuarios")
    .select("id, nome, cargo")
    .eq("role", "colaborador")
    .eq("ativo", true)
    .order("nome");

  return (
    <div>
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-wide text-teal-dark mb-1">
          Cliente
        </div>
        <h1 className="font-display text-[28px] font-bold uppercase tracking-wide text-navy">
          {cliente.nome}
        </h1>
        <p className="text-xs text-ink-faint mt-1">
          {cliente.segmento} · {(cliente.servicos || []).join(", ")}
        </p>
      </div>

      {usuario?.role === "admin" && (
        <VinculosForm
          clienteId={clienteId}
          vinculos={(vinculos as any) || []}
          colaboradores={colaboradores || []}
        />
      )}
    </div>
  );
}
