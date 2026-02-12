require('dotenv').config();
const cors = require('cors'); 
const express = require('express');
const detectRoutes = require('./src/routes/detect');
const warmupRoutes = require('./src/routes/warmup');

const app = express();

app.use(cors({
  origin: [process.env.LOCALHOST, process.env.PROD_DOMAIN]
}));
app.use(express.json());

app.use('/warmup', warmupRoutes);
app.use('/detect', detectRoutes);

module.exports = app;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});