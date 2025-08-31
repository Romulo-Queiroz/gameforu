"use client";

import { useEffect, useState } from "react";
import { gameService } from "../../services/GameService";
import { Game, GameFilters } from "../../services/types";
import { popularSearchConfigs } from "../../data/mockGames";

export function RecommendedGames() {
  // Configuração inicial com jogos populares (PC, FPS, por popularidade)
  const [filters, setFilters] = useState<GameFilters>({
    platform: "pc",
    category: "shooter",
    sortBy: "popularity"
  });

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>("fps-populares");

  const fetchGames = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await gameService.getGames(filters);
      setGames(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [filters]);

  const handleFilterChange = (key: keyof GameFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setSelectedPreset("custom"); // Marcar como configuração customizada
  };

  const handlePresetSelect = (presetKey: string) => {
    const preset = popularSearchConfigs.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === presetKey);
    if (preset) {
      setFilters(preset.filters);
      setSelectedPreset(presetKey);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="container mx-auto px-6 pt-20 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            🔍 Search your game
          </h2>
          <div className="flex justify-center">
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed text-center">
              Descubra os melhores jogos gratuitos selecionados especialmente para você
            </p>
          </div>
        </div>

        {/* Configurações pré-salvadas */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h3 className="text-xl font-semibold mb-6 text-center">🔥 Buscas Populares</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {popularSearchConfigs.map((preset, index) => {
              const presetKey = preset.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <button
                  key={presetKey}
                  onClick={() => handlePresetSelect(presetKey)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedPreset === presetKey
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                  }`}
                  title={preset.description}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtros manuais */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <h3 className="text-xl font-semibold mb-4 text-center">⚙️ Filtros Personalizados</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <select
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.platform}
              onChange={(e) => handleFilterChange('platform', e.target.value)}
            >
              {gameService.getAvailablePlatforms().map((platform) => (
                <option key={platform} value={platform} className="bg-gray-800">
                  {platform.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              {gameService.getAvailableCategories().map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>

            <select
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              {gameService.getSortOptions().map((sort) => (
                <option key={sort} value={sort} className="bg-gray-800">
                  {sort.charAt(0).toUpperCase() + sort.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Informação sobre a API */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 text-green-100 px-6 py-4 rounded-xl mb-12 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-2xl">🎮</span>
            <p className="font-semibold text-lg">Os 3 melhores</p>
          </div>
          <p className="text-center text-sm opacity-90 leading-relaxed">
            Exibindo os 3 jogos mais populares da categoria selecionada, com dados e imagens reais do FreeToGame.
          </p>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-100 px-6 py-4 rounded-xl mb-12 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">⚠️</span>
              <p className="font-semibold text-lg">Erro ao carregar jogos</p>
            </div>
            <p className="text-center text-sm opacity-90 mb-4">{error}</p>
            <div className="text-center">
              <button 
                onClick={fetchGames}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/20 border-t-blue-500"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-purple-500 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <p className="text-gray-300 mt-4 text-lg font-medium">Carregando jogos...</p>
            <p className="text-gray-400 text-sm mt-2">Buscando os melhores jogos para você</p>
          </div>
        ) : (
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {games.map((game, index) => (
                <div
                  key={game.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-white/10 animate-fade-in-up"
                  style={{
                    animationDelay: `${1.6 + (index * 0.2)}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-game.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {game.genre}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                      {game.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {game.short_description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 bg-white/10 px-3 py-1.5 rounded-full font-medium">
                        {game.platform}
                      </span>
                      <a
                        href={game.game_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                      >
                        Jogar Agora
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && games.length === 0 && (
          <div className="text-center py-20 mb-16">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-gray-300 text-xl font-medium mb-2">Nenhum jogo encontrado</p>
            <p className="text-gray-400">Tente ajustar os filtros para encontrar mais jogos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
