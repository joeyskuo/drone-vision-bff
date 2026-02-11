const FormData = require('form-data');
const axios = require('axios');

const detectController = {
  detectImage: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const imageFile = req.file;

      const formData = new FormData();
      formData.append('file', imageFile.buffer, {
        filename: imageFile.originalname,
        contentType: imageFile.mimetype
      });

      const response = await axios.post(process.env.DRONE_API_ENDPOINT, formData, {
        headers: {
          'X-API-Key': process.env.X_API_KEY,
          ...formData.getHeaders()
        },
        responseType: 'arraybuffer'
      });

      // Send the response image back
      res.set('Content-Type', 'image/jpeg');
      res.send(Buffer.from(response.data));

    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
    }
  }
};

module.exports = detectController;