import { MazeCell, Position, LevelConfig, Difficulty } from './types';

// Predefined mazes for easy/medium/hard
const EASY_MAZE = [
  '###########',
  '#P..#...#E#',
  '#.#.#.#.#.#',
  '#.#...#.#.#',
  '#.###.#.#.#',
  '#.....#...#',
  '#.#####.#.#',
  '#.......#X#',
  '###########',
];

const MEDIUM_MAZE = [
  '###############',
  '#P..#.....#..E#',
  '#.#.#.###.#.#.#',
  '#.#.#...#...#.#',
  '#.#.###.###.#.#',
  '#.#.......#.#.#',
  '#.#.#####.#.#.#',
  '#...#.....#.#.#',
  '#.###.###.#.#.#',
  '#.........#..X#',
  '###############',
];

const HARD_MAZE = [
  '###############',
  '#P....#.....#E#',
  '#.###.#.###.#.#',
  '#.#...#...#.#.#',
  '#.#.#####.#.#.#',
  '#.#.#.....#...#',
  '#.#.#.###.###.#',
  '#...#.#.#.....#',
  '#.###.#.#.###.#',
  '#.......#....X#',
  '###############',
];

function generateRandomMaze(width: number, height: number): string[] {
  // Ensure odd dimensions for proper maze
  const w = width % 2 === 0 ? width + 1 : width;
  const h = height % 2 === 0 ? height + 1 : height;

  const grid: string[][] = [];
  for (let r = 0; r < h; r++) {
    grid[r] = [];
    for (let c = 0; c < w; c++) {
      grid[r][c] = '#';
    }
  }

  // DFS recursive backtracking
  const stack: Position[] = [];
  const start: Position = { row: 1, col: 1 };
  grid[start.row][start.col] = '.';
  stack.push(start);

  const directions = [
    { dr: -2, dc: 0 },
    { dr: 2, dc: 0 },
    { dr: 0, dc: -2 },
    { dr: 0, dc: 2 },
  ];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = directions
      .map(d => ({ row: current.row + d.dr, col: current.col + d.dc }))
      .filter(n => n.row > 0 && n.row < h - 1 && n.col > 0 && n.col < w - 1 && grid[n.row][n.col] === '#');

    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }

    const next = neighbors[Math.floor(Math.random() * neighbors.length)];
    const wallRow = current.row + (next.row - current.row) / 2;
    const wallCol = current.col + (next.col - current.col) / 2;
    grid[wallRow][wallCol] = '.';
    grid[next.row][next.col] = '.';
    stack.push(next);
  }

  // Place player, exit, enemy
  grid[1][1] = 'P';
  grid[h - 2][w - 2] = 'X';
  // Place enemy far from player
  grid[1][w - 2] = 'E';

  return grid.map(row => row.join(''));
}

function parseMaze(lines: string[]): { maze: MazeCell[][]; playerStart: Position; exitPos: Position; enemyPositions: Position[]; coinPositions: Position[] } {
  const maze: MazeCell[][] = [];
  let playerStart: Position = { row: 0, col: 0 };
  let exitPos: Position = { row: 0, col: 0 };
  const enemyPositions: Position[] = [];
  const coinPositions: Position[] = [];

  for (let r = 0; r < lines.length; r++) {
    maze[r] = [];
    for (let c = 0; c < lines[r].length; c++) {
      const ch = lines[r][c];
      switch (ch) {
        case '#':
          maze[r][c] = { type: 'wall' };
          break;
        case 'P':
          maze[r][c] = { type: 'path' };
          playerStart = { row: r, col: c };
          break;
        case 'X':
          maze[r][c] = { type: 'exit' };
          exitPos = { row: r, col: c };
          break;
        case 'E':
          maze[r][c] = { type: 'path' };
          enemyPositions.push({ row: r, col: c });
          break;
        default:
          maze[r][c] = { type: 'path' };
          break;
      }
    }
  }

  // Scatter coins on path cells
  const pathCells: Position[] = [];
  for (let r = 0; r < maze.length; r++) {
    for (let c = 0; c < maze[r].length; c++) {
      if (maze[r][c].type === 'path' &&
        !(r === playerStart.row && c === playerStart.col) &&
        !enemyPositions.some(e => e.row === r && e.col === c)) {
        pathCells.push({ row: r, col: c });
      }
    }
  }

  // Place coins on ~25% of path cells
  const numCoins = Math.max(3, Math.floor(pathCells.length * 0.25));
  const shuffled = pathCells.sort(() => Math.random() - 0.5);
  for (let i = 0; i < numCoins && i < shuffled.length; i++) {
    maze[shuffled[i].row][shuffled[i].col] = { type: 'coin' };
    coinPositions.push(shuffled[i]);
  }

  return { maze, playerStart, exitPos, enemyPositions, coinPositions };
}

export function createMaze(difficulty: Difficulty, config: LevelConfig) {
  let lines: string[];

  if (config.randomMaze || difficulty === 'boss') {
    lines = generateRandomMaze(config.mazeWidth, config.mazeHeight);
  } else {
    switch (difficulty) {
      case 'easy': lines = EASY_MAZE; break;
      case 'medium': lines = MEDIUM_MAZE; break;
      case 'hard': lines = HARD_MAZE; break;
      default: lines = EASY_MAZE;
    }
  }

  return parseMaze(lines);
}
