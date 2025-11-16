import React from 'react';
import { Player } from '../types/game';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface PlayerInfoProps {
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ players, currentPlayerIndex, diceValue }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Players</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                index === currentPlayerIndex
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: player.color }}
                >
                  {player.id}
                </div>
                <div>
                  <div className="font-semibold text-sm">{player.name}</div>
                  <div className="text-xs text-gray-500">Position: {player.position}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {index === currentPlayerIndex && (
                  <Badge variant="default" className="text-xs">
                    Current Turn
                  </Badge>
                )}
                {player.position === 100 && (
                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                    Winner!
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {players.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-medium text-blue-800">
              Current Turn: {players[currentPlayerIndex]?.name}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Last Roll: {diceValue}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerInfo;