import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D2N Workspace",
  description: "Plataforma de gestão operacional da D2N Carreira e Negócios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
