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

// Make a request for a user with a given ID
axios.get(link)
  .then(function (response) {
    // handle success
    // const imageURL = response.data.items[0].link;
    // console.log(imageURL);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

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
    console.log("haven't got distance yet");
    const latitude = water.coordinates[0];
    const longitude = water.coordinates[1];
    const waterfallLocCoord = {latitude: latitude, longitude: longitude};
    console.log(waterfallLocCoord);
    //TEST variables
    const testRadius = 10;
    const userLocTest = {latitude: latitude, longitude: longitude}
    let waterfallDistance = geolib.getDistance(
      userLocTest,
      waterfallLocCoord,
      1
    );
    console.log(waterfallDistance);
    if (waterfallDistance < testRadius) {
      outputWaterfallList.push(water);
    }
  }
  res.send(outputWaterfallList);
  res.send('ERROR');

  // res.send(waterFallsProperties);
});

module.exports = router;
