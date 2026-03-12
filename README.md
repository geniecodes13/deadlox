# DEADLOX - Maze Runner Survival Game

A cyberpunk-themed maze runner game available in two versions:
- **Web Version**: React + TypeScript + Tailwind CSS (playable in browser)
- **C++ Version**: Console-based game engine with maze generation, enemy AI, and scoring

Navigate through increasingly difficult mazes, collect coins, avoid enemies, and reach the exit!

## Features

### Web Version (React + TypeScript)
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

### C++ Version
- **Maze Generation**: Predefined mazes for Easy/Medium/Hard, DFS-based random generation for Boss
- **Enemy AI**: BFS (Breadth-First Search) pathfinding algorithm for intelligent enemy movement
- **Scoring System**: Points calculation based on coins, time, moves, with wall hit penalties
- **Score Storage**: JSON-based local storage for score cards and leaderboard
- **Level Configurations**: 4 difficulty levels with customizable parameters
- **Console Interface**: Clean ASCII-art style maze visualization

## Controls

### Web Version
- **Arrow Keys** or **WASD** - Move the player
- **Click/Tap** - Navigate menus and buttons
- **Retry** - Press the retry button when caught to restart the current level

### C++ Version
- Uses predefined test scenarios - extend main.cpp to add interactive controls

## Game Objective

1. Navigate through the maze to find the exit 🚪
2. Collect coins 🪙 for bonus points
3. Avoid enemy robots 🤖 that chase you using pathfinding AI
4. Complete all 4 levels in sequence (Easy → Medium → Hard → Boss) to win!
5. Watch your lives - you have 3 lives per game!

## Tech Stack

### Web Version
- **Vite** - Fast build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components (Radix UI)
- **Vitest** - Testing framework

### C++ Version
- **C++17** - Programming language
- **CMake** - Build system
- **MinGW/MSVC** - C++ compiler
- **nlohmann/json** - JSON parsing (for score storage)

## Getting Started

### Web Version

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

### C++ Version

#### Prerequisites
- CMake (3.10 or higher)
- C++ Compiler (MinGW-w64 or MSVC)
- Make

#### Installation
No additional dependencies required. The C++ version uses only standard library features.

#### Building (Windows with MinGW)
```bash
# Navigate to cpp_game directory
cd cpp_game

# Create build directory
mkdir build
cd build

# Configure with CMake
cmake .. -G "MinGW Makefiles"

# Build
cmake --build .
```

Or use the provided batch script:
```bash
# Run from project root
cpp_game\build_run.bat
```

#### Running
```bash
# Run the executable
cpp_game\build\deadlox_game.exe
```

#### Building (Alternative - NMake)
```bash
cd cpp_game
mkdir build
cd build
cmake .. -G "NMake Makefiles"
cmake --build .
cd ..
cpp_game\build\deadlox_game.exe
```

## Project Structure

```
├── cpp_game/                   # C++ Game Engine
│   ├── CMakeLists.txt         # CMake build configuration
│   ├── main.cpp               # Main entry point & tests
│   ├── types.h/.cpp           # Data structures & level configs
│   ├── maze_generator.h/.cpp # Maze generation (DFS + predefined)
│   ├── enemy_ai.h/.cpp        # BFS pathfinding AI
│   ├── scoring.h/.cpp         # Score calculation & storage
│   ├── build/                 # Build output
│   └── build_run.bat          # Build & run script
│
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

## C++ Architecture

### Maze Generation (maze_generator.cpp)
- **Predefined mazes**: Hard-coded layouts for Easy, Medium, and Hard levels
- **Random maze generation**: DFS (Depth-First Search) algorithm for Boss level
- Player start position, exit position, and coin placement logic

### Enemy AI (enemy_ai.cpp)
- **BFS Pathfinding**: Finds shortest path from enemy to player
- Considers maze walls and obstacles
- Configurable enemy speed per difficulty level

### Scoring System (scoring.cpp)
- Base score calculation: `coins * coinPoints`
- Time bonus: Faster completion = more points
- Move efficiency bonus: Fewer moves = more points
- Wall hit penalty: Deducts points for unnecessary wall collisions
- Score card and leaderboard storage in JSON format

### Data Types (types.cpp)
- CellType enum: Wall, Path, Coin, Exit, Player, Enemy
- Position struct with row/col coordinates
- MazeCell struct with visibility for fog-of-war
- LevelConfig for each difficulty level
- GameState for runtime game data
- ScoreCard and LeaderboardEntry for persistence

## License

MIT

