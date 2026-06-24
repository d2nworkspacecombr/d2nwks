import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUsuarioAtual } from "@/lib/auth";
import NovoClienteForm from "./NovoClienteForm";

export default async function ClientesPage() {
  const supabase = createClient();
  const usuario = await getUsuarioAtual();

  const { data: clientes } = await supabase
    .from("clientes")
    .select("id, nome, segmento, servicos, status")
    .order("nome");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wide text-teal-dark mb-1">
            Cadastro
          </div>
          <h1 className="font-display text-[28px] font-bold uppercase tracking-wide text-navy">
            Clientes
          </h1>
        </div>
      </div>

      {usuario?.role === "admin" && <NovoClienteForm />}

      {clientes && clientes.length > 0 ? (
        <div className="bg-white border border-line rounded-lg overflow-hidden mt-6">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line text-left">
                  Cliente
                </th>
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line text-left">
                  Segmento
                </th>
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line text-left">
                  Serviços
                </th>
                <th className="text-[10px] uppercase tracking-wide text-ink-faint font-semibold px-4 py-3 border-b border-line text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id} className="hover:bg-surface">
                  <td className="px-4 py-3 border-b border-line">
                    <Link
                      href={`/clientes/${c.id}`}
                      className="text-sm font-semibold text-navy hover:text-teal-dark"
                    >
                      {c.nome}
                    </Link>
                  </td>
                  <td className="px-4 py-3 border-b border-line text-sm text-ink-soft">
                    {c.segmento || "—"}
                  </td>
                  <td className="px-4 py-3 border-b border-line text-sm text-ink-soft">
                    {(c.servicos || []).join(", ") || "—"}
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
      ) : (
        <div className="bg-white border border-line rounded-lg p-10 text-center mt-6">
          <p className="text-sm text-ink-faint">Nenhum cliente cadastrado ainda.</p>
        </div>
      )}
    </div>
  );
}
