let scores = {};

export default function handler(req, res) {
    const { user_id, clicks } = req.query;

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    scores[user_id] = parseInt(clicks, 10) || 0;
    res.status(200).json({ success: true });
}
