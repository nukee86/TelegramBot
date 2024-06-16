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
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const score = scores[user_id] || 0;
  res.status(200).json({ score });
}
