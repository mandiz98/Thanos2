const express = require('express');
const router = express.Router();

const Positions = require('../models/test')

router.get("/", async(req,res) => {
    const positions = await Positions.find();
    res.send(positions);
})
router.post("/", async(req,res) => {
     const position = new Positions({
         x: 100,
         y: 200
     })
     await position.save();
     console.log("saved data");
     console.log("position", position);
     res.send(position)
})


module.exports = router;