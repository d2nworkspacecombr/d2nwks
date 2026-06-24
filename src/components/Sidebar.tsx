"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Usuario } from "@/types/database";

const NAV = [
  { href: "/", label: "Início" },
  { href: "/clientes", label: "Clientes" },
  { href: "/assessoria", label: "Assessoria" },
  { href: "/diagnostico", label: "Diagnóstico" },
];

export default function Sidebar({ usuario }: { usuario: Usuario }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function sair() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-[260px] flex-shrink-0 bg-white border-r border-line flex flex-col fixed top-0 left-0 bottom-0 z-20">
      <div className="h-[60px] flex items-center gap-3 px-5 border-b border-line bg-navy-dark">
        <div className="w-8 h-8 rounded-md border-2 border-teal flex items-center justify-center text-teal font-display font-bold text-[13px]">
          D2N
        </div>
        <div className="leading-tight">
          <div className="font-display text-[12px] font-bold tracking-wide text-teal uppercase">
            D2N Workspace
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {NAV.map((item) => {
          const ativo = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-5 py-2.5 text-sm font-medium border-l-[3px] transition-colors ${
                ativo
                  ? "border-l-teal bg-[#e8f4ff] text-navy"
                  : "border-l-transparent text-ink-soft hover:bg-surface"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line p-4">
        <div className="text-[13px] font-semibold text-ink">{usuario.nome}</div>
        <div className="text-[11px] text-ink-faint uppercase tracking-wide mb-3">
          {usuario.role === "admin" ? "Administrador" : usuario.cargo || "Colaborador"}
        </div>
        <button
          onClick={sair}
          className="text-[11px] font-bold uppercase tracking-wide text-teal-dark"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
