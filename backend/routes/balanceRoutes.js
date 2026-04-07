const express = require('express');
const router = express.Router();
const deepgramService = require('../services/deepgramService');
const grokService = require('../services/grokService');

router.get('/deepgram-balance', async (req, res) => {
    try {
        const balance = await deepgramService.getDeepgramBalance();
        res.json(balance);
    } catch (error) {
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : 'Internal Server Error';
        res.status(status).json({
            error: 'Failed to fetch Deepgram balance',
            details: message,
            status: status
        });
    }
});

router.get('/grok-balance', (req, res) => {
    const balance = grokService.getGrokBalance();
    res.json(balance);
});

module.exports = router;
