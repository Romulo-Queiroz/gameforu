/**
 * Componente de imagem personalizado para jogos com fallback local
 */

"use client";
import { useState } from 'react';

interface GameImageProps {
  src: string;
  alt: string;
  title: string;
  genre?: string;
  className?: string;
}

export function GameImage({ src, alt, title, genre, className = "" }: GameImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Cores baseadas no gênero do jogo
  const genreColors: { [key: string]: string } = {
    'FPS': 'bg-blue-800',
    'Battle Royale': 'bg-red-600',
    'MOBA': 'bg-purple-600',
    'MMORPG': 'bg-green-600',
    'RPG': 'bg-orange-500',
    'Sports': 'bg-teal-600',
  };

  const backgroundColor = genreColors[genre || ''] || 'bg-gray-600';

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Se houve erro no carregamento, mostrar placeholder local
  if (imageError) {
    return (
      <div className={`${className} ${backgroundColor} flex items-center justify-center relative overflow-hidden`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🎮</div>
          <div className="text-white font-bold text-sm leading-tight">
            {title}
          </div>
          {genre && (
            <div className="text-white/70 text-xs mt-1">
              {genre}
            </div>
          )}
        </div>
        {/* Efeito de gradiente para melhor aparência */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20"></div>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      {isLoading && (
        <div className={`absolute inset-0 ${backgroundColor} flex items-center justify-center`}>
          <div className="animate-pulse">
            <div className="text-4xl mb-2">🎮</div>
            <div className="text-white font-bold text-sm">Carregando...</div>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
}
