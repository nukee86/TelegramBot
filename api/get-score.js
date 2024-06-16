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

// Handler function for /api/get-score endpoint
export default function handler(req, res) {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  let scores = readScoresFile();

  // Retrieve score for the specified user_id
  const score = scores[user_id] || 0;

  res.status(200).json({ score });
}
