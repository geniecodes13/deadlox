# DEADLOX - Maze Runner Survival Game

A cyberpunk-themed maze runner game made using: React + TypeScript + Tailwind CSS (playable in browser)

Navigate through increasingly difficult mazes, collect coins, avoid enemies, and reach the exit!

## Features

- **4 Difficulty Levels**: Easy, Medium, Hard, and Boss levels with progressive difficulty
- **Level Progression System**: Complete all 4 levels in sequence to win the game
- **Dynamic Maze Generation**: Pre-designed mazes for Easy/Medium/Hard levels, random maze generation (DFS algorithm) for Boss level
- **Fog of War**: Enabled in Hard and Boss levels for added challenge
- **Smart Enemy AI**: BFS pathfinding that tracks and follows the player
- **Lives System**: 3 lives per game - get caught and retry the level
- **Scoring System**: Points based on coins collected, time taken, moves used, with penalties for wall hits
- **Move Limits**: Each level has a limited number of moves to complete
- **Leaderboard**: Track your high scores locally with rank tracking
- **Victory & Game Over Screens**: Complete all levels to see your final rank
- **Neon Cyberpunk Theme**: Glowing visuals with cyan, magenta, and green accents


## Controls

- **Arrow Keys** or **WASD** - Move the player
- **Click/Tap** - Navigate menus and buttons
- **Retry** - Press the retry button when caught to restart the current level

## Game Objective

1. Navigate through the maze to find the exit 🚪
2. Collect coins 🪙 for bonus points
3. Avoid enemy robots 🤖 that chase you using pathfinding AI
4. Complete all 4 levels in sequence (Easy → Medium → Hard → Boss) to win!
5. Watch your lives - you have 3 lives per game!

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components (Radix UI)
- **Vitest** - Testing framework


## Getting Started

#### Prerequisites
- Node.js (v18 or higher)
- npm

#### Installation
```bash
# Install dependencies
npm install
```

#### Development
```bash
# Start development server
npm run dev
```

The game will be available at `http://localhost:8080`

#### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

#### Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```
---

## Project Structure

```
├── src/                        # Web Version (React)
│   ├── components/
│   │   ├── game/              # Game-specific components
│   │   │   ├── GameHUD.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── MainMenu.tsx
│   │   │   ├── MazeRenderer.tsx
│   │   │   ├── NameInput.tsx
│   │   │   ├── ScoreCardDisplay.tsx
│   │   │   ├── VictoryScreen.tsx
│   │   │   └── WelcomeScreen.tsx
│   │   └── ui/                # shadcn/ui components
│   ├── game/                  # Game logic
│   │   ├── enemyAI.ts         # Enemy movement AI (BFS pathfinding)
│   │   ├── mazeGenerator.ts   # Maze generation (predefined + random DFS)
│   │   ├── scoring.ts         # Score calculation & local storage
│   │   └── types.ts           # TypeScript types & level configs
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities
│   └── pages/
│       └── Index.tsx          # Main game page
│
├── package.json               # Web dependencies
├── vite.config.ts             # Vite configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── README.md                  # This file
```

## Level Details

| Level   | Size       | Coins | Moves | Enemy Speed | Fog of War | Maze Type   |
|---------|------------|-------|-------|-------------|------------|-------------|
| Easy    | 11x9       | 10pts | 500   | 800ms       | No         | Predefined  |
| Medium  | 15x11      | 20pts | 450   | 650ms       | No         | Predefined  |
| Hard    | 15x11      | 30pts | 350   | 500ms       | Yes (3)    | Predefined  |
| Boss    | 19x13      | 50pts | 300   | 400ms       | Yes (4)    | Random      |

## License

MIT

