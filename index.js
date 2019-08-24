const express = require('express');
const waterfalls = require('./routes/waterfalls');
const app = express();

app.use(express.json());
app.use('/api/waterfalls', waterfalls);

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`listenning to port ${port}...`);
});
