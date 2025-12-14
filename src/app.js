require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const certificateRoutes = require('./routes/certificates');
const logger = require('./config/logger');

const app = express();

app.use(bodyParser.json());
app.use('/api/certificates', certificateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
