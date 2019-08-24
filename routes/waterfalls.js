const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const { waterFalls } = require('../Data/nz-waterfall-points-topo-150k.js');

router.get('/', (req, res) => {
  const waterFallsProperties = waterFalls.map(wt => {
    return {
      Name: wt['properties']['Name'],
      height: wt['properties']['height'],
      coordinates: wt['geometry']['coordinates']
    };
  });

  res.send(waterFallsProperties);

  // const fakeReq = {
  //   radius: 12000,
  //   userLocation: {
  //     latitude: 174.732678,
  //     longitude: 174.775521
  //   }
  // };

  // const waterfallList = [
  //   {
  //     name: '1',
  //     height: 10.0,
  //     location: {
  //       latitude: -41.294907,
  //       longitude: 174.775521
  //     }
  //   },
  //   {
  //     name: '3',
  //     height: 10.0,
  //     location: {
  //       latitude: -41.294907,
  //       longitude: 174.775521
  //     }
  //   },
  //   {
  //     name: '2',
  //     height: 10.0,
  //     location: {
  //       latitude: -41.294907,
  //       longitude: 174.775521
  //     }
  //   }
  // ];

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
