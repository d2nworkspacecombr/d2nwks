import { login } from "./actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { erro?: string };
}) {
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
          action={login}
          className="bg-white border border-line rounded-lg p-8 border-t-[3px] border-t-teal"
        >
          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-wide text-ink-soft mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
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
              name="password"
              required
              className="w-full px-3 py-2 border border-line rounded text-sm focus:outline-none focus:border-teal"
              placeholder="••••••••"
            />
          </div>

          {searchParams?.erro && (
            <p className="text-xs text-red-600 mt-2 mb-1">{searchParams.erro}</p>
          )}

          <button
            type="submit"
            className="w-full mt-5 py-3 rounded bg-d2n-grad text-white text-sm font-bold uppercase tracking-wide"
          >
            Entrar
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
