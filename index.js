require('express-async-errors');
const express = require('express');
const cors = require('cors')
const winston = require('winston');
const error = require('./middleware/error');
const waterfalls = require('./routes/waterfalls');

winston.add(new winston.transports.File({ filename: 'logfile.log' }));

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/waterfalls', waterfalls);
app.use(error);

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`listenning to port ${port}...`);
});
