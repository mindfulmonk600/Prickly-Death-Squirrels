const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Hello world');
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
