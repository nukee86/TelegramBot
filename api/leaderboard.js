export default function handler(req, res) {
    const leaderboard = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([user_id, score]) => ({ user_id, score }));

    res.status(200).json({ leaderboard });
}
