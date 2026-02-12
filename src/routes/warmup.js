const express = require('express');
const axios = require('axios');

const router = express.Router();

let lastWarmupTimeMs = 0;
const CONTAINER_LIFETIME_MS = process.env.THROTTLE_MINUTES * 60 * 1000;

router.get('/', async (req, res) => {

    const now = Date.now();
    const timeSinceLastWarmupMs = now - lastWarmupTimeMs;

    if (timeSinceLastWarmupMs < CONTAINER_LIFETIME_MS) {
        const timeLeft = Math.ceil((CONTAINER_LIFETIME_MS - timeSinceLastWarmupMs) / 1000 / 60);

        return res.status(200).json({ 
            message: 'Warmup skipped',
            minutesUntilNext: timeLeft
        });
    }

    try {
        const response = await axios.get(process.env.DRONE_API_ENDPOINT, {
            headers: {
                'X-API-Key': process.env.X_API_KEY
            }
        });

        lastWarmupTimeMs = now;

        res.json(response.data);
    
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;