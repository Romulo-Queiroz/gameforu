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
    <section className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">🎮 Jogos Recomendados</h2>

      {/* Configurações pré-salvadas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">🔥 Buscas Populares</h3>
        <div className="flex flex-wrap gap-2">
          {popularSearchConfigs.map((preset) => {
            const presetKey = preset.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <button
                key={presetKey}
                onClick={() => handlePresetSelect(presetKey)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedPreset === presetKey
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">⚙️ Filtros Personalizados</h3>
        <div className="flex flex-wrap gap-4">
          <select
            className="bg-gray-800 p-2 rounded text-white"
            value={filters.platform}
            onChange={(e) => handleFilterChange('platform', e.target.value)}
          >
            {gameService.getAvailablePlatforms().map((platform) => (
              <option key={platform} value={platform}>
                {platform.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            className="bg-gray-800 p-2 rounded text-white"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            {gameService.getAvailableCategories().map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>

          <select
            className="bg-gray-800 p-2 rounded text-white"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          >
            {gameService.getSortOptions().map((sort) => (
              <option key={sort} value={sort}>
                {sort.charAt(0).toUpperCase() + sort.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Informação sobre a API */}
      <div className="bg-green-900/30 border border-green-500 text-green-200 px-4 py-3 rounded mb-4">
        <p className="font-semibold">🎮 Jogos Reais da API</p>
        <p className="text-sm">Exibindo os 3 jogos mais populares da categoria selecionada, com dados e imagens reais do FreeToGame.</p>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Erro ao carregar jogos:</p>
          <p>{error}</p>
          <button 
            onClick={fetchGames}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-400 ml-3">Carregando jogos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-900/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-game.jpg';
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-3">
                  {game.short_description}
                </p>
                <a
                  href={game.game_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors duration-200"
                >
                  Jogar Agora
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && games.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">Nenhum jogo encontrado com os filtros selecionados.</p>
        </div>
      )}
    </section>
  );
}
