const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const { waterFalls } = require('../Data/nz-waterfall-points-topo-150k.js');

router.get("/", async (req, res) => {
  const fakeReq = {
    liked: false,
    radius: 12000,
    userLocation: {
      latitude: 174.732678,
      longitude: 174.775521
    }
  };

  // logic 
  const withinRadiusList = []
  const likedWaterfalls = []

  for(let i=0; i<waterfallList.length; i++){
    const water = waterfallList[i];
    // Gets waterfall's distance
    let waterfallDistance = geolib.getDistance(fakeReq.userLocation, water.location, 1);
    if (waterfallDistance < fakeReq.radius){
      withinRadiusList.push(water);
    } 
    if(water.liked){
      likedWaterfalls.push(water);
    }
  }

// Attempting to search the link in google
const waterfallName = "NZ Huka Waterfal";
const startOfLink = "https://www.googleapis.com/customsearch/v1?key=AIzaSyD5k1pb09Ps-HggBMol8C1DOdtXvKdBAdw&cx=012192724314722472829:d4ruzb6dne4&q=";
const endOfLink = "&searchType=image&alt=json";

const link = startOfLink + waterfallList + endOfLink;

const axios = require('axios');

// Make a request for a user with a given ID
axios.get(link)
  .then(function (response) {
    // handle success
    const imageURL = response.data.items[0].link;
    console.log(imageURL);
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

  res.send(waterFallsProperties);

  // // logic
  // const outputWaterfallList = [];

  // for (let i = 0; i < waterfallList.length; i++) {
  //   const water = waterfallList[i];
  //   // Gets waterfall's distance
  //   console.log("haven't got distance yet");
  //   let waterfallDistance = geolib.getDistance(
  //     fakeReq.userLocation,
  //     water.location,
  //     1
  //   );
  //   console.log(waterfallDistance);
  //   if (waterfallDistance < fakeReq.radius) {
  //     outputWaterfallList.push(water);
  //   }
  // }
  // res.send(outputWaterfallList);
  // res.send('ERROR');
});

module.exports = router;
