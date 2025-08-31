/**
 * Hook personalizado para navegação
 */

import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getVisibleRoutes, getRouteConfig, ROUTES } from '../config/routes';
import { NavigationEvent, NavigationListener } from '../types/navigation';

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Listener para eventos de navegação
  const [listeners, setListeners] = useState<NavigationListener[]>([]);

  // Função para emitir eventos de navegação
  const emitNavigationEvent = useCallback((event: Omit<NavigationEvent, 'timestamp'>) => {
    const navigationEvent: NavigationEvent = {
      ...event,
      timestamp: Date.now(),
    };

    listeners.forEach(listener => listener(navigationEvent));
  }, [listeners]);

  // Função para navegar para uma rota
  const navigate = useCallback((path: string) => {
    const routeConfig = getRouteConfig(path);
    
    if (!routeConfig) {
      console.warn(`Rota não encontrada: ${path}`);
      return;
    }

    const from = pathname;
    const to = path;

    // Adicionar ao histórico se não for a mesma rota
    if (from !== to) {
      setHistory(prev => {
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push(to);
        return newHistory;
      });
      setCurrentIndex(prev => prev + 1);
    }

    // Emitir evento de navegação
    emitNavigationEvent({
      type: 'navigate',
      from,
      to,
    });

    // Navegar usando Next.js router
    router.push(path);
  }, [pathname, currentIndex, router, emitNavigationEvent]);

  // Função para voltar
  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const to = history[newIndex];
      
      setCurrentIndex(newIndex);
      
      emitNavigationEvent({
        type: 'back',
        from: pathname,
        to,
      });

      router.back();
    }
  }, [currentIndex, history, pathname, router, emitNavigationEvent]);

  // Função para avançar
  const goForward = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      const to = history[newIndex];
      
      setCurrentIndex(newIndex);
      
      emitNavigationEvent({
        type: 'forward',
        from: pathname,
        to,
      });

      router.forward();
    }
  }, [currentIndex, history.length, pathname, router, emitNavigationEvent]);

  // Função para substituir a rota atual
  const replace = useCallback((path: string) => {
    const from = pathname;
    const to = path;

    emitNavigationEvent({
      type: 'replace',
      from,
      to,
    });

    router.replace(path);
  }, [pathname, router, emitNavigationEvent]);

  // Função para adicionar listener
  const addListener = useCallback((listener: NavigationListener) => {
    setListeners(prev => [...prev, listener]);
    
    // Retornar função para remover o listener
    return () => {
      setListeners(prev => prev.filter(l => l !== listener));
    };
  }, []);

  // Função para verificar se pode voltar
  const canGoBack = currentIndex > 0;

  // Função para verificar se pode avançar
  const canGoForward = currentIndex < history.length - 1;

  // Função para obter rotas visíveis
  const getVisibleRoutesList = useCallback(() => {
    return getVisibleRoutes();
  }, []);

  // Função para verificar se uma rota está ativa
  const isActiveRoute = useCallback((path: string) => {
    return pathname === path;
  }, [pathname]);

  // Inicializar histórico com a rota atual
  useEffect(() => {
    if (history.length === 0) {
      setHistory([pathname]);
    }
  }, [pathname, history.length]);

  return {
    // Estado
    currentPath: pathname,
    canGoBack,
    canGoForward,
    history,
    
    // Ações
    navigate,
    goBack,
    goForward,
    replace,
    
    // Utilitários
    getVisibleRoutes: getVisibleRoutesList,
    isActiveRoute,
    addListener,
    
    // Constantes
    ROUTES,
  };
};
