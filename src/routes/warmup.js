const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(process.env.DRONE_API_ENDPOINT, {
            headers: {
                'X-API-Key': process.env.X_API_KEY
            }
        });
    
        res.json(response.data);
    
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;