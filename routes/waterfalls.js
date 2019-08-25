const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const axios = require('axios');
const { waterFalls } = require('../Data/nz-waterfall-points-topo-150k.js');



router.get('/', (req, res) => {
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



  // logic
  const outputWaterfallList = [];

  for (let i = 0; i < waterFallsProperties.length; i++) {
    const water = waterFallsProperties[i];
    // Gets waterfall's distance
    const latitude = water.coordinates[1];
    const longitude = water.coordinates[0];
    const waterfallLocCoord = {latitude: latitude, longitude: longitude};
    //TEST variables
    const radius = req.query.radius;
    const userLocTest = {latitude: req.query.latt, longitude: req.query.long}

    let waterfallDistance = geolib.getDistance(
      userLocTest,
      waterfallLocCoord,
      1
    );
    
    if (waterfallDistance < radius) {
      console.log(waterfallDistance);
      water.distance = waterfallDistance;
      outputWaterfallList.push(water);
    }
  }
  res.send(outputWaterfallList);


});

module.exports = router;
