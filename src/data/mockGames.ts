/**
 * Dados mockados de jogos populares para contornar problemas de CORS
 */

import { Game } from '../services/types';

// Dados mockados baseados em jogos reais da API do FreeToGame
export const mockGames: Game[] = [
  {
    id: 540,
    title: "Overwatch 2",
    thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg",
    short_description: "A hero-focused first-person team shooter from Blizzard Entertainment.",
    game_url: "https://www.freetogame.com/open/overwatch-2",
    genre: "Shooter",
    platform: "PC (Windows)",
    publisher: "Activision Blizzard",
    developer: "Blizzard Entertainment",
    release_date: "2022-10-04",
    freetogame_profile_url: "https://www.freetogame.com/overwatch-2"
  },
  {
    id: 516,
    title: "PUBG: BATTLEGROUNDS",
    thumbnail: "https://www.freetogame.com/g/516/thumbnail.jpg",
    short_description: "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
    game_url: "https://www.freetogame.com/open/pubg",
    genre: "Shooter",
    platform: "PC (Windows)",
    publisher: "KRAFTON, Inc.",
    developer: "KRAFTON, Inc.",
    release_date: "2022-01-12",
    freetogame_profile_url: "https://www.freetogame.com/pubg"
  },
  {
    id: 508,
    title: "Enlisted",
    thumbnail: "https://www.freetogame.com/g/508/thumbnail.jpg",
    short_description: "Get ready to command your own World War II military squad in Gaijin and Darkflow Software's MMO squad-based shooter Enlisted.",
    game_url: "https://www.freetogame.com/open/enlisted",
    genre: "Shooter",
    platform: "PC (Windows)",
    publisher: "Gaijin Entertainment",
    developer: "Darkflow Software",
    release_date: "2021-04-08",
    freetogame_profile_url: "https://www.freetogame.com/enlisted"
  },
  {
    id: 466,
    title: "Valorant",
    thumbnail: "https://www.freetogame.com/g/466/thumbnail.jpg",
    short_description: "Test your mettle in Riot Games' character-based FPS shooter Valorant.",
    game_url: "https://www.freetogame.com/open/valorant",
    genre: "Shooter",
    platform: "PC (Windows)",
    publisher: "Riot Games",
    developer: "Riot Games",
    release_date: "2020-06-02",
    freetogame_profile_url: "https://www.freetogame.com/valorant"
  },
  {
    id: 452,
    title: "Call of Duty: Warzone",
    thumbnail: "https://www.freetogame.com/g/452/thumbnail.jpg",
    short_description: "A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.",
    game_url: "https://www.freetogame.com/open/call-of-duty-warzone",
    genre: "Shooter",
    platform: "PC (Windows)",
    publisher: "Activision",
    developer: "Infinity Ward",
    release_date: "2020-03-10",
    freetogame_profile_url: "https://www.freetogame.com/call-of-duty-warzone"
  },
  {
    id: 23,
    title: "Apex Legends",
    thumbnail: "https://www.freetogame.com/g/23/thumbnail.jpg",
    short_description: "A free-to-play strategic battle royale game featuring 60-player matches and team-based play.",
    game_url: "https://www.freetogame.com/open/apex-legends",
    genre: "Shooter",
    platform: "PC (Windows)",
    publisher: "Electronic Arts",
    developer: "Respawn Entertainment",
    release_date: "2019-02-04",
    freetogame_profile_url: "https://www.freetogame.com/apex-legends"
  }
];

// Configurações pré-definidas para busca popular baseadas na API do FreeToGame
export const popularSearchConfigs = [
  {
    name: "Shooters Populares",
    description: "Jogos de tiro mais populares",
    filters: {
      platform: "pc" as const,
      category: "shooter" as const,
      sortBy: "popularity" as const
    },
    games: mockGames.filter(game => game.genre === "Shooter")
  },
  {
    name: "Battle Royale",
    description: "Jogos de battle royale gratuitos",
    filters: {
      platform: "pc" as const,
      category: "battle-royale" as const,
      sortBy: "popularity" as const
    },
    games: mockGames.filter(game => game.genre === "Battle Royale")
  },
  {
    name: "MMORPG",
    description: "Jogos de RPG online massivo",
    filters: {
      platform: "pc" as const,
      category: "mmorpg" as const,
      sortBy: "popularity" as const
    },
    games: mockGames.filter(game => game.genre === "MMORPG")
  },
  {
    name: "Estratégia",
    description: "Jogos de estratégia em tempo real",
    filters: {
      platform: "pc" as const,
      category: "strategy" as const,
      sortBy: "release-date" as const
    },
    games: mockGames.filter(game => game.genre === "Strategy")
  }
];

// Função para obter jogos baseado nos filtros
export const getMockGamesByFilters = (filters: any): Game[] => {
  let filteredGames = [...mockGames];

  // Filtrar por plataforma
  if (filters.platform) {
    filteredGames = filteredGames.filter(game => 
      game.platform?.toLowerCase().includes(filters.platform.toLowerCase())
    );
  }

  // Filtrar por categoria/gênero
  if (filters.category) {
    const categoryMap: { [key: string]: string[] } = {
      'shooter': ['Shooter'],
      'battle-royale': ['Battle Royale'],
      'strategy': ['Strategy'],
      'mmorpg': ['MMORPG'],
      'sports': ['Sports'],
      'racing': ['Racing'],
      'social': ['Social'],
      'sandbox': ['Sandbox']
    };

    const genres = categoryMap[filters.category] || [filters.category];
    filteredGames = filteredGames.filter(game => 
      game.genre && genres.some(genre => game.genre!.toLowerCase().includes(genre.toLowerCase()))
    );
  }

  // Ordenar
  if (filters.sortBy === 'popularity') {
    // Simular popularidade baseada no ID (jogos com ID menor são mais populares)
    filteredGames.sort((a, b) => a.id - b.id);
  } else if (filters.sortBy === 'release-date') {
    filteredGames.sort((a, b) => {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
      return dateB - dateA;
    });
  } else if (filters.sortBy === 'alphabetical') {
    filteredGames.sort((a, b) => a.title.localeCompare(b.title));
  }

  return filteredGames;
};
