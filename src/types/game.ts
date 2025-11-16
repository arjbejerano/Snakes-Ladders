export interface Player {
  id: number;
  name: string;
  position: number;
  color: string;
  isActive: boolean;
}

export interface Snake {
  head: number;
  tail: number;
}

export interface Ladder {
  bottom: number;
  top: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  diceValue: number;
  isRolling: boolean;
  gameStatus: 'setup' | 'playing' | 'finished';
  winner: Player | null;
  snakes: Snake[];
  ladders: Ladder[];
  theme: 'classic' | 'cartoon';
  difficulty: 'easy' | 'medium' | 'hard';
  soundEnabled: boolean;
}

export interface BoardTile {
  number: number;
  hasSnake: boolean;
  hasLadder: boolean;
  snakeId?: number;
  ladderId?: number;
  players: Player[];
}

export type GameAction = 
  | { type: 'SET_PLAYERS'; payload: Player[] }
  | { type: 'ROLL_DICE' }
  | { type: 'SET_DICE_VALUE'; payload: number }
  | { type: 'MOVE_PLAYER'; payload: { playerId: number; newPosition: number } }
  | { type: 'NEXT_TURN' }
  | { type: 'SET_WINNER'; payload: Player }
  | { type: 'RESTART_GAME' }
  | { type: 'SET_THEME'; payload: 'classic' | 'cartoon' }
  | { type: 'SET_DIFFICULTY'; payload: 'easy' | 'medium' | 'hard' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_GAME_STATUS'; payload: 'setup' | 'playing' | 'finished' };