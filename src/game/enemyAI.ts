import { Position, MazeCell } from './types';

// BFS pathfinding toward player
export function getEnemyNextMove(
  enemyPos: Position,
  playerPos: Position,
  maze: MazeCell[][]
): Position {
  const rows = maze.length;
  const cols = maze[0].length;

  // BFS
  const visited = new Set<string>();
  const queue: { pos: Position; path: Position[] }[] = [{ pos: enemyPos, path: [] }];
  visited.add(`${enemyPos.row},${enemyPos.col}`);

  const dirs = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
  ];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.pos.row === playerPos.row && current.pos.col === playerPos.col) {
      return current.path.length > 0 ? current.path[0] : enemyPos;
    }

    for (const d of dirs) {
      const nr = current.pos.row + d.dr;
      const nc = current.pos.col + d.dc;
      const key = `${nr},${nc}`;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
        !visited.has(key) && maze[nr][nc].type !== 'wall') {
        visited.add(key);
        queue.push({
          pos: { row: nr, col: nc },
          path: [...current.path, { row: nr, col: nc }],
        });
      }
    }
  }

  // If no path, random patrol
  const validMoves = dirs
    .map(d => ({ row: enemyPos.row + d.dr, col: enemyPos.col + d.dc }))
    .filter(p => p.row >= 0 && p.row < rows && p.col >= 0 && p.col < cols && maze[p.row][p.col].type !== 'wall');

  return validMoves.length > 0 ? validMoves[Math.floor(Math.random() * validMoves.length)] : enemyPos;
}
