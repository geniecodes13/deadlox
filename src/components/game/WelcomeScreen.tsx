import { useEffect } from 'react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen = ({ onContinue }: WelcomeScreenProps) => {
  useEffect(() => {
    const handler = () => onContinue();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onContinue]);

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden cursor-pointer"
      onClick={onContinue}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'scan-line 8s linear infinite',
        }} />
      </div>

      <div className="text-center z-10 space-y-8">
        <h1 className="font-display text-6xl md:text-8xl font-black text-primary text-glow-cyan animate-flicker tracking-wider">
          DEADLOX
        </h1>
        <div className="space-y-2">
          <p className="text-xl text-foreground font-mono-game">WELCOME TO DEADLOX</p>
          <p className="text-muted-foreground font-mono-game">A fun Maze Runner Game</p>
        </div>
        <p className="text-primary animate-pulse-glow font-mono-game text-sm tracking-widest uppercase mt-12">
          Tap to Continue...
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
