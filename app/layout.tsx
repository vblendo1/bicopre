import type { Metadata } from "next";
import "./globals.css"; // Assumindo que você terá um arquivo de estilos globais

export const metadata: Metadata = {
  title: "Bico Premium - Money Arsenal",
  description: "Plataforma de oportunidades e ferramentas para renda extra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
