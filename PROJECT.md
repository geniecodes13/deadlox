# DEADLOX - Maze Runner Survival Game

## Project Overview

DEADLOX is a cyberpunk-themed maze runner survival game available in two versions:
- **Web Version**: React + TypeScript + Tailwind CSS (playable in browser)
- **C++ Version**: Console-based game engine with maze generation, enemy AI, and scoring

The game features 4 difficulty levels (Easy → Medium → Hard → Boss), where players navigate through mazes, collect coins, avoid enemies with intelligent pathfinding AI, and reach the exit.

---

## Tech Stack

### Web Version
| Technology | Version | Purpose |
|------------|---------|---------|
| **Vite** | ^5.4.19 | Fast build tool and dev server |
| **React** | ^18.3.1 | UI framework |
| **TypeScript** | ^5.8.3 | Type safety |
| **Tailwind CSS** | ^3.4.17 | Styling |
| **shadcn/ui** | (Radix UI) | UI components |
| **Vitest** | ^3.2.4 | Testing framework |
| **ESLint** | ^9.32.0 | Code linting |

### C++ Version
| Technology | Version | Purpose |
|------------|---------|---------|
| **C++** | **C++17** | Programming language |
| **CMake** | 3.10+ | Build system |
| **MinGW-w64** | Latest | GCC compiler for Windows |
| **MSVC** | Latest | Microsoft Visual C++ compiler |

---

## C++ Version - Emphasis on C++17

The C++ version of DEADLOX is built using **C++17** (also known as C++1z), which provides modern language features including:

- **Structured Bindings**: `auto [a, b] = pair;`
- **std::optional**: For nullable return types
- **std::string_view**: For efficient string slicing
- **std::variant**: Type-safe union
- **if constexpr**: Compile-time branching
- **Inline variables**: For inline static members
- **Fold expressions**: For variadic templates
- **std::filesystem**: For file system operations (if needed)

The project uses CMake to ensure C++17 standard compliance:
```cmake
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DEADLOX GAME ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐        │
│  │      WEB VERSION            │    │      C++ VERSION            │        │
│  │  (React + TypeScript)       │    │  (Console Engine)           │        │
│  └──────────────┬──────────────┘    └──────────────┬──────────────┘        │
│                 │                                  │                        │
│                 ▼                                  ▼                        │
│  ┌─────────────────────────────┐    ┌─────────────────────────────┐        │
│  │     src/                    │    │     cpp_game/               │        │
│  │  ├── pages/                 │    │  ├── main.cpp               │        │
│  │  │   └── Index.tsx          │    │  ├── types.h/cpp            │        │
│  │  ├── components/            │    │  ├── maze_generator.h/cpp   │        │
│  │  │   ├── game/              │    │  ├── enemy_ai.h/cpp         │        │
│  │  │   └── ui/                │    │  ├── scoring.h/cpp          │        │
│  │  ├── game/                  │    │  └── CMakeLists.txt         │        │
│  │  │   ├── enemyAI.ts         │    │                             │        │
│  │  │   ├── mazeGenerator.ts  │    │                             │        │
│  │  │   ├── scoring.ts         │    │                             │        │
│  │  │   └── types.ts           │    │                             │        │
│  │  └── hooks/                 │    │                             │        │
│  └─────────────────────────────┘    └─────────────────────────────┘        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## C++ Module Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         C++ GAME ENGINE MODULES                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                           main.cpp                                  │   │
│   │                    (Entry Point & Tests)                            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│           ┌────────────────────────┼────────────────────────┐              │
│           ▼                        ▼                        ▼              │
│   ┌───────────────┐      ┌─────────────────┐      ┌────────────────┐       │
│   │ types.h/cpp   │      │maze_generator.h│      │  enemy_ai.h   │       │
│   │               │      │     /cpp        │      │    /cpp       │       │
│   │ - CellType    │      │                 │      │                │       │
│   │ - Position    │      │ - Predefined    │      │ - BFS Path     │       │
│   │ - MazeCell    │      │   Mazes         │      │   Finding      │       │
│   │ - Difficulty  │      │ - Random DFS    │      │ - Shortest     │       │
│   │ - LevelConfig │      │ - Coin Place    │      │   Path         │       │
│   │ - GameState   │      │ - Parse Maze    │      │ - Random       │       │
│   │ - ScoreCard   │      │                 │      │   Patrol       │       │
│   └───────────────┘      └─────────────────┘      └────────────────┘       │
│           │                        │                        │              │
│           └────────────────────────┼────────────────────────┘              │
│                                    ▼                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         scoring.h/cpp                              │   │
│   │                                                                       │   │
│   │  - calculateScore()  - Coin + Time + Level Bonus - Wall Penalty   │   │
│   │  - saveScoreCard()   - Score persistence                           │   │
│   │  - saveToLeaderboard() - Leaderboard management                    │   │
│   │  - getScoreCards()   - Retrieve scores                              │   │
│   │  - getLeaderboard()  - Retrieve leaderboard                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           GAME DATA FLOW                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   1. MAZE GENERATION                                                         │
│   ┌──────────────┐    ┌─────────────────────┐    ┌────────────────────┐    │
│   │ Difficulty   │───▶│  createMaze()       │───▶│  ParsedMaze        │    │
│   │ Selection    │    │  (maze_generator)   │    │  - maze[][]        │    │
│   └──────────────┘    └─────────────────────┘    │  - playerStart    │    │
│                                                      │  - exitPos        │    │
│                                                      │  - enemyPositions │    │
│                                                      │  - coinPositions  │    │
│                                                      └────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│   2. GAME LOOP                                                                │
│   ┌──────────────┐    ┌─────────────────────┐    ┌────────────────────┐    │
│   │ Player Move  │───▶│  Validate Move      │───▶│  Update Position   │    │
│   │ Input        │    │  Check Wall         │    │  Collect Coins     │    │
│   └──────────────┘    └─────────────────────┘    └────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│   ┌──────────────┐    ┌─────────────────────┐    ┌────────────────────┐    │
│   │ Enemy AI     │───▶│  getEnemyNextMove() │───▶│  BFS Pathfinding   │    │
│   │ Turn         │    │  (enemy_ai)         │    │  to Player         │    │
│   └──────────────┘    └─────────────────────┘    └────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│   3. SCORING                                                                   │
│   ┌──────────────┐    ┌─────────────────────┐    ┌────────────────────┐    │
│   │ Level        │───▶│  calculateScore()   │───▶│  Final Score       │    │
│   │ Complete     │    │  (scoring)          │    │  Calculation      │    │
│   └──────────────┘    └─────────────────────┘    └────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│   ┌──────────────┐    ┌─────────────────────┐    ┌────────────────────┐    │
│   │ Score        │───▶│  saveScoreCard()    │───▶│  saveToLeaderboard │    │
│   │ Persistence  │    │  (scoring)          │    │  ()                │    │
│   └──────────────┘    └─────────────────────┘    └────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## C++ File Descriptions

### 1. types.h / types.cpp

**Purpose**: Core data structures and type definitions

**Key Components**:
- `CellType` enum: `Wall`, `Path`, `Coin`, `Exit`, `Player`, `Enemy`
- `Position` struct: `row`, `col` with equality operators
- `PositionHash`: Hash function for unordered_map/set
- `MazeCell` struct: Contains `type` and `visible` (for fog of war)
- `Difficulty` enum: `Easy`, `Medium`, `Hard`, `Boss`
- `GameStatus` enum: `Playing`, `Won`, `Lost`, `Timeout`
- `LevelConfig` struct: Configuration for each difficulty level
- `GameState` struct: Runtime game state container
- `ScoreCard` struct: Individual game score record
- `LeaderboardEntry` struct: Leaderboard entry

**Level Configurations**:
| Level   | Size       | Coins | Moves | Enemy Speed | Fog of War | Maze Type   |
|---------|------------|-------|-------|-------------|------------|-------------|
| Easy    | 11x9       | 10pts | 500   | 800ms       | No         | Predefined  |
| Medium  | 15x11      | 20pts | 450   | 650ms       | No         | Predefined  |
| Hard    | 15x11      | 30pts | 350   | 500ms       | Yes (3)    | Predefined  |
| Boss    | 19x13      | 50pts | 300   | 400ms       | Yes (4)    | Random DFS  |

---

### 2. maze_generator.h / maze_generator.cpp

**Purpose**: Maze generation and parsing

**Key Functions**:

#### generateRandomMaze(width, height)
- Uses **DFS (Depth-First Search) Recursive Backtracking** algorithm
- Creates perfect mazes (exactly one path between any two points)
- Ensures odd dimensions for proper wall/path structure
- Places player at (1,1), exit at opposite corner, enemy near player

#### parseMaze(lines)
- Converts string maze representation to game structures
- Identifies player start, exit, and enemy positions
- Places coins on ~25% of path cells randomly
- Returns `ParsedMaze` structure

#### createMaze(difficulty)
- Entry point for maze creation
- Uses predefined mazes for Easy/Medium/Hard
- Uses random DFS generation for Boss level
- Returns fully parsed `ParsedMaze`

**Predefined Maze Format**:
```
###########    # = Wall
#P..#...#E#    P = Player Start
#.#.#.#.#.#    E = Enemy Start
#...#...#X#    X = Exit
###########    . = Path
```

---

### 3. enemy_ai.h / enemy_ai.cpp

**Purpose**: Enemy AI with intelligent pathfinding

**Key Function**:

#### getEnemyNextMove(enemyPos, playerPos, maze)
- Implements **BFS (Breadth-First Search)** pathfinding algorithm
- Finds the shortest path from enemy to player
- Considers maze walls as obstacles
- Returns the next position the enemy should move to

**Algorithm Details**:
1. Start BFS from enemy position
2. Explore neighbors level by level (guarantees shortest path)
3. Track path to player
4. Return first position in the path

**Fallback Behavior**:
- If no path to player exists (blocked), enemy makes random valid move
- Considers 4 directions: Up, Down, Left, Right

**BFS Implementation**:
```cpp
std::queue<std::pair<Position, std::vector<Position>>> queue;
std::unordered_set<std::string> visited;
// ... BFS exploration ...
// Returns first position in shortest path
```

---

### 4. scoring.h / scoring.cpp

**Purpose**: Score calculation and persistence

**Key Functions**:

#### calculateScore(coinsCollected, coinPoints, wallHits, timeTaken, difficulty)
- **Base Score**: `coinsCollected * coinPoints`
- **Level Bonus**: Easy=50, Medium=100, Hard=200, Boss=500
- **Wall Penalty**: `-5 points` per wall hit
- **Time Bonus**: `max(0, 300 - timeTaken)` seconds = bonus points

**Formula**:
```
finalScore = (coins × coinPoints) + levelBonus - (wallHits × 5) + timeBonus
```

#### saveScoreCard(card)
- Saves individual game score to memory
- In production, would connect to database

#### saveToLeaderboard(entry)
- Adds/updates leaderboard entry
- Sorts by total points (descending)
- Aggregates points across levels

#### getLeaderboard()
- Returns sorted leaderboard

---

### 5. main.cpp

**Purpose**: Entry point and test harness

**Functionality**:
- Tests maze generation for all difficulty levels
- Tests enemy AI pathfinding
- Tests scoring calculations
- Tests score card and leaderboard storage

---

## Building and Running the C++ Version

### Prerequisites
- CMake 3.10+
- C++ Compiler (MinGW-w64 or MSVC)

### Build (Windows with MinGW)
```bash
cd cpp_game
mkdir build
cd build
cmake .. -G "MinGW Makefiles"
cmake --build .
```

### Run
```bash
cpp_game\build\deadlox_game.exe
```

### Or use provided scripts
```bash
# PowerShell
.\run_cpp.ps1

# Batch
cpp_game\build_run.bat
```

---

## Web Version Structure

```
src/
├── components/
│   ├── game/
│   │   ├── GameHUD.tsx          # Game heads-up display
│   │   ├── Leaderboard.tsx      # Score leaderboard UI
│   │   ├── MainMenu.tsx         # Main menu screen
│   │   ├── MazeRenderer.tsx     # Canvas/SVG maze renderer
│   │   ├── NameInput.tsx        # Player name input
│   │   ├── ScoreCardDisplay.tsx # Score details
│   │   ├── VictoryScreen.tsx    # Win screen
│   │   └── WelcomeScreen.tsx    # Welcome/start screen
│   └── ui/                      # shadcn/ui components
├── game/
│   ├── enemyAI.ts               # BFS pathfinding (mirrors C++)
│   ├── mazeGenerator.ts         # Maze generation (mirrors C++)
│   ├── scoring.ts               # Scoring (mirrors C++)
│   └── types.ts                 # TypeScript types
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities
└── pages/
    └── Index.tsx                # Main game page
```

---

## Conclusion

DEADLOX is a well-structured game project with:

1. **Dual implementations** - Web (React) and C++ console versions
2. **Clean architecture** - Modular design with separation of concerns
3. **Modern C++17** - Using latest language features
4. **Robust algorithms** - DFS for maze generation, BFS for pathfinding
5. **Complete game loop** - Generation → Gameplay → Scoring → Persistence
6. **Scalable design** - Easy to add new levels, enemies, or features

The C++ version demonstrates professional game engine development practices with proper data structures, algorithms, and build configuration.

