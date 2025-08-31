/**
 * Utilitários para manipulação de rotas
 */

import { RouteConfig, getRouteConfig, ROUTES } from '../config/routes';
import { RouteValidationResult } from '../types/navigation';

/**
 * Valida se uma rota é válida e acessível
 */
export const validateRoute = (path: string): RouteValidationResult => {
  const routeConfig = getRouteConfig(path);
  
  if (!routeConfig) {
    return {
      isValid: false,
      error: `Rota não encontrada: ${path}`,
    };
  }

  // Verificar se a rota está protegida (exemplo de validação futura)
  if (routeConfig.isProtected) {
    // Aqui você pode adicionar lógica de autenticação
    return {
      isValid: false,
      error: 'Rota protegida - autenticação necessária',
      redirectTo: '/login', // Exemplo de redirecionamento
    };
  }

  return {
    isValid: true,
  };
};

/**
 * Gera uma URL completa com parâmetros de query
 */
export const buildRouteUrl = (path: string, params?: Record<string, string>): string => {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }

  const searchParams = new URLSearchParams(params);
  return `${path}?${searchParams.toString()}`;
};

/**
 * Extrai parâmetros de query de uma URL
 */
export const extractQueryParams = (url: string): Record<string, string> => {
  try {
    const urlObj = new URL(url, window.location.origin);
    const params: Record<string, string> = {};
    
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  } catch {
    return {};
  }
};

/**
 * Verifica se uma rota está ativa baseado no pathname atual
 */
export const isRouteActive = (currentPath: string, targetPath: string): boolean => {
  if (currentPath === targetPath) {
    return true;
  }

  // Verificar se é uma subrota (ex: /games/category ativo quando em /games)
  if (targetPath !== '/' && currentPath.startsWith(targetPath + '/')) {
    return true;
  }

  return false;
};

/**
 * Gera metadados para uma rota específica
 */
export const generateRouteMetadata = (path: string) => {
  const routeConfig = getRouteConfig(path);
  
  if (!routeConfig) {
    return {
      title: 'Página não encontrada',
      description: 'A página solicitada não foi encontrada.',
    };
  }

  return {
    title: routeConfig.label,
    description: routeConfig.description || `Página ${routeConfig.label}`,
    keywords: [routeConfig.label, 'games', 'jogos'],
  };
};

/**
 * Converte uma rota para um formato amigável para SEO
 */
export const routeToSlug = (path: string): string => {
  return path
    .replace(/^\//, '') // Remove barra inicial
    .replace(/\//g, '-') // Substitui barras por hífens
    .toLowerCase();
};

/**
 * Converte um slug de volta para uma rota
 */
export const slugToRoute = (slug: string): string => {
  return '/' + slug
    .replace(/-/g, '/') // Substitui hífens por barras
    .toLowerCase();
};

/**
 * Gera um sitemap básico baseado nas rotas configuradas
 */
export const generateSitemap = (baseUrl: string) => {
  const routes = Object.values(ROUTES);
  
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1.0 : 0.8,
  }));
};

/**
 * Utilitário para debug de rotas
 */
export const debugRoutes = () => {
  console.group('🔍 Debug de Rotas');
  console.log('Rotas disponíveis:', Object.entries(ROUTES));
  console.log('Rota atual:', window.location.pathname);
  console.log('Query params:', extractQueryParams(window.location.href));
  console.groupEnd();
};
