require('express-async-errors');
const express = require('express');
const winston = require('winston');
const error = require('./middleware/error');
const waterfalls = require('./routes/waterfalls');
const waterFallsWithImg = require('./routes/waterFallsWithImg');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

const app = express();

app.use(express.json());
app.use('/api/waterfalls', waterfalls);
app.use('/api/waterFallsWithImg', waterFallsWithImg);

app.use(error);

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`listenning to port ${port}...`);
});
