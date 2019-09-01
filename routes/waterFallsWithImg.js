const express = require('express');
const router = express.Router();
const axios = require('axios');
const { waterFalls } = require('../Data/nz-waterfall-points-topo-150k.js');

router.get('/', async (req, res) => {
  // const waterfallName = 'NZ Huka Waterfal';

  const startOfLink =
    'https://www.googleapis.com/customsearch/v1?key=AIzaSyD5k1pb09Ps-HggBMol8C1DOdtXvKdBAdw&cx=012192724314722472829:d4ruzb6dne4&q=';
  const endOfLink = '&searchType=image&alt=json';

  // const waterFallsNameLists = [];
  // waterFalls.map(wt => {
  //   waterFallsNameLists.push(wt['properties']['Name']);
  // });

  // console.log(imageURL);
  const waterFallsProperties = [];
  for (let i = 0; i < waterFalls.length; i++) {
    const wt = waterFalls[i];
    const link = startOfLink + wt['properties']['Name'] + endOfLink;
    const data = await axios.get(link);
    const imageURL = data.items && data.items.length ? data.items[0].link : '';

    waterFallsProperties.push({
      name: wt['properties']['Name'],
      height: wt['properties']['height'],
      coordinates: wt['geometry']['coordinates'],
      link: `https://source.unsplash.com/collection/404407/1600x900?r=${
        wt['properties']['Name']
      }`,
      linkImg: imageURL
    });
  }

  res.send(waterFallsProperties);
});

module.exports = router;
