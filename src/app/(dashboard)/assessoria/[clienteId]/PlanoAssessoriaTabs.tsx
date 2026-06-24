"use client";

import { useState } from "react";
import type {
  AssessoriaSessao,
  AssessoriaPlanejamento,
  AssessoriaOkr,
} from "@/types/database";
import { criarSessao, salvarPilar, criarOkr, atualizarProgressoOkr } from "./actions";

type Aba = "sessoes" | "planejamento" | "okrs";

export default function PlanoAssessoriaTabs({
  clienteId,
  sessoes,
  planejamento,
  okrs,
  pilares,
}: {
  clienteId: string;
  sessoes: AssessoriaSessao[];
  planejamento: AssessoriaPlanejamento[];
  okrs: AssessoriaOkr[];
  pilares: string[];
}) {
  const [aba, setAba] = useState<Aba>("sessoes");

  const TABS: { id: Aba; label: string }[] = [
    { id: "sessoes", label: "Sessões de atendimento" },
    { id: "planejamento", label: "Planejamento estratégico" },
    { id: "okrs", label: "Plano tático (OKRs)" },
  ];

  return (
    <div>
      <div className="flex gap-1 border-b border-line mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setAba(t.id)}
            className={`px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide border-b-2 -mb-px transition-colors ${
              aba === t.id
                ? "border-teal text-navy"
                : "border-transparent text-ink-faint hover:text-ink-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {aba === "sessoes" && (
        <AbaSessoes clienteId={clienteId} sessoes={sessoes} />
      )}
      {aba === "planejamento" && (
        <AbaPlanejamento
          clienteId={clienteId}
          planejamento={planejamento}
          pilares={pilares}
        />
      )}
      {aba === "okrs" && <AbaOkrs clienteId={clienteId} okrs={okrs} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
function AbaSessoes({
  clienteId,
  sessoes,
}: {
  clienteId: string;
  sessoes: AssessoriaSessao[];
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAberto(!aberto)}
          className="px-4 py-2 bg-d2n-grad text-white text-[11px] font-bold uppercase tracking-wide rounded"
        >
          {aberto ? "Cancelar" : "Nova sessão"}
        </button>
      </div>

      {aberto && (
        <form
          action={async (formData) => {
            await criarSessao(clienteId, formData);
            setAberto(false);
          }}
          className="bg-white border border-line rounded-lg p-5 mb-6 space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <Campo label="Título" name="titulo" required />
            <Campo label="Data" name="data_sessao" type="date" required />
          </div>
          <CampoArea label="Pauta" name="pauta" />
          <CampoArea label="Resumo da sessão" name="resumo" />
          <CampoArea label="Encaminhamentos" name="encaminhamentos" />
          <button className="px-4 py-2 bg-navy text-white text-[11px] font-bold uppercase tracking-wide rounded">
            Salvar sessão
          </button>
        </form>
      )}

      {sessoes.length === 0 ? (
        <VazioCard texto="Nenhuma sessão registrada ainda." />
      ) : (
        <div className="space-y-3">
          {sessoes.map((s) => (
            <div key={s.id} className="bg-white border border-line rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-navy uppercase tracking-wide text-[15px]">
                  {s.titulo}
                </h3>
                <span className="text-[11px] text-ink-faint">
                  {new Date(s.data_sessao + "T00:00:00").toLocaleDateString("pt-BR")}
                </span>
              </div>
              {s.pauta && <CampoTexto rotulo="Pauta" valor={s.pauta} />}
              {s.resumo && <CampoTexto rotulo="Resumo" valor={s.resumo} />}
              {s.encaminhamentos && (
                <CampoTexto rotulo="Encaminhamentos" valor={s.encaminhamentos} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
function AbaPlanejamento({
  clienteId,
  planejamento,
  pilares,
}: {
  clienteId: string;
  planejamento: AssessoriaPlanejamento[];
  pilares: string[];
}) {
  return (
    <div className="space-y-4">
      {pilares.map((pilar) => {
        const atual = planejamento.find((p) => p.pilar === pilar);
        return (
          <details
            key={pilar}
            className="bg-white border border-line rounded-lg p-5"
            open={pilar === pilares[0]}
          >
            <summary className="font-display font-bold text-navy uppercase tracking-wide text-[15px] cursor-pointer">
              {pilar}
            </summary>
            <form
              action={(formData) => salvarPilar(clienteId, pilar, formData)}
              className="space-y-3 mt-4"
            >
              <CampoArea
                label="Objetivo"
                name="objetivo"
                defaultValue={atual?.objetivo || ""}
              />
              <CampoArea
                label="Diagnóstico"
                name="diagnostico"
                defaultValue={atual?.diagnostico || ""}
              />
              <CampoArea
                label="Estratégia"
                name="estrategia"
                defaultValue={atual?.estrategia || ""}
              />
              <button className="px-4 py-2 bg-navy text-white text-[11px] font-bold uppercase tracking-wide rounded">
                Salvar {pilar}
              </button>
            </form>
          </details>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
function AbaOkrs({
  clienteId,
  okrs,
}: {
  clienteId: string;
  okrs: AssessoriaOkr[];
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setAberto(!aberto)}
          className="px-4 py-2 bg-d2n-grad text-white text-[11px] font-bold uppercase tracking-wide rounded"
        >
          {aberto ? "Cancelar" : "Novo OKR"}
        </button>
      </div>

      {aberto && (
        <form
          action={async (formData) => {
            await criarOkr(clienteId, formData);
            setAberto(false);
          }}
          className="bg-white border border-line rounded-lg p-5 mb-6 space-y-3"
        >
          <Campo label="Objetivo" name="objetivo" required />
          <Campo label="Resultado-chave" name="resultado_chave" required />
          <div className="grid grid-cols-2 gap-3">
            <Campo label="Progresso inicial (%)" name="progresso" type="number" />
            <Campo label="Prazo" name="prazo" type="date" />
          </div>
          <button className="px-4 py-2 bg-navy text-white text-[11px] font-bold uppercase tracking-wide rounded">
            Salvar OKR
          </button>
        </form>
      )}

      {okrs.length === 0 ? (
        <VazioCard texto="Nenhum OKR cadastrado ainda." />
      ) : (
        <div className="space-y-3">
          {okrs.map((o) => (
            <div key={o.id} className="bg-white border border-line rounded-lg p-5">
              <div className="text-[13px] font-semibold text-navy mb-1">
                {o.objetivo}
              </div>
              <div className="text-[12px] text-ink-soft mb-3">
                {o.resultado_chave}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-d2n-grad rounded-full"
                    style={{ width: `${o.progresso}%` }}
                  />
                </div>
                <input
                  type="number"
                  min={0}
                  max={100}
                  defaultValue={o.progresso}
                  className="w-16 text-xs border border-line rounded px-2 py-1"
                  onBlur={(e) =>
                    atualizarProgressoOkr(o.id, Number(e.target.value), clienteId)
                  }
                />
                <span className="text-[11px] text-ink-faint">%</span>
              </div>
              {o.prazo && (
                <div className="text-[11px] text-ink-faint mt-2">
                  Prazo: {new Date(o.prazo + "T00:00:00").toLocaleDateString("pt-BR")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pequenos componentes de apoio
function Campo({
  label,
  name,
  type = "text",
  required = false,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
      />
    </div>
  );
}

function CampoArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
      />
    </div>
  );
}

function CampoTexto({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="mb-2">
      <div className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">
        {rotulo}
      </div>
      <p className="text-[13px] text-ink-soft whitespace-pre-wrap">{valor}</p>
    </div>
  );
}

function VazioCard({ texto }: { texto: string }) {
  return (
    <div className="bg-white border border-line rounded-lg p-10 text-center">
      <p className="text-sm text-ink-faint">{texto}</p>
    </div>
  );
}
