const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Warmup Started');
});

module.exports = router;