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

// Function to write scores to scores.json file
function writeScoresFile(scores) {
  try {
    fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2), 'utf-8');
    console.log('Scores updated successfully.');
  } catch (error) {
    console.error('Error writing scores file:', error);
  }
}

// Handler function for /api/update-score endpoint
export default function handler(req, res) {
  const { user_id, clicks } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  let scores = readScoresFile();

  // Update user's clicks
  scores[user_id] = parseInt(clicks, 10) || 0;

  // Write updated scores back to scores.json
  writeScoresFile(scores);

  res.status(200).json({ success: true });
}
