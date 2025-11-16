import { Snake, Ladder } from '../types/game';

// Default snake positions (head -> tail)
export const DEFAULT_SNAKES: Snake[] = [
  { head: 99, tail: 54 },
  { head: 95, tail: 72 },
  { head: 88, tail: 36 },
  { head: 62, tail: 18 },
  { head: 48, tail: 26 },
  { head: 36, tail: 6 },
  { head: 32, tail: 10 },
];

// Default ladder positions (bottom -> top)
export const DEFAULT_LADDERS: Ladder[] = [
  { bottom: 4, top: 14 },
  { bottom: 9, top: 31 },
  { bottom: 20, top: 38 },
  { bottom: 28, top: 84 },
  { bottom: 40, top: 59 },
  { bottom: 51, top: 67 },
  { bottom: 63, top: 81 },
  { bottom: 71, top: 91 },
];

// Generate random snakes and ladders for different difficulty levels
export const generateRandomSnakesAndLadders = (difficulty: 'easy' | 'medium' | 'hard') => {
  const snakeCount = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 7 : 9;
  const ladderCount = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 8 : 10;
  
  const snakes: Snake[] = [];
  const ladders: Ladder[] = [];
  const usedPositions = new Set<number>();
  
  // Generate snakes
  for (let i = 0; i < snakeCount; i++) {
    let head, tail;
    do {
      head = Math.floor(Math.random() * 80) + 20; // Snake heads between 20-99
      tail = Math.floor(Math.random() * (head - 10)) + 1; // Tail at least 10 positions below head
    } while (usedPositions.has(head) || usedPositions.has(tail) || head === 100);
    
    snakes.push({ head, tail });
    usedPositions.add(head);
    usedPositions.add(tail);
  }
  
  // Generate ladders
  for (let i = 0; i < ladderCount; i++) {
    let bottom, top;
    do {
      bottom = Math.floor(Math.random() * 80) + 1; // Ladder bottoms between 1-80
      top = Math.floor(Math.random() * (99 - bottom - 10)) + bottom + 10; // Top at least 10 positions above bottom
    } while (usedPositions.has(bottom) || usedPositions.has(top) || top === 100);
    
    ladders.push({ bottom, top });
    usedPositions.add(bottom);
    usedPositions.add(top);
  }
  
  return { snakes, ladders };
};

// Player colors
export const PLAYER_COLORS = [
  'hsl(var(--player-1))', // Blue
  'hsl(var(--player-2))', // Red
  'hsl(var(--player-3))', // Green
  'hsl(var(--player-4))', // Purple
];

// Sound effects (placeholder URLs - in a real app, these would be actual audio files)
export const SOUND_EFFECTS = {
  diceRoll: '/sounds/dice-roll.mp3',
  move: '/sounds/move.mp3',
  snake: '/sounds/snake.mp3',
  ladder: '/sounds/ladder.mp3',
  win: '/sounds/win.mp3',
  backgroundMusic: '/sounds/background.mp3',
};

// Utility function to get tile position on board (row, col)
export const getTilePosition = (tileNumber: number): { row: number; col: number } => {
  const row = Math.floor((tileNumber - 1) / 10);
  const col = (row % 2 === 0) ? (tileNumber - 1) % 10 : 9 - ((tileNumber - 1) % 10);
  return { row: 9 - row, col }; // Flip row to start from bottom
};

// Utility function to check if a position has a snake or ladder
export const getSpecialTile = (position: number, snakes: Snake[], ladders: Ladder[]) => {
  const snake = snakes.find(s => s.head === position);
  const ladder = ladders.find(l => l.bottom === position);
  
  return {
    hasSnake: !!snake,
    hasLadder: !!ladder,
    snake,
    ladder,
  };
};