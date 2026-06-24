"use client";

import { useState } from "react";
import { criarCliente } from "./actions";

const SERVICOS = [
  { id: "assessoria", label: "Assessoria Estratégica" },
  { id: "marketing", label: "Marketing de Redes Sociais" },
  { id: "comercial", label: "Assessoria Comercial" },
  { id: "trafego_pago", label: "Tráfego Pago" },
  { id: "big_bang", label: "Big Bang da Marca" },
];

export default function NovoClienteForm() {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="mb-2">
      <div className="flex justify-end">
        <button
          onClick={() => setAberto(!aberto)}
          className="px-4 py-2 bg-d2n-grad text-white text-[11px] font-bold uppercase tracking-wide rounded"
        >
          {aberto ? "Cancelar" : "Novo cliente"}
        </button>
      </div>

      {aberto && (
        <form
          action={async (formData) => {
            await criarCliente(formData);
            setAberto(false);
          }}
          className="bg-white border border-line rounded-lg p-5 mt-4 space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
                Nome do cliente
              </label>
              <input
                name="nome"
                required
                className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
                Segmento
              </label>
              <input
                name="segmento"
                className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
                Interlocutor
              </label>
              <input
                name="interlocutor"
                className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
                Telefone
              </label>
              <input
                name="telefone"
                className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-2">
              Serviços contratados
            </label>
            <div className="flex flex-wrap gap-3">
              {SERVICOS.map((s) => (
                <label key={s.id} className="flex items-center gap-1.5 text-xs text-ink-soft">
                  <input type="checkbox" name="servicos" value={s.id} />
                  {s.label}
                </label>
              ))}
            </div>
          </div>

          <button className="px-4 py-2 bg-navy text-white text-[11px] font-bold uppercase tracking-wide rounded">
            Salvar cliente
          </button>
        </form>
      )}
    </div>
  );
}
