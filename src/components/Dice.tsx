import React from 'react';
import { Button } from './ui/button';

interface DiceProps {
  value: number;
  isRolling: boolean;
  onRoll: () => void;
  disabled?: boolean;
}

const Dice: React.FC<DiceProps> = ({ value, isRolling, onRoll, disabled = false }) => {
  const getDiceDots = (num: number) => {
    // Show question mark for initial state (value 0)
    if (num === 0) return [];
    
    const dotPositions = {
      1: ['center'],
      2: ['top-left', 'bottom-right'],
      3: ['top-left', 'center', 'bottom-right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
      6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
    };
    
    return dotPositions[num as keyof typeof dotPositions] || [];
  };

  const renderDot = (position: string) => {
    const dotClasses = {
      'top-left': 'top-2 left-2',
      'top-right': 'top-2 right-2',
      'middle-left': 'top-1/2 left-2 -translate-y-1/2',
      'middle-right': 'top-1/2 right-2 -translate-y-1/2',
      'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      'bottom-left': 'bottom-2 left-2',
      'bottom-right': 'bottom-2 right-2',
    };

    return (
      <div
        key={position}
        className={`absolute w-3 h-3 bg-[hsl(var(--dice-dot))] rounded-full ${
          dotClasses[position as keyof typeof dotClasses]
        }`}
      />
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`relative w-20 h-20 bg-[hsl(var(--dice-bg))] border-2 border-gray-400 rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ${
          isRolling ? 'animate-dice-roll' : 'hover:scale-105'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={!disabled ? onRoll : undefined}
      >
        {value === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-400">
            ?
          </div>
        ) : (
          getDiceDots(value).map(renderDot)
        )}
      </div>
      
      <Button
        onClick={onRoll}
        disabled={disabled || isRolling}
        className="px-6 py-2 font-semibold"
        variant="default"
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </Button>
    </div>
  );
};

export default Dice;