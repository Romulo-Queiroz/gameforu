import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-white relative z-10">
      <div className="flex-grow p-6 text-center flex items-center justify-center">
        <div className="backdrop-blur-sm bg-white/10 rounded-lg p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-4 text-white">Bem-vindo!</h1>
          <p className="mt-4 text-gray-100 text-lg">Conteúdo da página...</p>
        </div>
      </div>
    </div>
  );
}
