import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Background } from "./shared/background/background";
import { Navbar } from "./shared/navbar";
import { Footer } from "./shared/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GameForU - Descubra Jogos Incríveis",
  description: "Encontre os melhores jogos gratuitos e populares. Explore diferentes categorias, plataformas e descubra seu próximo jogo favorito.",
  keywords: ["jogos", "games", "gratuitos", "pc", "browser", "fps", "rpg", "mmorpg"],
  authors: [{ name: "GameForU Team" }],
  openGraph: {
    title: "GameForU - Descubra Jogos Incríveis",
    description: "Encontre os melhores jogos gratuitos e populares",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
        suppressHydrationWarning={true}
      >
        <div className="relative min-h-screen flex flex-col">
          <Background children={undefined} />
          <Navbar />
          <main className="relative z-10 flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
