import { getUsuarioAtual } from "@/lib/auth";

export default async function HomePage() {
  const usuario = await getUsuarioAtual();

  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-wide text-teal-dark mb-2">
        D2N Workspace
      </div>
      <h1 className="font-display text-[36px] font-bold uppercase tracking-wide text-navy mb-3">
        Olá, {usuario?.nome?.split(" ")[0]}
      </h1>
      <p className="text-[15px] text-ink-soft max-w-[520px] leading-relaxed">
        Use o menu à esquerda para acessar os clientes, o módulo de
        Assessoria e o Diagnóstico empresarial.
      </p>
    </div>
  );
}
