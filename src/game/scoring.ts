import { Difficulty, ScoreCard, LeaderboardEntry } from './types';

const LEVEL_BONUS: Record<Difficulty, number> = {
  easy: 50,
  medium: 100,
  hard: 200,
  boss: 500,
};

export function calculateScore(
  coinsCollected: number,
  coinPoints: number,
  wallHits: number,
  timeTaken: number,
  difficulty: Difficulty
): number {
  const coinScore = coinsCollected * coinPoints;
  const penalty = wallHits * 5;
  const timeBonus = Math.max(0, Math.floor(300 - timeTaken)); // bonus for finishing under 5 min
  const levelBonus = LEVEL_BONUS[difficulty];
  return Math.max(0, coinScore + levelBonus - penalty + timeBonus);
}

export function saveScoreCard(card: ScoreCard) {
  const cards = getScoreCards();
  cards.push(card);
  localStorage.setItem('deadlox_scorecards', JSON.stringify(cards));
}

export function getScoreCards(): ScoreCard[] {
  const raw = localStorage.getItem('deadlox_scorecards');
  return raw ? JSON.parse(raw) : [];
}

export function saveToLeaderboard(entry: LeaderboardEntry) {
  const board = getLeaderboard();
  const existing = board.findIndex(e => e.playerName === entry.playerName);
  if (existing >= 0) {
    board[existing].totalPoints += entry.totalPoints;
    board[existing].levelsCompleted = [...new Set([...board[existing].levelsCompleted, ...entry.levelsCompleted])];
    board[existing].timestamp = entry.timestamp;
  } else {
    board.push(entry);
  }
  board.sort((a, b) => b.totalPoints - a.totalPoints);
  localStorage.setItem('deadlox_leaderboard', JSON.stringify(board));
}

export function getLeaderboard(): LeaderboardEntry[] {
  const raw = localStorage.getItem('deadlox_leaderboard');
  return raw ? JSON.parse(raw) : [];
}
