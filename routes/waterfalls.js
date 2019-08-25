const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const { waterFalls } = require('../Data/nz-waterfall-points-topo-150k.js');

// Attempting to search the link in google
const waterfallName = "NZ Huka Waterfal";
const startOfLink = "https://www.googleapis.com/customsearch/v1?key=AIzaSyD5k1pb09Ps-HggBMol8C1DOdtXvKdBAdw&cx=012192724314722472829:d4ruzb6dne4&q=";
const endOfLink = "&searchType=image&alt=json";

const link = startOfLink + waterfallName + endOfLink;

const axios = require('axios');

router.get('/', (req, res) => {
  const waterFallsProperties = waterFalls.map(wt => {
    return {
      Name: wt['properties']['Name'],
      height: wt['properties']['height'],
      coordinates: wt['geometry']['coordinates']
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
    const testRadius = 500000;
    const userLocTest = {latitude: -41.292653, longitude: 174.777058}

    let waterfallDistance = geolib.getDistance(
      userLocTest,
      waterfallLocCoord,
      1
    );
    
    if (waterfallDistance < testRadius) {
      console.log(waterfallDistance);
      outputWaterfallList.push(water);
    }
  }
  res.send(outputWaterfallList);

});

module.exports = router;
