import { Game, GameFilters } from './types';
import { getMockGamesByFilters, mockGames } from '../data/mockGames';

class GameService {
  private baseUrl = 'https://www.freetogame.com/api';
  private useMockData = true; // Flag para alternar entre API real e dados mockados

  async getGames(filters: GameFilters = {}): Promise<Game[]> {
    // Se estiver usando dados mockados, retornar dados locais
    if (this.useMockData) {
      console.log('🎮 Usando dados mockados para jogos populares');
      return new Promise((resolve) => {
        // Simular delay de rede
        setTimeout(() => {
          const games = getMockGamesByFilters(filters);
          resolve(games);
        }, 500);
      });
    }

    // Tentar buscar da API real (com fallback para dados mockados)
    try {
      const params = new URLSearchParams();
      
      if (filters.platform) {
        params.append('platform', filters.platform);
      }
      
      if (filters.category) {
        params.append('category', filters.category);
      }
      
      if (filters.sortBy) {
        params.append('sort-by', filters.sortBy);
      }

      const url = `${this.baseUrl}/games?${params.toString()}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn('⚠️ Erro ao buscar da API, usando dados mockados:', error);
      // Fallback para dados mockados em caso de erro
      return getMockGamesByFilters(filters);
    }
  }

  async getGameById(id: number): Promise<Game> {
    try {
      const response = await fetch(`${this.baseUrl}/game?id=${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching game:', error);
      throw new Error('Failed to fetch game');
    }
  }

  getAvailablePlatforms(): string[] {
    return ["pc", "browser"];
  }

  getAvailableCategories(): string[] {
    return [
      "mmorpg", "shooter", "strategy", "racing", "sports", "social", 
      "sandbox", "open-world", "survival", "pvp", "pve", "pixel", 
      "voxel", "zombie", "turn-based", "first-person", "third-Person", 
      "top-down", "tank", "space", "sailing", "side-scroller", 
      "superhero", "permadeath", "card", "battle-royale", "mmo", 
      "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", 
      "fighting", "action-rpg", "action", "military", "martial-arts", 
      "flight", "low-spec", "tower-defense", "horror", "mmorts"
    ];
  }

  getSortOptions(): string[] {
    return ["release-date", "popularity", "alphabetical"];
  }
}

export const gameService = new GameService();

