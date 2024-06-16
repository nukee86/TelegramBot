import fs from 'fs';
import path from 'path';

const scoresFilePath = path.resolve('./scores.json');

let scores = {};

try {
  scores = JSON.parse(fs.readFileSync(scoresFilePath, 'utf-8'));
} catch (error) {
  console.error('Error reading scores file:', error);
}

export default function handler(req, res) {
  const leaderboard = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([user_id, score]) => ({ user_id, score }));

  res.status(200).json({ leaderboard });
}
