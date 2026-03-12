interface VictoryScreenProps {
  playerName: string;
  totalScore: number;
  totalCoins: number;
  totalTime: number;
  rank: number;
  onMenu: () => void;
}

const VictoryScreen = ({ playerName, totalScore, totalCoins, totalTime, rank, onMenu }: VictoryScreenProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8 neon-border rounded-lg p-12 bg-card max-w-md">
        <h1 className="font-display text-5xl text-neon-green text-glow-green tracking-wider animate-flicker">
          CONGRATULATIONS!
        </h1>
        <p className="font-display text-xl text-primary text-glow-cyan">YOU WON DEADLOX!</p>
        <p className="text-neon-yellow font-mono-game">{playerName}</p>

        <div className="space-y-3 font-mono-game text-sm text-left">
          <div className="flex justify-between"><span className="text-muted-foreground">Final Score</span><span className="text-primary text-glow-cyan">{totalScore}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Total Coins</span><span className="text-neon-yellow">{totalCoins}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Total Time</span><span className="text-foreground">{Math.floor(totalTime)}s</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Rank</span><span className="text-neon-green">#{rank}</span></div>
        </div>

        <button onClick={onMenu} className="w-full py-3 bg-primary text-primary-foreground font-display tracking-wider rounded hover:opacity-90">
          MAIN MENU
        </button>
      </div>
    </div>
  );
};

export default VictoryScreen;
