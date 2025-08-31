/**
 * Configuração centralizada de rotas da aplicação
 * Este arquivo define todas as rotas disponíveis no sistema
 */

export interface RouteConfig {
  path: string;
  label: string;
  icon?: string;
  description?: string;
  isProtected?: boolean;
  isVisible?: boolean;
}

export interface RouteGroup {
  title: string;
  routes: RouteConfig[];
}

// Configuração das rotas principais
export const MAIN_ROUTES: RouteConfig[] = [
  {
    path: "/",
    label: "start",
    icon: "🏠",
    description: "Página inicial da aplicação",
    isVisible: true,
  },
  {
    path: "/recommended-games",
    label: "Search your game",
    icon: "🔍",
    description: "Busque e encontre jogos para você",
    isVisible: true,
  },
];

// Configuração de rotas por grupos (para futuras expansões)
export const ROUTE_GROUPS: RouteGroup[] = [
  {
    title: "Navegação Principal",
    routes: MAIN_ROUTES,
  },
  // Exemplo de grupo futuro para jogos
  {
    title: "Jogos",
    routes: [
      {
        path: "/games",
        label: "Todos os Jogos",
        icon: "🎯",
        description: "Explore todos os jogos disponíveis",
        isVisible: false, // Não visível ainda
      },
      {
        path: "/games/categories",
        label: "Categorias",
        icon: "📂",
        description: "Jogos por categoria",
        isVisible: false,
      },
    ],
  },
  // Exemplo de grupo futuro para usuário
  {
    title: "Usuário",
    routes: [
      {
        path: "/profile",
        label: "Perfil",
        icon: "👤",
        description: "Seu perfil de usuário",
        isProtected: true,
        isVisible: false,
      },
      {
        path: "/favorites",
        label: "Favoritos",
        icon: "❤️",
        description: "Seus jogos favoritos",
        isProtected: true,
        isVisible: false,
      },
    ],
  },
];

// Função utilitária para obter todas as rotas visíveis
export const getVisibleRoutes = (): RouteConfig[] => {
  return ROUTE_GROUPS
    .flatMap(group => group.routes)
    .filter(route => route.isVisible !== false);
};

// Função para obter rotas por grupo
export const getRoutesByGroup = (groupTitle: string): RouteConfig[] => {
  const group = ROUTE_GROUPS.find(g => g.title === groupTitle);
  return group ? group.routes : [];
};

// Função para verificar se uma rota existe
export const isRouteValid = (path: string): boolean => {
  return ROUTE_GROUPS
    .flatMap(group => group.routes)
    .some(route => route.path === path);
};

// Função para obter configuração de uma rota específica
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return ROUTE_GROUPS
    .flatMap(group => group.routes)
    .find(route => route.path === path);
};

// Constantes para rotas específicas (para evitar strings hardcoded)
export const ROUTES = {
  HOME: "/",
  RECOMMENDED_GAMES: "/recommended-games",
  GAMES: "/games",
  GAMES_CATEGORIES: "/games/categories",
  PROFILE: "/profile",
  FAVORITES: "/favorites",
} as const;

// Tipo para as chaves das rotas
export type RouteKey = keyof typeof ROUTES;
