import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface GameSetupProps {
  onStartGame: (playerCount: number) => void;
  onSetTheme: (theme: 'classic' | 'cartoon') => void;
  onSetDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  theme: 'classic' | 'cartoon';
  difficulty: 'easy' | 'medium' | 'hard';
}

const GameSetup: React.FC<GameSetupProps> = ({
  onStartGame,
  onSetTheme,
  onSetDifficulty,
  theme,
  difficulty,
}) => {
  const [playerCount, setPlayerCount] = useState<number>(2);

  const handleStartGame = () => {
    onStartGame(playerCount);
  };

  const difficultyInfo = {
    easy: { snakes: 5, ladders: 6, description: 'Fewer obstacles, more fun!' },
    medium: { snakes: 7, ladders: 8, description: 'Balanced challenge' },
    hard: { snakes: 9, ladders: 10, description: 'Maximum chaos!' },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary mb-2">
            🐍 Snakes & Ladders 🪜
          </CardTitle>
          <p className="text-gray-600">Configure your game and start playing!</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Player Count Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">
              Number of Players
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(count => (
                <Button
                  key={count}
                  variant={playerCount === count ? 'default' : 'outline'}
                  className="h-12 text-lg font-bold"
                  onClick={() => setPlayerCount(count)}
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">
              Theme
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={theme === 'classic' ? 'default' : 'outline'}
                className="h-12"
                onClick={() => onSetTheme('classic')}
              >
                🎯 Classic
              </Button>
              <Button
                variant={theme === 'cartoon' ? 'default' : 'outline'}
                className="h-12"
                onClick={() => onSetTheme('cartoon')}
              >
                🎨 Cartoon
              </Button>
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">
              Difficulty
            </label>
            <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => onSetDifficulty(value)}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">
                  <div className="flex items-center justify-between w-full">
                    <span>🟢 Easy</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center justify-between w-full">
                    <span>🟡 Medium</span>
                  </div>
                </SelectItem>
                <SelectItem value="hard">
                  <div className="flex items-center justify-between w-full">
                    <span>🔴 Hard</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {difficultyInfo[difficulty].snakes} Snakes
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {difficultyInfo[difficulty].ladders} Ladders
                </Badge>
              </div>
              <p className="text-xs text-gray-600">
                {difficultyInfo[difficulty].description}
              </p>
            </div>
          </div>

          {/* Start Game Button */}
          <Button
            onClick={handleStartGame}
            className="w-full h-14 text-lg font-bold"
            size="lg"
          >
            🎮 Start Game
          </Button>

          {/* Game Rules */}
          <div className="text-xs text-gray-500 space-y-1">
            <p className="font-semibold">Quick Rules:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Roll dice to move forward</li>
              <li>Climb ladders to go up</li>
              <li>Slide down snakes</li>
              <li>First to reach 100 wins!</li>
              <li>Must roll exact number to win</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameSetup;