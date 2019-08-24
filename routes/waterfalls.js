const express = require("express");
const router = express.Router();
const geolib = require('geolib');

router.get("/", async (req, res) => {
  const fakeReq = {
    liked: false,
    radius: 12000,
    userLocation: {
      latitude: 174.732678,
      longitude: 174.775521
    }
  };

  const waterfallList = [
    {
      name: "1",
      height: 10.0,
      liked: false,
      location: {
        latitude: -41.294907,
        longitude: 174.775521
      }
    },
    {
      name: "3",
      height: 10.0,
      liked: true,
      location: {
        latitude: -41.294907,
        longitude: 174.775521
      }
    },
    {
      name: "2",
      height: 10.0,
      liked: true,
      location: {
        latitude: -41.294907,
        longitude: 174.775521
      }
    }
  ];

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

  // console.log("Waterfalls within radius:");
  // console.log(withinRadiusList);
  // console.log("Liked waterfalls:");
  // console.log(likedWaterfalls);

});

router.get('/caculate', async (req, res) => {
  geolib.getDistance(
    { latitude: 51.5103, longitude: 7.49347 },
    { latitude: "51° 31' N", longitude: "7° 28' E" }
  );
  geolib.getDistance(
    { latitude: 51.5103, longitude: 7.49347 },
    { latitude: "51° 31' N", longitude: "7° 28' E" }
  );

  navigator.geolocation.getCurrentPosition(
    function(position) {
      alert(
        'You are ' +
          geolib.getDistance(position.coords, {
            latitude: 51.525,
            longitude: 7.4575
          }) +
          ' meters away from 51.525, 7.4575'
      );
    },
    function() {
      alert('Position could not be determined.');
    },
    {
      enableHighAccuracy: true
    }
  );
  res.send('Hello world');
});

module.exports = router;
