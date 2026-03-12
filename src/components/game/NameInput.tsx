import { useState } from 'react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput = ({ onSubmit }: NameInputProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-8 neon-border rounded-lg p-12 bg-card">
        <h2 className="font-display text-3xl text-primary text-glow-cyan tracking-wider">
          ENTER PLAYER NAME
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name..."
            maxLength={16}
            autoFocus
            className="w-full bg-muted border border-border rounded px-4 py-3 text-center text-foreground font-mono-game text-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-primary text-primary-foreground font-display font-bold py-3 rounded tracking-wider hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            START
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;
