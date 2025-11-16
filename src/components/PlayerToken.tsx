import React from 'react';
import { Player } from '../types/game';

interface PlayerTokenProps {
  player: Player;
  position: { x: number; y: number };
  isAnimating?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const PlayerToken: React.FC<PlayerTokenProps> = ({ 
  player, 
  position, 
  isAnimating = false,
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6 text-xs',
    medium: 'w-8 h-8 text-sm',
    large: 'w-10 h-10 text-base',
  };

  return (
    <div
      className={`absolute ${sizeClasses[size]} rounded-full border-2 border-white shadow-lg flex items-center justify-center font-bold text-white transition-all duration-500 z-10 ${
        isAnimating ? 'animate-bounce' : ''
      } ${player.isActive ? 'animate-pulse' : ''}`}
      style={{
        backgroundColor: player.color,
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {player.id}
    </div>
  );
};

export default PlayerToken;