import { GameState, LevelConfig } from '@/game/types';

interface GameHUDProps {
  state: GameState;
  config: LevelConfig;
  elapsedTime: number;
}

const GameHUD = ({ state, config, elapsedTime }: GameHUDProps) => {
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-card neon-border rounded text-xs font-mono-game">
      <span className="text-neon-yellow">{state.playerName}</span>
      <span className="text-foreground">❤️ {state.lives}</span>
      <span className="text-foreground">🏃 {state.movesRemaining}</span>
      <span className="text-neon-yellow">🪙 {state.coinsCollected}</span>
      <span className="text-primary">⭐ {state.totalPoints}</span>
      <span className="text-muted-foreground">⏱ {formatTime(elapsedTime)}</span>
      <span className="text-secondary font-display text-[10px] tracking-wider">{config.name.toUpperCase()}</span>
    </div>
  );
};

export default GameHUD;
