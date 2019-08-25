const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const axios = require('axios');
const { waterFalls } = require('../Data/nz-waterfall-points-topo-150k.js');

router.get('/', async (req, res) => {
  const waterFallsProperties = waterFalls.map(wt => {
    return {
      Name: wt['properties']['Name'],
      height: wt['properties']['height'],
      coordinates: wt['geometry']['coordinates'],
      link: `https://source.unsplash.com/collection/404407/1600x900?r=${
        wt['properties']['Name']
      }`
    };
  });

  res.send(waterFallsProperties);
});

module.exports = router;
