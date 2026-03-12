import { ScoreCard } from '@/game/types';

interface ScoreCardDisplayProps {
  card: ScoreCard;
  onNextLevel: () => void;
  onMenu: () => void;
  isLastLevel: boolean;
}

const ScoreCardDisplay = ({ card, onNextLevel, onMenu, isLastLevel }: ScoreCardDisplayProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="neon-border rounded-lg p-8 bg-card space-y-6 w-full max-w-sm text-center">
        <h2 className="font-display text-2xl text-neon-green text-glow-green tracking-wider">LEVEL COMPLETE!</h2>

        <div className="space-y-3 font-mono-game text-sm text-left">
          <div className="flex justify-between"><span className="text-muted-foreground">Player</span><span className="text-foreground">{card.playerName}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Level</span><span className="text-foreground uppercase">{card.level}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Coins</span><span className="text-neon-yellow">{card.coinsCollected}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Moves Used</span><span className="text-foreground">{card.movesUsed}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="text-foreground">{Math.floor(card.timeTaken)}s</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Points</span><span className="text-primary text-glow-cyan">{card.pointsEarned}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="text-foreground text-xs">{card.timestamp}</span></div>
        </div>

        <div className="space-y-2 pt-4">
          {!isLastLevel && (
            <button onClick={onNextLevel} className="w-full py-3 bg-primary text-primary-foreground font-display tracking-wider rounded hover:opacity-90">
              NEXT LEVEL
            </button>
          )}
          <button onClick={onMenu} className="w-full py-3 border border-border text-muted-foreground hover:text-primary hover:border-primary/40 rounded font-mono-game text-sm">
            MAIN MENU
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreCardDisplay;
