"use client";
import { useState } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { getVisibleRoutes } from "../../config/routes";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { navigate, isActiveRoute } = useNavigation();
  const visibleRoutes = getVisibleRoutes();

  const handleRouteClick = (path: string) => {
    navigate(path);
    setOpen(false); // Fechar menu mobile após navegação
  };

  return (
    <nav className="bg-gray-900 text-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleRouteClick("/")}
              className="hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/logo.jpg" 
                alt="GameForU" 
                className="h-8 w-auto"
              />
            </button>
          </div>

          {/* Links desktop */}
          <div className="hidden md:flex space-x-8">
            {visibleRoutes.map((route) => (
              <button
                key={route.path}
                onClick={() => handleRouteClick(route.path)}
                className={`flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200 ${
                  isActiveRoute(route.path) 
                    ? 'text-blue-400' 
                    : ''
                }`}
                title={route.description}
              >
                {route.icon && <span>{route.icon}</span>}
                <span>{route.label}</span>
              </button>
            ))}
          </div>

          {/* Botão mobile */}
          <div className="md:hidden">
            <button 
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden px-4 pb-4 bg-gray-800 rounded-b-lg">
          {visibleRoutes.map((route) => (
            <button
              key={route.path}
              onClick={() => handleRouteClick(route.path)}
              className={`flex items-center space-x-2 w-full text-left py-2 hover:text-gray-300 transition-colors duration-200 ${
                isActiveRoute(route.path) 
                  ? 'text-blue-400' 
                  : ''
              }`}
              title={route.description}
            >
              {route.icon && <span>{route.icon}</span>}
              <span>{route.label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
