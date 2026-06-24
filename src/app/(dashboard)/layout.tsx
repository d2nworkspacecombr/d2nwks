import { redirect } from "next/navigation";
import { getUsuarioAtual } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await getUsuarioAtual();

  // Se o login existe no Supabase Auth mas ainda não tem registro em
  // "usuarios" (ex: admin esqueceu de configurar o perfil), bloqueia
  // o acesso em vez de deixar a tela quebrar.
  if (!usuario) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar usuario={usuario} />
      <main className="flex-1 ml-[260px] p-10 max-w-[1100px]">{children}</main>
    </div>
  );
}
