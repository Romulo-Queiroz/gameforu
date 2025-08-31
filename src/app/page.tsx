"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/recommended-games");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Bem vindo ao Games for U 
          </h1>
          <div className="flex justify-center">
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed text-center">
              Descubra seu próximo jogo favorito em segundos
            </p>
          </div>
          
          {/* CTA Principal */}
          <div className="mb-12">
            <button
              onClick={handleSearchClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 animate-bounce"
            >
              🔍 Buscar Jogos Agora
            </button>
          </div>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Busca Instantânea</h3>
            <p className="text-gray-300">Encontre jogos em tempo real com nossa tecnologia avançada</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Recomendações Personalizadas</h3>
            <p className="text-gray-300">Algoritmo inteligente que aprende seus gostos</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">🆓</div>
            <h3 className="text-xl font-bold mb-3">100% Gratuito</h3>
            <p className="text-gray-300">Acesso completo sem custos ou assinaturas</p>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-2xl p-8 mb-16 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Números que Impressionam</h2>
            <p className="text-gray-300">Milhares de jogadores já descobriram seus favoritos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-300">Jogos Disponíveis</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-gray-300">Usuários Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">99%</div>
              <div className="text-gray-300">Satisfação</div>
            </div>
          </div>
        </div>

        {/* Testemunhos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">O que nossos usuários dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  A
                </div>
                <div>
                  <div className="font-bold">Alex Silva</div>
                  <div className="text-gray-400 text-sm">Gamer Casual</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Encontrei 3 jogos incríveis em menos de 5 minutos! A busca é perfeita."</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  M
                </div>
                <div>
                  <div className="font-bold">Maria Santos</div>
                  <div className="text-gray-400 text-sm">Streamer</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"As recomendações são spot-on! Sempre encontro algo novo para streamar."</p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para descobrir?</h2>
          <p className="text-gray-300 mb-8 text-lg">Junte-se a milhares de gamers que já encontraram seus jogos favoritos</p>
          <button
            onClick={handleSearchClick}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-10 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/25"
          >
            🔍 Começar Busca Agora
          </button>
        </div>

      </div>
    </div>
  );
}
