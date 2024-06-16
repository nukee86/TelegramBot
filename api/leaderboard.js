import fs from 'fs';
import path from 'path';

const scoresFilePath = path.resolve('./scores.json');

// Function to read scores from scores.json file
function readScoresFile() {
  try {
    return JSON.parse(fs.readFileSync(scoresFilePath, 'utf-8'));
  } catch (error) {
    console.error('Error reading scores file:', error);
    return {};
  }
}

// Handler function for /api/leaderboard endpoint
export default function handler(req, res) {
  // Read scores from scores.json
  const scores = readScoresFile();

  // Convert scores object to array and sort by score descending
  const leaderboard = Object.entries(scores)
    .sort(([, a], [, b]) => b - a) // Sort by score descending
    .slice(0, 10) // Take top 10 scores
    .map(([user_id, score]) => ({ user_id, score }));

  // Return leaderboard as JSON response
  res.status(200).json({ leaderboard });
}
