const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const fakeReq = {
    radius: 12,
    geo: {
      lat: -41.294907,
      long: 174.775521
    }
  };

  const waterfallList = [
    {
      name: "1",
      height: 10.0,
      distance: 10,
      lat: -41.294907,
      long: 174.775521
    },
    {
      name: "3",
      height: 10.0,
      distance: 10,
      lat: -41.294907,
      long: 174.775521
    },
    {
      name: "2",
      height: 10.0,
      distance: 13,
      lat: -41.294907,
      long: 174.775521
    }
  ];

  // logic 
  const outputWaterfallList = []

  for(let i=0; i<waterfallList.length; i++){
    if (waterfallList[i].distance < fakeReq.radius){
      outputWaterfallList.push(waterfallList[i]);
    } 
  }
  res.send(outputWaterfallList);
  res.send("ERROR");

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
