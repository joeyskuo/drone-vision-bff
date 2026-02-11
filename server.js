require('dotenv').config();
const express = require('express');
const detectRoutes = require('./src/routes/detect');

const app = express();

app.use(express.json());

app.use('/detect', detectRoutes);

module.exports = app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});