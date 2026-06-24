"use client";

import { useState } from "react";
import { vincularColaborador, desvincularColaborador } from "../actions";

const MODULOS = [
  { id: "assessoria", label: "Assessoria" },
  { id: "marketing", label: "Marketing" },
  { id: "comercial", label: "Comercial" },
];

type Vinculo = {
  id: string;
  modulo: string;
  usuario_id: string;
  usuarios: { nome: string; cargo: string | null } | null;
};

export default function VinculosForm({
  clienteId,
  vinculos,
  colaboradores,
}: {
  clienteId: string;
  vinculos: Vinculo[];
  colaboradores: { id: string; nome: string; cargo: string | null }[];
}) {
  const [usuarioId, setUsuarioId] = useState("");
  const [modulo, setModulo] = useState("assessoria");

  return (
    <div className="bg-white border border-line rounded-lg p-5">
      <h2 className="font-display text-[15px] font-bold uppercase tracking-wide text-navy mb-1">
        Colaboradores vinculados
      </h2>
      <p className="text-xs text-ink-faint mb-4">
        Só os colaboradores vinculados aqui conseguem ver e editar este
        cliente nos módulos correspondentes. Um cliente pode ter mais de um
        colaborador vinculado ao mesmo módulo.
      </p>

      <div className="space-y-2 mb-4">
        {vinculos.length === 0 && (
          <p className="text-xs text-ink-faint">Nenhum colaborador vinculado ainda.</p>
        )}
        {vinculos.map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-between bg-surface rounded px-3 py-2"
          >
            <span className="text-sm text-ink">
              {v.usuarios?.nome}{" "}
              <span className="text-[11px] text-ink-faint uppercase">
                · {v.modulo}
              </span>
            </span>
            <button
              onClick={() => desvincularColaborador(v.id, clienteId)}
              className="text-[11px] font-bold uppercase text-red-500"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <select
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
          className="flex-1 px-3 py-2 border border-line rounded text-sm"
        >
          <option value="">Selecione um colaborador...</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome} {c.cargo ? `(${c.cargo})` : ""}
            </option>
          ))}
        </select>
        <select
          value={modulo}
          onChange={(e) => setModulo(e.target.value)}
          className="px-3 py-2 border border-line rounded text-sm"
        >
          {MODULOS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
        <button
          disabled={!usuarioId}
          onClick={() => {
            vincularColaborador(clienteId, usuarioId, modulo);
            setUsuarioId("");
          }}
          className="px-4 py-2 bg-navy text-white text-[11px] font-bold uppercase tracking-wide rounded disabled:opacity-40"
        >
          Vincular
        </button>
      </div>
    </div>
  );
}
