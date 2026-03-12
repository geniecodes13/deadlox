import { getLeaderboard } from '@/game/scoring';

interface LeaderboardProps {
  onBack: () => void;
}

const Leaderboard = ({ onBack }: LeaderboardProps) => {
  const entries = getLeaderboard();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="neon-border-magenta rounded-lg p-8 bg-card space-y-6 w-full max-w-md text-center">
        <h2 className="font-display text-2xl text-secondary text-glow-magenta tracking-wider">RANKING</h2>

        {entries.length === 0 ? (
          <p className="text-muted-foreground font-mono-game text-sm">No scores yet. Play a game!</p>
        ) : (
          <div className="space-y-2 font-mono-game text-sm text-left">
            {entries.slice(0, 10).map((e, i) => (
              <div key={i} className="flex justify-between items-center px-3 py-2 rounded bg-muted/50">
                <span className={`${i === 0 ? 'text-neon-yellow' : i === 1 ? 'text-foreground' : i === 2 ? 'text-neon-cyan' : 'text-muted-foreground'}`}>
                  {i + 1}. {e.playerName}
                </span>
                <span className="text-primary">{e.totalPoints} pts</span>
              </div>
            ))}
          </div>
        )}

        <button onClick={onBack} className="w-full py-3 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 rounded font-mono-game text-sm">
          BACK
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
