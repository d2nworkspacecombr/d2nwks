import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AssessoriaPage() {
  const supabase = createClient();

  // O Supabase já filtra automaticamente pelas regras de permissão (RLS):
  // Admin vê todos os clientes de assessoria; um Colaborador só vê os
  // clientes em que o Admin o vinculou.
  const { data: clientes, error } = await supabase
    .from("clientes")
    .select("id, nome, segmento, status, interlocutor")
    .contains("servicos", ["assessoria"])
    .order("nome");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wide text-teal-dark mb-1">
            Módulo
          </div>
          <h1 className="font-display text-[28px] font-bold uppercase tracking-wide text-navy">
            Assessoria
          </h1>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-4">
          Não foi possível carregar os clientes: {error.message}
        </p>
      )}

      {!error && clientes?.length === 0 && (
        <div className="bg-white border border-line rounded-lg p-10 text-center">
          <p className="text-sm text-ink-faint">
            Nenhum cliente de Assessoria vinculado a você ainda.
            <br />
            Peça ao administrador para vincular um cliente ao seu acesso.
          </p>
        </div>
      )}

      {clientes && clientes.length > 0 && (
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line">
                  Cliente
                </th>
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line">
                  Segmento
                </th>
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line">
                  Interlocutor
                </th>
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id} className="hover:bg-surface">
                  <td className="px-4 py-3 border-b border-line">
                    <Link
                      href={`/assessoria/${c.id}`}
                      className="text-sm font-semibold text-navy hover:text-teal-dark"
                    >
                      {c.nome}
                    </Link>
                  </td>
                  <td className="px-4 py-3 border-b border-line text-sm text-ink-soft">
                    {c.segmento || "—"}
                  </td>
                  <td className="px-4 py-3 border-b border-line text-sm text-ink-soft">
                    {c.interlocutor || "—"}
                  </td>
                  <td className="px-4 py-3 border-b border-line">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-teal-light text-teal-dark">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
