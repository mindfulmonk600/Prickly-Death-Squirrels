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

module.exports = router;
