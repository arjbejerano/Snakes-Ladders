import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';

interface GameControlsProps {
  onRestart: () => void;
  onNewGame: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
  theme: 'classic' | 'cartoon';
  difficulty: 'easy' | 'medium' | 'hard';
  gameStatus: 'setup' | 'playing' | 'finished';
}

const GameControls: React.FC<GameControlsProps> = ({
  onRestart,
  onNewGame,
  onToggleSound,
  soundEnabled,
  theme,
  difficulty,
  gameStatus,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Game Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Game Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Theme:</span>
            <Badge variant="outline" className="capitalize">
              {theme === 'classic' ? '🎯 Classic' : '🎨 Cartoon'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Difficulty:</span>
            <Badge 
              variant="outline" 
              className={`capitalize ${
                difficulty === 'easy' ? 'text-green-700 border-green-300' :
                difficulty === 'medium' ? 'text-yellow-700 border-yellow-300' :
                'text-red-700 border-red-300'
              }`}
            >
              {difficulty === 'easy' ? '🟢 Easy' : 
               difficulty === 'medium' ? '🟡 Medium' : '🔴 Hard'}
            </Badge>
          </div>
        </div>

        {/* Sound Control */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {soundEnabled ? '🔊' : '🔇'} Sound Effects
            </span>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={onToggleSound}
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {gameStatus === 'playing' && (
            <Button
              onClick={onRestart}
              variant="outline"
              className="w-full"
            >
              🔄 Restart Game
            </Button>
          )}
          
          <Button
            onClick={onNewGame}
            variant="secondary"
            className="w-full"
          >
            ⚙️ New Game Setup
          </Button>
        </div>

        {/* Game Instructions */}
        <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p className="font-semibold mb-2">🎮 How to Play:</p>
          <ul className="space-y-1">
            <li>• Click "Roll Dice" to move</li>
            <li>• Land on ladders to climb up</li>
            <li>• Avoid snake heads (slide down)</li>
            <li>• Reach exactly 100 to win</li>
            <li>• If roll exceeds 100, no move</li>
          </ul>
        </div>

        {/* Quick Stats */}
        {gameStatus === 'playing' && (
          <div className="text-xs text-gray-600 bg-green-50 p-3 rounded-lg">
            <p className="font-semibold mb-2">📊 Quick Stats:</p>
            <div className="grid grid-cols-2 gap-2">
              <div>Snakes: {difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 9}</div>
              <div>Ladders: {difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameControls;