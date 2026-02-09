const express = require('express');
const multer = require('multer');

const router = express.Router();
const detectController = require('../controllers/detectController');

const storage = multer.memoryStorage();

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// POST /detect - receives image, returns image
router.post('/', upload.single('file'), detectController.detectImage);

module.exports = router;