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
  const { user_id, clicks } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  scores[user_id] = parseInt(clicks, 10) || 0;

  try {
    fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error writing scores file:', error);
    res.status(500).json({ error: 'Error updating score' });
  }
}
