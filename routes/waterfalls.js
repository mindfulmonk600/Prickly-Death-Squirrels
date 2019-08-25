const express = require('express');
const router = express.Router();
const geolib = require('geolib');
const axios = require('axios');
const { waterFalls } = require('../Data/nz-waterfall-points-topo-150k.js');

// const fakeReq = {
//   liked: false,
//   radius: 12000,
//   userLocation: {
//     latitude: 174.732678,
//     longitude: 174.775521
//   }
// };

// // logic
// const withinRadiusList = []
// const likedWaterfalls = []

// for(let i=0; i<waterfallList.length; i++){
//   const water = waterfallList[i];
//   // Gets waterfall's distance
//   let waterfallDistance = geolib.getDistance(fakeReq.userLocation, water.location, 1);
//   if (waterfallDistance < fakeReq.radius){
//     withinRadiusList.push(water);
//   }
//   if(water.liked){
//     likedWaterfalls.push(water);
//   }
// }

// Attempting to search the link in google

const startOfLink =
  'https://www.googleapis.com/customsearch/v1?key=AIzaSyD5k1pb09Ps-HggBMol8C1DOdtXvKdBAdw&cx=012192724314722472829:d4ruzb6dne4&q=';
const endOfLink = '&searchType=image&alt=json';

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
  // Make a request for a user with a given ID
  link = startOfLink + 'Barrier Falls' + endOfLink;

  const links = waterFalls.map(async wt => {
    const img = await axios
      .get(link)
      .then(function(response) {
        // handle success
        const imageURL = response.data.items[0].link;
        console.log(imageURL);
        return imageURL;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return img;
  });
  // console.log(links);

  res.send(waterFallsProperties);
});

module.exports = router;
