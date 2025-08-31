/**
 * Componente de Breadcrumb para navegação
 */

"use client";
import { useNavigation } from "../hooks/useNavigation";
import { getRouteConfig } from "../config/routes";
import { BreadcrumbItem } from "../types/navigation";

interface BreadcrumbProps {
  className?: string;
  separator?: string;
  showHome?: boolean;
}

export function Breadcrumb({ 
  className = "", 
  separator = "/", 
  showHome = true 
}: BreadcrumbProps) {
  const { currentPath } = useNavigation();

  // Função para gerar breadcrumbs baseado na rota atual
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Adicionar home se necessário
    if (showHome) {
      breadcrumbs.push({
        label: "Início",
        path: "/",
        isActive: currentPath === "/",
      });
    }

    // Construir breadcrumbs baseado nos segmentos da URL
    let currentPathBuilder = "";
    pathSegments.forEach((segment, index) => {
      currentPathBuilder += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Tentar obter configuração da rota
      const routeConfig = getRouteConfig(currentPathBuilder);
      
      breadcrumbs.push({
        label: routeConfig?.label || segment.charAt(0).toUpperCase() + segment.slice(1),
        path: currentPathBuilder,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Não renderizar se só tiver o home e estivermos na home
  if (breadcrumbs.length <= 1 && currentPath === "/") {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-400" aria-hidden="true">
              {separator}
            </span>
          )}
          
          {breadcrumb.isActive ? (
            <span className="text-white font-medium" aria-current="page">
              {breadcrumb.label}
            </span>
          ) : (
            <button
              onClick={() => {
                const { navigate } = useNavigation();
                navigate(breadcrumb.path);
              }}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {breadcrumb.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}
