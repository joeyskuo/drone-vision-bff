const detectController = {
  detectImage: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const imageFile = req.file;

      res.set('Content-Type', 'image/png');

      res.send(imageFile.buffer);

    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
    }
  }
};

module.exports = detectController;