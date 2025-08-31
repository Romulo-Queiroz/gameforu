/**
 * Tipos TypeScript para navegação e roteamento
 */

import { RouteConfig, RouteGroup } from '../config/routes';

// Tipo para props de componentes de navegação
export interface NavigationProps {
  routes?: RouteConfig[];
  className?: string;
  onRouteChange?: (path: string) => void;
}

// Tipo para item de menu
export interface MenuItem extends RouteConfig {
  isActive?: boolean;
  hasChildren?: boolean;
  children?: MenuItem[];
}

// Tipo para breadcrumb
export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

// Tipo para contexto de navegação
export interface NavigationContextType {
  currentPath: string;
  setCurrentPath: (path: string) => void;
  navigate: (path: string) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
}

// Tipo para histórico de navegação
export interface NavigationHistory {
  path: string;
  timestamp: number;
  title?: string;
}

// Tipo para configuração de navegação
export interface NavigationConfig {
  enableHistory: boolean;
  maxHistorySize: number;
  enableBreadcrumbs: boolean;
  defaultRoute: string;
}

// Tipo para resultado de validação de rota
export interface RouteValidationResult {
  isValid: boolean;
  error?: string;
  redirectTo?: string;
}

// Tipo para middleware de rota
export interface RouteMiddleware {
  name: string;
  execute: (route: RouteConfig) => Promise<RouteValidationResult>;
}

// Tipo para guard de rota
export interface RouteGuard {
  canActivate: (route: RouteConfig) => boolean | Promise<boolean>;
  redirectTo?: string;
}

// Tipo para metadados de rota
export interface RouteMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

// Tipo estendido de rota com metadados
export interface ExtendedRouteConfig extends RouteConfig {
  metadata?: RouteMetadata;
  guards?: RouteGuard[];
  middleware?: RouteMiddleware[];
}

// Tipo para evento de navegação
export interface NavigationEvent {
  type: 'navigate' | 'back' | 'forward' | 'replace';
  from: string;
  to: string;
  timestamp: number;
}

// Tipo para listener de navegação
export type NavigationListener = (event: NavigationEvent) => void;
