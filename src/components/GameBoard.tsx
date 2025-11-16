import React, { useMemo } from 'react';
import { Player, Snake, Ladder } from '../types/game';
import { getTilePosition } from '../utils/gameData';
import PlayerToken from './PlayerToken';
import { SnakeComponent, LadderComponent } from './SnakesAndLadders';

interface GameBoardProps {
  players: Player[];
  snakes: Snake[];
  ladders: Ladder[];
  theme: 'classic' | 'cartoon';
}

const GameBoard: React.FC<GameBoardProps> = ({ players, snakes, ladders, theme }) => {
  const BOARD_SIZE = 500;
  const TILE_SIZE = BOARD_SIZE / 10;

  // Generate board tiles (1-100)
  const tiles = useMemo(() => {
    const tileArray = [];
    for (let i = 1; i <= 100; i++) {
      const { row, col } = getTilePosition(i);
      tileArray.push({
        number: i,
        row,
        col,
        x: col * TILE_SIZE,
        y: row * TILE_SIZE,
      });
    }
    return tileArray;
  }, [TILE_SIZE]);

  // Function to get tile center coordinates
  const getTileCenter = (tileNumber: number) => {
    const tile = tiles.find(t => t.number === tileNumber);
    if (!tile) return { x: 0, y: 0 };
    return {
      x: tile.x + TILE_SIZE / 2,
      y: tile.y + TILE_SIZE / 2,
    };
  };

  // Get player positions with offsets for multiple players on same tile
  const getPlayerPositions = () => {
    const positions: { [key: number]: { x: number; y: number } } = {};
    const tilePlayerCounts: { [key: number]: number } = {};

    players.forEach(player => {
      if (player.position === 0) {
        // Players start off the board
        positions[player.id] = { x: -30, y: BOARD_SIZE + 20 };
        return;
      }

      const tileCenter = getTileCenter(player.position);
      const playersOnTile = players.filter(p => p.position === player.position).length;
      const playerIndex = players.filter(p => p.position === player.position && p.id <= player.id).length - 1;

      // Offset players if multiple on same tile
      let offsetX = 0;
      let offsetY = 0;

      if (playersOnTile > 1) {
        const angle = (playerIndex * 2 * Math.PI) / playersOnTile;
        offsetX = Math.cos(angle) * 12;
        offsetY = Math.sin(angle) * 12;
      }

      positions[player.id] = {
        x: tileCenter.x + offsetX,
        y: tileCenter.y + offsetY,
      };
    });

    return positions;
  };

  const playerPositions = getPlayerPositions();

  return (
    <div className="relative">
      <div 
        className="relative bg-[hsl(var(--game-board))] border-4 border-[hsl(var(--game-tile-border))] rounded-lg shadow-2xl"
        style={{ width: BOARD_SIZE, height: BOARD_SIZE }}
      >
        {/* Board tiles */}
        {tiles.map(tile => (
          <div
            key={tile.number}
            className={`absolute border border-[hsl(var(--game-tile-border))] flex items-center justify-center font-bold text-sm ${
              tile.number === 100 
                ? 'bg-yellow-200 text-yellow-800' 
                : tile.number === 1 
                ? 'bg-green-200 text-green-800'
                : 'bg-[hsl(var(--game-tile))] text-gray-700'
            } ${theme === 'cartoon' ? 'rounded-md' : ''}`}
            style={{
              left: tile.x,
              top: tile.y,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
          >
            {tile.number}
          </div>
        ))}

        {/* SVG overlay for snakes and ladders */}
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={BOARD_SIZE}
          height={BOARD_SIZE}
        >
          {/* Render ladders first (behind snakes) */}
          {ladders.map((ladder, index) => (
            <LadderComponent
              key={`ladder-${index}`}
              ladder={ladder}
              getTileCenter={getTileCenter}
              theme={theme}
            />
          ))}
          
          {/* Render snakes */}
          {snakes.map((snake, index) => (
            <SnakeComponent
              key={`snake-${index}`}
              snake={snake}
              getTileCenter={getTileCenter}
              theme={theme}
            />
          ))}
        </svg>

        {/* Player tokens */}
        {players.map(player => (
          <PlayerToken
            key={player.id}
            player={player}
            position={playerPositions[player.id]}
            isAnimating={false}
          />
        ))}
      </div>

      {/* Board legend */}
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 border border-green-300 rounded"></div>
            <span>Start (1)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded"></div>
            <span>Finish (100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-[hsl(var(--snake-head))] rounded"></div>
            <span>Snake Head</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-[hsl(var(--ladder-color))] rounded"></div>
            <span>Ladder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;