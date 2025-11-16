import { useReducer, useCallback } from 'react';
import { GameState, GameAction, Player } from '../types/game';
import { DEFAULT_SNAKES, DEFAULT_LADDERS, PLAYER_COLORS, generateRandomSnakesAndLadders } from '../utils/gameData';

const initialState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  diceValue: 0,
  isRolling: false,
  gameStatus: 'setup',
  winner: null,
  snakes: DEFAULT_SNAKES,
  ladders: DEFAULT_LADDERS,
  theme: 'classic',
  difficulty: 'medium',
  soundEnabled: true,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_PLAYERS':
      return {
        ...state,
        players: action.payload,
        gameStatus: action.payload.length > 0 ? 'playing' : 'setup',
      };
    
    case 'ROLL_DICE':
      return {
        ...state,
        isRolling: true,
      };
    
    case 'SET_DICE_VALUE':
      return {
        ...state,
        diceValue: action.payload,
        isRolling: false,
      };
    
    case 'MOVE_PLAYER':
      const updatedPlayers = state.players.map(player =>
        player.id === action.payload.playerId
          ? { ...player, position: action.payload.newPosition }
          : player
      );
      
      const movedPlayer = updatedPlayers.find(p => p.id === action.payload.playerId);
      const hasWinner = movedPlayer && movedPlayer.position === 100;
      
      return {
        ...state,
        players: updatedPlayers,
        winner: hasWinner ? movedPlayer : state.winner,
        gameStatus: hasWinner ? 'finished' : state.gameStatus,
      };
    
    case 'NEXT_TURN':
      return {
        ...state,
        currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
      };
    
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload,
        gameStatus: 'finished',
      };
    
    case 'RESTART_GAME':
      const { snakes, ladders } = state.difficulty !== 'easy' 
        ? generateRandomSnakesAndLadders(state.difficulty)
        : { snakes: DEFAULT_SNAKES, ladders: DEFAULT_LADDERS };
      
      return {
        ...state,
        players: state.players.map(player => ({ ...player, position: 0 })),
        currentPlayerIndex: 0,
        diceValue: 1,
        isRolling: false,
        gameStatus: 'playing',
        winner: null,
        snakes,
        ladders,
      };
    
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    
    case 'SET_DIFFICULTY':
      const newSnakesAndLadders = generateRandomSnakesAndLadders(action.payload);
      return {
        ...state,
        difficulty: action.payload,
        snakes: newSnakesAndLadders.snakes,
        ladders: newSnakesAndLadders.ladders,
      };
    
    case 'TOGGLE_SOUND':
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
      };
    
    case 'SET_GAME_STATUS':
      return {
        ...state,
        gameStatus: action.payload,
      };
    
    default:
      return state;
  }
};

export const useGameState = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initializePlayers = useCallback((playerCount: number) => {
    const players: Player[] = Array.from({ length: playerCount }, (_, index) => ({
      id: index + 1,
      name: `Player ${index + 1}`,
      position: 0,
      color: PLAYER_COLORS[index],
      isActive: index === 0,
    }));
    
    dispatch({ type: 'SET_PLAYERS', payload: players });
  }, []);

  const rollDice = useCallback(() => {
    if (state.isRolling || state.gameStatus !== 'playing') return;
    
    dispatch({ type: 'ROLL_DICE' });
    
    // Simulate dice roll animation
    setTimeout(() => {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      dispatch({ type: 'SET_DICE_VALUE', payload: diceValue });
    }, 500);
  }, [state.isRolling, state.gameStatus]);

  const movePlayer = useCallback((playerId: number, steps: number) => {
    const player = state.players.find(p => p.id === playerId);
    if (!player) return;

    let newPosition = player.position + steps;
    
    // Can't go beyond 100, must land exactly on 100 to win
    if (newPosition > 100) {
      return; // Don't move if it would exceed 100
    }

    // Check for snakes and ladders
    const snake = state.snakes.find(s => s.head === newPosition);
    const ladder = state.ladders.find(l => l.bottom === newPosition);

    if (snake) {
      newPosition = snake.tail;
    } else if (ladder) {
      newPosition = ladder.top;
    }

    dispatch({ type: 'MOVE_PLAYER', payload: { playerId, newPosition } });
    
    // Move to next turn if not winner
    if (newPosition !== 100) {
      setTimeout(() => {
        dispatch({ type: 'NEXT_TURN' });
      }, 1000);
    }
  }, [state.players, state.snakes, state.ladders]);

  const restartGame = useCallback(() => {
    dispatch({ type: 'RESTART_GAME' });
  }, []);

  const setTheme = useCallback((theme: 'classic' | 'cartoon') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  }, []);

  const setDifficulty = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  }, []);

  const toggleSound = useCallback(() => {
    dispatch({ type: 'TOGGLE_SOUND' });
  }, []);

  return {
    state,
    initializePlayers,
    rollDice,
    movePlayer,
    restartGame,
    setTheme,
    setDifficulty,
    toggleSound,
  };
};