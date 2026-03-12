import { Difficulty } from '@/game/types';

interface MainMenuProps {
  playerName: string;
  onSelectLevel: (level: Difficulty) => void;
  onViewLeaderboard: () => void;
}

const levels: { difficulty: Difficulty; label: string; desc: string }[] = [
  { difficulty: 'easy', label: '1. EASY', desc: '1 enemy • 500 moves' },
  { difficulty: 'medium', label: '2. MEDIUM', desc: '1 enemy • larger maze • 450 moves' },
  { difficulty: 'hard', label: '3. HARD', desc: 'Fog of war • 350 moves' },
  { difficulty: 'boss', label: '4. BOSS LEVEL', desc: 'Random maze • 300 moves' },
];

const MainMenu = ({ playerName, onSelectLevel, onViewLeaderboard }: MainMenuProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-8 w-full max-w-md px-4">
        <div className="text-center space-y-2">
          <h1 className="font-display text-4xl text-primary text-glow-cyan tracking-wider">DEADLOX</h1>
          <p className="text-muted-foreground font-mono-game text-sm">Welcome, <span className="text-neon-yellow">{playerName}</span></p>
        </div>

        <div className="neon-border rounded-lg p-6 bg-card space-y-2">
          <h2 className="font-display text-lg text-primary mb-4 tracking-wider">SELECT LEVEL</h2>
          {levels.map(l => (
            <button
              key={l.difficulty}
              onClick={() => onSelectLevel(l.difficulty)}
              className="w-full text-left px-4 py-3 rounded bg-muted hover:bg-muted/80 border border-transparent hover:border-primary/40 transition-all font-mono-game group"
            >
              <span className="text-foreground group-hover:text-primary transition-colors">{l.label}</span>
              <span className="text-muted-foreground text-xs ml-3">{l.desc}</span>
            </button>
          ))}
        </div>

        <div className="neon-border-magenta rounded-lg p-4 bg-card space-y-2 text-xs font-mono-game">
          <h3 className="font-display text-sm text-secondary text-glow-magenta tracking-wider mb-2">GAME RULES</h3>
          <p className="text-muted-foreground">Coins: Easy +10 | Medium +20 | Hard +30 | Boss +50</p>
          <p className="text-muted-foreground">Wall Hit Penalty: -5 points</p>
          <p className="text-muted-foreground">Controls: Arrow keys or WASD</p>
          <p className="text-neon-yellow">Objective: Reach the exit before the enemy catches you!</p>
        </div>

        <button
          onClick={onViewLeaderboard}
          className="w-full text-center py-3 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all font-mono-game text-sm"
        >
          VIEW LEADERBOARD
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
