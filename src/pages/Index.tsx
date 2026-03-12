import { useState, useEffect, useCallback, useRef } from 'react';
import { Difficulty, GameState, LEVEL_CONFIGS, ScoreCard } from '@/game/types';
import { createMaze } from '@/game/mazeGenerator';
import { getEnemyNextMove } from '@/game/enemyAI';
import { calculateScore, saveScoreCard, saveToLeaderboard, getLeaderboard } from '@/game/scoring';
import WelcomeScreen from '@/components/game/WelcomeScreen';
import NameInput from '@/components/game/NameInput';
import MainMenu from '@/components/game/MainMenu';
import GameHUD from '@/components/game/GameHUD';
import MazeRenderer from '@/components/game/MazeRenderer';
import ScoreCardDisplay from '@/components/game/ScoreCardDisplay';
import Leaderboard from '@/components/game/Leaderboard';
import VictoryScreen from '@/components/game/VictoryScreen';

type Screen = 'welcome' | 'name' | 'menu' | 'playing' | 'scorecard' | 'leaderboard' | 'victory' | 'gameover';

const LEVEL_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'boss'];

const Index = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Difficulty>('easy');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastScoreCard, setLastScoreCard] = useState<ScoreCard | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const enemyTimerRef = useRef<number | null>(null);
  const timeTimerRef = useRef<number | null>(null);

  const startLevel = useCallback((difficulty: Difficulty) => {
    const config = LEVEL_CONFIGS[difficulty];
    const { maze, playerStart, exitPos, enemyPositions } = createMaze(difficulty, config);
    
    setCurrentLevel(difficulty);
    setElapsedTime(0);
    setGameState({
      playerName,
      level: difficulty,
      lives: gameState?.lives ?? 3,
      movesRemaining: config.moveLimit,
      coinsCollected: 0,
      totalPoints: 0,
      playerPos: playerStart,
      enemyPositions,
      exitPos,
      maze,
      startTime: Date.now(),
      gameStatus: 'playing',
      wallHits: 0,
    });
    setScreen('playing');
  }, [playerName, gameState?.lives]);

  // Timer
   
  useEffect(() => {
    if (screen === 'playing' && gameState?.gameStatus === 'playing') {
      timeTimerRef.current = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => { if (timeTimerRef.current) clearInterval(timeTimerRef.current); };
  }, [screen, gameState?.gameStatus]);

  // Enemy movement
   
  useEffect(() => {
    if (screen !== 'playing' || !gameState || gameState.gameStatus !== 'playing') return;
    const config = LEVEL_CONFIGS[currentLevel];

    enemyTimerRef.current = window.setInterval(() => {
      setGameState(prev => {
        if (!prev || prev.gameStatus !== 'playing') return prev;
        const newEnemies = prev.enemyPositions.map(ep =>
          getEnemyNextMove(ep, prev.playerPos, prev.maze)
        );
        // Check collision
        const caught = newEnemies.some(e => e.row === prev.playerPos.row && e.col === prev.playerPos.col);
        if (caught) {
          const newLives = prev.lives - 1;
          if (newLives <= 0) {
            return { ...prev, lives: 0, gameStatus: 'lost' as const, enemyPositions: newEnemies };
          }
          // Restart level with fewer lives
          const { maze, playerStart, exitPos, enemyPositions } = createMaze(currentLevel, config);
          return {
            ...prev,
            lives: newLives,
            maze,
            playerPos: playerStart,
            exitPos,
            enemyPositions,
            movesRemaining: config.moveLimit,
            coinsCollected: 0,
            wallHits: 0,
          };
        }
        return { ...prev, enemyPositions: newEnemies };
      });
    }, config.enemySpeed);

    return () => { if (enemyTimerRef.current) clearInterval(enemyTimerRef.current); };
  }, [screen, currentLevel, gameState?.gameStatus]);

  // Keyboard controls
  useEffect(() => {
     
    if (screen !== 'playing' || !gameState || gameState.gameStatus !== 'playing') return;

    const handleKey = (e: KeyboardEvent) => {
      let dr = 0, dc = 0;
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': dr = -1; break;
        case 'ArrowDown': case 's': case 'S': dr = 1; break;
        case 'ArrowLeft': case 'a': case 'A': dc = -1; break;
        case 'ArrowRight': case 'd': case 'D': dc = 1; break;
        default: return;
      }
      e.preventDefault();

      setGameState(prev => {
        if (!prev || prev.gameStatus !== 'playing') return prev;
        const nr = prev.playerPos.row + dr;
        const nc = prev.playerPos.col + dc;
        const config = LEVEL_CONFIGS[currentLevel];

        // Bounds check
        if (nr < 0 || nr >= prev.maze.length || nc < 0 || nc >= prev.maze[0].length) return prev;

        // Wall hit
        if (prev.maze[nr][nc].type === 'wall') {
          return { ...prev, wallHits: prev.wallHits + 1, movesRemaining: prev.movesRemaining - 1 };
        }

        const newMaze = prev.maze.map(row => row.map(cell => ({ ...cell })));
        let coins = prev.coinsCollected;

        if (newMaze[nr][nc].type === 'coin') {
          coins++;
          newMaze[nr][nc] = { type: 'path' };
        }

        const movesLeft = prev.movesRemaining - 1;

        // Check exit
        if (newMaze[nr][nc].type === 'exit') {
          return { ...prev, playerPos: { row: nr, col: nc }, maze: newMaze, coinsCollected: coins, movesRemaining: movesLeft, gameStatus: 'won' as const };
        }

        // Check enemy collision
        const caught = prev.enemyPositions.some(e => e.row === nr && e.col === nc);
        if (caught) {
          const newLives = prev.lives - 1;
          if (newLives <= 0) {
            return { ...prev, lives: 0, gameStatus: 'lost' as const };
          }
          const { maze, playerStart, exitPos, enemyPositions } = createMaze(currentLevel, config);
          return { ...prev, lives: newLives, maze, playerPos: playerStart, exitPos, enemyPositions, movesRemaining: config.moveLimit, coinsCollected: 0, wallHits: 0 };
        }

        // Out of moves
        if (movesLeft <= 0) {
          const newLives = prev.lives - 1;
          if (newLives <= 0) {
            return { ...prev, lives: 0, gameStatus: 'lost' as const };
          }
          const { maze, playerStart, exitPos, enemyPositions } = createMaze(currentLevel, config);
          return { ...prev, lives: newLives, maze, playerPos: playerStart, exitPos, enemyPositions, movesRemaining: config.moveLimit, coinsCollected: 0, wallHits: 0 };
        }

        return { ...prev, playerPos: { row: nr, col: nc }, maze: newMaze, coinsCollected: coins, movesRemaining: movesLeft };
      });
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [screen, currentLevel, gameState?.gameStatus]);

  // Handle win/loss
  useEffect(() => {
     
    if (!gameState) return;

    if (gameState.gameStatus === 'won') {
      const config = LEVEL_CONFIGS[currentLevel];
      const timeTaken = elapsedTime;
      const points = calculateScore(gameState.coinsCollected, config.coinPoints, gameState.wallHits, timeTaken, currentLevel);

      const card: ScoreCard = {
        playerName,
        level: currentLevel,
        coinsCollected: gameState.coinsCollected,
        movesUsed: config.moveLimit - gameState.movesRemaining,
        timeTaken,
        pointsEarned: points,
        timestamp: new Date().toLocaleString(),
      };
      saveScoreCard(card);
      saveToLeaderboard({ playerName, totalPoints: points, levelsCompleted: [currentLevel], timestamp: new Date().toISOString() });
      setLastScoreCard(card);
      setTotalScore(prev => prev + points);
      setTotalCoins(prev => prev + gameState.coinsCollected);
      setTotalTime(prev => prev + timeTaken);

      const isLastLevel = currentLevel === 'boss';
      if (isLastLevel) {
        setScreen('victory');
      } else {
        setScreen('scorecard');
      }
    }

    if (gameState.gameStatus === 'lost') {
      setScreen('gameover');
    }
  }, [gameState?.gameStatus]);

  const nextLevel = () => {
    const idx = LEVEL_ORDER.indexOf(currentLevel);
    if (idx < LEVEL_ORDER.length - 1) {
      startLevel(LEVEL_ORDER[idx + 1]);
    }
  };

  const goToMenu = () => {
    setGameState(null);
    setTotalScore(0);
    setTotalCoins(0);
    setTotalTime(0);
    setScreen('menu');
  };

  const getRank = () => {
    const board = getLeaderboard();
    const idx = board.findIndex(e => e.playerName === playerName);
    return idx >= 0 ? idx + 1 : board.length + 1;
  };

  switch (screen) {
    case 'welcome':
      return <WelcomeScreen onContinue={() => setScreen('name')} />;
    case 'name':
      return <NameInput onSubmit={(name) => { setPlayerName(name); setScreen('menu'); }} />;
    case 'menu':
      return <MainMenu playerName={playerName} onSelectLevel={startLevel} onViewLeaderboard={() => setScreen('leaderboard')} />;
    case 'leaderboard':
      return <Leaderboard onBack={() => setScreen('menu')} />;
    case 'playing':
      if (!gameState) return null;
      return (
        <div className="min-h-screen bg-background flex flex-col items-center py-4 px-2 gap-4">
          <h1 className="font-display text-2xl text-primary text-glow-cyan tracking-wider">DEADLOX</h1>
          <GameHUD state={gameState} config={LEVEL_CONFIGS[currentLevel]} elapsedTime={elapsedTime} />
          <MazeRenderer
            maze={gameState.maze}
            playerPos={gameState.playerPos}
            enemyPositions={gameState.enemyPositions}
            config={LEVEL_CONFIGS[currentLevel]}
          />
          <p className="text-muted-foreground text-xs font-mono-game">Use arrow keys or WASD to move</p>
        </div>
      );
    case 'scorecard':
      if (!lastScoreCard) return null;
      return (
        <ScoreCardDisplay
          card={lastScoreCard}
          onNextLevel={nextLevel}
          onMenu={goToMenu}
          isLastLevel={currentLevel === 'boss'}
        />
      );
    case 'victory':
      return (
        <VictoryScreen
          playerName={playerName}
          totalScore={totalScore}
          totalCoins={totalCoins}
          totalTime={totalTime}
          rank={getRank()}
          onMenu={goToMenu}
        />
      );
    case 'gameover':
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center space-y-6 neon-border rounded-lg p-12 bg-card">
            <h1 className="font-display text-4xl text-destructive tracking-wider">GAME OVER</h1>
            <p className="text-muted-foreground font-mono-game">The robot got you!</p>
            <div className="space-y-2">
              <button onClick={() => startLevel(currentLevel)} className="w-full py-3 bg-primary text-primary-foreground font-display tracking-wider rounded hover:opacity-90">
                RETRY LEVEL
              </button>
              <button onClick={goToMenu} className="w-full py-3 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 rounded font-mono-game text-sm">
                MAIN MENU
              </button>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Index;
