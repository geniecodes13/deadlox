import { MazeCell, Position, LevelConfig } from '@/game/types';
import { useMemo } from 'react';

interface MazeRendererProps {
  maze: MazeCell[][];
  playerPos: Position;
  enemyPositions: Position[];
  config: LevelConfig;
}

const CELL_SIZE = 32;

const MazeRenderer = ({ maze, playerPos, enemyPositions, config }: MazeRendererProps) => {
  const visibilityMap = useMemo(() => {
    if (!config.fogOfWar) return null;
    const map: boolean[][] = maze.map(row => row.map(() => false));
    const r = config.fogRadius;
    for (let dr = -r; dr <= r; dr++) {
      for (let dc = -r; dc <= r; dc++) {
        const nr = playerPos.row + dr;
        const nc = playerPos.col + dc;
        if (nr >= 0 && nr < maze.length && nc >= 0 && nc < maze[0].length) {
          if (Math.abs(dr) + Math.abs(dc) <= r + 1) {
            map[nr][nc] = true;
          }
        }
      }
    }
    return map;
  }, [maze, playerPos, config.fogOfWar, config.fogRadius]);

  return (
    <div className="flex justify-center overflow-auto">
      <div
        className="relative inline-grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${maze[0].length}, ${CELL_SIZE}px)`,
        }}
      >
        {maze.map((row, r) =>
          row.map((cell, c) => {
            const isPlayer = playerPos.row === r && playerPos.col === c;
            const isEnemy = enemyPositions.some(e => e.row === r && e.col === c);
            const isHidden = visibilityMap && !visibilityMap[r][c];

            let bg = 'bg-muted/30';
            let content = '';

            if (isHidden) {
              bg = 'bg-background';
              content = '';
            } else if (cell.type === 'wall') {
              bg = 'bg-border/60';
            } else if (cell.type === 'exit') {
              bg = 'bg-neon-green/20';
              content = '🚪';
            } else if (cell.type === 'coin') {
              content = '🪙';
            }

            if (!isHidden && isPlayer) {
              content = '😎';
            }
            if (!isHidden && isEnemy) {
              content = '🤖';
            }

            return (
              <div
                key={`${r}-${c}`}
                className={`flex items-center justify-center text-sm select-none ${bg} ${cell.type === 'wall' && !isHidden ? 'border border-border/40' : ''}`}
                style={{ width: CELL_SIZE, height: CELL_SIZE }}
              >
                {content}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MazeRenderer;
