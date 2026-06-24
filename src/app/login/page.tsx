"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        router.replace("/");
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setCarregando(false);

    if (error) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-icon.png"
            alt="D2N Carreira e Negócios"
            className="w-16 h-16 rounded-xl mb-4"
          />
          <h1 className="font-display text-2xl font-bold text-navy uppercase tracking-wide">
            D2N Workspace
          </h1>
          <p className="text-sm text-ink-faint mt-1">
            Plataforma interna D2N Carreira e Negócios
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-line rounded-lg p-8 border-t-[3px] border-t-teal"
        >
          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
              placeholder="seu@email.com"
            />
          </div>

          <div className="mb-2">
            <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
              placeholder="••••••••"
            />
          </div>

          {erro && (
            <p className="text-xs text-red-600 mt-2 mb-1">{erro}</p>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full mt-5 py-3 rounded bg-d2n-grad text-white text-sm font-bold uppercase tracking-wide disabled:opacity-50"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="text-center text-xs text-ink-faint mt-6">
          Acesso restrito a colaboradores e clientes D2N.
          <br />
          Esqueceu a senha? Fale com o administrador.
        </p>
      </div>
    </div>
  );
}
