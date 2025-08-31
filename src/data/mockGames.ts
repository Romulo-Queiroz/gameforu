/**
 * Dados mockados de jogos populares para contornar problemas de CORS
 */

import { Game } from '../services/types';

export const mockGames: Game[] = [
  {
    id: 1,
    title: "Counter-Strike 2",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2y.jpg",
    short_description: "Counter-Strike 2 é a evolução do jogo de tiro tático mais jogado do mundo. Construído com a Source 2, apresenta mapas redesenhados, iluminação dinâmica e novos efeitos visuais.",
    game_url: "https://store.steampowered.com/app/730/CounterStrike_2/",
    genre: "FPS",
    platform: "PC",
    publisher: "Valve",
    developer: "Valve",
    release_date: "2023-09-27",
    freetogame_profile_url: "https://www.freetogame.com/counter-strike-2"
  },
  {
    id: 2,
    title: "Valorant",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rpf.jpg",
    short_description: "Valorant é um jogo de tiro tático 5v5 baseado em personagens onde você combina precisão, estratégia e habilidades únicas para dominar o campo de batalha.",
    game_url: "https://playvalorant.com/",
    genre: "FPS",
    platform: "PC",
    publisher: "Riot Games",
    developer: "Riot Games",
    release_date: "2020-06-02",
    freetogame_profile_url: "https://www.freetogame.com/valorant"
  },
  {
    id: 3,
    title: "League of Legends",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    short_description: "League of Legends é um MOBA estratégico onde duas equipes de cinco campeões poderosos se enfrentam para destruir a base uma da outra.",
    game_url: "https://www.leagueoflegends.com/",
    genre: "MOBA",
    platform: "PC",
    publisher: "Riot Games",
    developer: "Riot Games",
    release_date: "2009-10-27",
    freetogame_profile_url: "https://www.freetogame.com/league-of-legends"
  },
  {
    id: 4,
    title: "Apex Legends",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r6l.jpg",
    short_description: "Apex Legends é um battle royale gratuito onde lendas com habilidades únicas se unem para lutar pela fama e fortuna na Fronteira.",
    game_url: "https://www.ea.com/games/apex-legends",
    genre: "Battle Royale",
    platform: "PC",
    publisher: "Electronic Arts",
    developer: "Respawn Entertainment",
    release_date: "2019-02-04",
    freetogame_profile_url: "https://www.freetogame.com/apex-legends"
  },
  {
    id: 5,
    title: "Fortnite",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r6l.jpg",
    short_description: "Fortnite é um jogo de sobrevivência onde você constrói, luta e sobrevive. Baixe gratuitamente e lute para ser o último sobrevivente.",
    game_url: "https://www.epicgames.com/fortnite/",
    genre: "Battle Royale",
    platform: "PC",
    publisher: "Epic Games",
    developer: "Epic Games",
    release_date: "2017-07-25",
    freetogame_profile_url: "https://www.freetogame.com/fortnite"
  },
  {
    id: 6,
    title: "World of Warcraft",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    short_description: "World of Warcraft é um MMORPG épico onde você cria um herói e explora o mundo de Azeroth, completando missões e enfrentando desafios.",
    game_url: "https://worldofwarcraft.blizzard.com/",
    genre: "MMORPG",
    platform: "PC",
    publisher: "Blizzard Entertainment",
    developer: "Blizzard Entertainment",
    release_date: "2004-11-23",
    freetogame_profile_url: "https://www.freetogame.com/world-of-warcraft"
  },
  {
    id: 7,
    title: "Dota 2",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    short_description: "Dota 2 é um MOBA estratégico onde duas equipes de cinco heróis se enfrentam para destruir a base inimiga e proteger a sua própria.",
    game_url: "https://www.dota2.com/",
    genre: "MOBA",
    platform: "PC",
    publisher: "Valve",
    developer: "Valve",
    release_date: "2013-07-09",
    freetogame_profile_url: "https://www.freetogame.com/dota-2"
  },
  {
    id: 8,
    title: "Rocket League",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r6l.jpg",
    short_description: "Rocket League é futebol, mas com carros! Combine futebol com corrida em partidas caóticas e divertidas.",
    game_url: "https://www.rocketleague.com/",
    genre: "Sports",
    platform: "PC",
    publisher: "Psyonix",
    developer: "Psyonix",
    release_date: "2015-07-07",
    freetogame_profile_url: "https://www.freetogame.com/rocket-league"
  },
  {
    id: 9,
    title: "Genshin Impact",
    thumbnail: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2rpf.jpg",
    short_description: "Genshin Impact é um RPG de ação de mundo aberto onde você explora o mundo de Teyvat e coleta personagens únicos.",
    game_url: "https://genshin.hoyoverse.com/",
    genre: "RPG",
    platform: "PC",
    publisher: "miHoYo",
    developer: "miHoYo",
    release_date: "2020-09-28",
    freetogame_profile_url: "https://www.freetogame.com/genshin-impact"
  }
];

// Configurações pré-definidas para busca popular
export const popularSearchConfigs = [
  {
    name: "FPS Populares",
    description: "Jogos de tiro em primeira pessoa mais jogados",
    filters: {
      platform: "pc" as const,
      category: "shooter" as const,
      sortBy: "popularity" as const
    },
    games: mockGames.filter(game => game.genre === "FPS")
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
    name: "MOBA Clássicos",
    description: "Jogos de estratégia em tempo real",
    filters: {
      platform: "pc" as const,
      category: "strategy" as const,
      sortBy: "popularity" as const
    },
    games: mockGames.filter(game => game.genre === "MOBA")
  },
  {
    name: "RPG Gratuitos",
    description: "RPGs de mundo aberto para explorar",
    filters: {
      platform: "pc" as const,
      category: "mmorpg" as const,
      sortBy: "release-date" as const
    },
    games: mockGames.filter(game => game.genre === "RPG" || game.genre === "MMORPG")
  }
];

// Função para obter jogos baseado nos filtros
export const getMockGamesByFilters = (filters: any): Game[] => {
  let filteredGames = [...mockGames];

  // Filtrar por plataforma
  if (filters.platform) {
    filteredGames = filteredGames.filter(game => 
      game.platform?.toLowerCase() === filters.platform.toLowerCase()
    );
  }

  // Filtrar por categoria/gênero
  if (filters.category) {
    const categoryMap: { [key: string]: string[] } = {
      'shooter': ['FPS'],
      'battle-royale': ['Battle Royale'],
      'strategy': ['MOBA'],
      'mmorpg': ['MMORPG', 'RPG'],
      'sports': ['Sports']
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
