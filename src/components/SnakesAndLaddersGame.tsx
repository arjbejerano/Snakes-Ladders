import React, { useEffect, useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import GameSetup from '../components/GameSetup';
import GameBoard from '../components/GameBoard';
import PlayerInfo from '../components/PlayerInfo';
import GameControls from '../components/GameControls';
import Dice from '../components/Dice';
import WinnerModal from '../components/WinnerModal';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Settings } from 'lucide-react';

const SnakesAndLaddersGame: React.FC = () => {
  const {
    state,
    initializePlayers,
    rollDice,
    movePlayer,
    restartGame,
    setTheme,
    setDifficulty,
    toggleSound,
  } = useGameState();

  const [hasRolled, setHasRolled] = useState(false);

  // Handle dice roll and player movement
  useEffect(() => {
    if (!state.isRolling && state.diceValue && state.gameStatus === 'playing' && hasRolled) {
      const currentPlayer = state.players[state.currentPlayerIndex];
      if (currentPlayer) {
        // Delay movement for better UX
        setTimeout(() => {
          movePlayer(currentPlayer.id, state.diceValue);
          setHasRolled(false); // Reset for next turn
        }, 300);
      }
    }
  }, [state.isRolling, state.diceValue, state.currentPlayerIndex, state.players, state.gameStatus, movePlayer, hasRolled]);

  const handleRollDice = () => {
    setHasRolled(true);
    rollDice();
  };

  const handleStartGame = (playerCount: number) => {
    initializePlayers(playerCount);
  };

  const handleNewGame = () => {
    // Reset to setup phase
    initializePlayers(0);
  };

  const currentPlayer = state.players[state.currentPlayerIndex];
  const canRoll = !state.isRolling && state.gameStatus === 'playing' && !state.winner;

  // Show setup screen
  if (state.gameStatus === 'setup') {
    return (
      <GameSetup
        onStartGame={handleStartGame}
        onSetTheme={setTheme}
        onSetDifficulty={setDifficulty}
        theme={state.theme}
        difficulty={state.difficulty}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Game Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-primary mb-2">
              🐍 Snakes & Ladders 🪜
            </h1>
            <p className="text-gray-600">
              {state.theme === 'cartoon' ? 'Cartoon' : 'Classic'} Theme • {state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1)} Difficulty
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Game Settings</DialogTitle>
              </DialogHeader>
              <GameControls
                onRestart={restartGame}
                onNewGame={handleNewGame}
                onToggleSound={toggleSound}
                soundEnabled={state.soundEnabled}
                theme={state.theme}
                difficulty={state.difficulty}
                gameStatus={state.gameStatus}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          {/* Left Column - Player Info */}
          <div className="w-full lg:w-80">
            <PlayerInfo
              players={state.players}
              currentPlayerIndex={state.currentPlayerIndex}
              diceValue={state.diceValue}
            />
          </div>

          {/* Center Column - Game Board */}
          <div className="flex flex-col items-center space-y-4">
            <GameBoard
              players={state.players}
              snakes={state.snakes}
              ladders={state.ladders}
              theme={state.theme}
            />
          </div>

          {/* Right Column - Dice & Game Status */}
          <div className="w-full lg:w-80 space-y-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {currentPlayer ? `${currentPlayer.name}'s Turn` : 'Game Over'}
                    </h3>
                    {currentPlayer && (
                      <div
                        className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                        style={{ backgroundColor: currentPlayer.color }}
                      >
                        {currentPlayer.id}
                      </div>
                    )}
                  </div>

                  <Dice
                    value={state.diceValue}
                    isRolling={state.isRolling}
                    onRoll={handleRollDice}
                    disabled={!canRoll}
                  />

                  {state.gameStatus === 'playing' && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Roll the dice to move!</p>
                      {currentPlayer && currentPlayer.position > 0 && (
                        <p>Current position: {currentPlayer.position}</p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Game Progress */}
            {state.gameStatus === 'playing' && (
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 text-sm">Game Progress</h4>
                  <div className="space-y-2">
                    {state.players.map(player => (
                      <div key={player.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border border-white"
                            style={{ backgroundColor: player.color }}
                          />
                          <span>{player.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{player.position}/100</div>
                          <div className="w-16 bg-gray-200 rounded-full h-1">
                            <div
                              className="bg-primary h-1 rounded-full transition-all duration-300"
                              style={{ width: `${player.position}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      {state.winner && (
        <WinnerModal
          winner={state.winner}
          onRestart={restartGame}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
};

export default SnakesAndLaddersGame;