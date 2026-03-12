export type CellType = 'wall' | 'path' | 'coin' | 'exit' | 'player' | 'enemy';

export interface Position {
  row: number;
  col: number;
}

export interface MazeCell {
  type: CellType;
  visible?: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard' | 'boss';

export interface LevelConfig {
  name: string;
  difficulty: Difficulty;
  mazeWidth: number;
  mazeHeight: number;
  coinPoints: number;
  moveLimit: number;
  enemyCount: number;
  enemySpeed: number; // ms between moves
  fogOfWar: boolean;
  fogRadius: number;
  randomMaze: boolean;
}

export interface GameState {
  playerName: string;
  level: Difficulty;
  lives: number;
  movesRemaining: number;
  coinsCollected: number;
  totalPoints: number;
  playerPos: Position;
  enemyPositions: Position[];
  maze: MazeCell[][];
  exitPos: Position;
  startTime: number;
  gameStatus: 'playing' | 'won' | 'lost' | 'timeout';
  wallHits: number;
}

export interface ScoreCard {
  playerName: string;
  level: Difficulty;
  coinsCollected: number;
  movesUsed: number;
  timeTaken: number;
  pointsEarned: number;
  timestamp: string;
}

export interface LeaderboardEntry {
  playerName: string;
  totalPoints: number;
  levelsCompleted: Difficulty[];
  timestamp: string;
}

export const LEVEL_CONFIGS: Record<Difficulty, LevelConfig> = {
  easy: {
    name: 'Easy',
    difficulty: 'easy',
    mazeWidth: 11,
    mazeHeight: 9,
    coinPoints: 10,
    moveLimit: 500,
    enemyCount: 1,
    enemySpeed: 800,
    fogOfWar: false,
    fogRadius: 0,
    randomMaze: false,
  },
  medium: {
    name: 'Medium',
    difficulty: 'medium',
    mazeWidth: 15,
    mazeHeight: 11,
    coinPoints: 20,
    moveLimit: 450,
    enemyCount: 1,
    enemySpeed: 650,
    fogOfWar: false,
    fogRadius: 0,
    randomMaze: false,
  },
  hard: {
    name: 'Hard',
    difficulty: 'hard',
    mazeWidth: 15,
    mazeHeight: 11,
    coinPoints: 30,
    moveLimit: 350,
    enemyCount: 1,
    enemySpeed: 500,
    fogOfWar: true,
    fogRadius: 3,
    randomMaze: false,
  },
  boss: {
    name: 'Boss Level',
    difficulty: 'boss',
    mazeWidth: 19,
    mazeHeight: 13,
    coinPoints: 50,
    moveLimit: 300,
    enemyCount: 1,
    enemySpeed: 400,
    fogOfWar: true,
    fogRadius: 4,
    randomMaze: true,
  },
};
