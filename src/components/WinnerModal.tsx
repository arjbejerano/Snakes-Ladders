import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Player } from '../types/game';

interface WinnerModalProps {
  winner: Player;
  onRestart: () => void;
  onNewGame: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onRestart, onNewGame }) => {
  useEffect(() => {
    // Play winner sound effect (if sound is enabled)
    // In a real app, you would play an actual sound file here
    console.log('🎉 Winner sound effect!');
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md shadow-2xl animate-bounce">
        <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-t-lg">
          <div className="text-6xl mb-2">🏆</div>
          <CardTitle className="text-2xl font-bold">
            Congratulations!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6 p-6">
          <div className="space-y-3">
            <div
              className="w-16 h-16 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-2xl mx-auto"
              style={{ backgroundColor: winner.color }}
            >
              {winner.id}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {winner.name} Wins!
              </h3>
              <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-800">
                Reached Square 100
              </Badge>
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">🎯 Game Statistics</p>
            <div className="space-y-1">
              <p>Final Position: 100</p>
              <p>Victory achieved! 🎉</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onRestart}
              className="w-full h-12 text-lg font-semibold"
              variant="default"
            >
              🔄 Play Again
            </Button>
            
            <Button
              onClick={onNewGame}
              className="w-full h-12 text-lg font-semibold"
              variant="outline"
            >
              ⚙️ New Game Setup
            </Button>
          </div>

          <div className="text-xs text-gray-500">
            <p>🎮 Thanks for playing Snakes & Ladders!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WinnerModal;