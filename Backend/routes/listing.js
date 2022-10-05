const express = require("express");
const mongoose=require('mongoose');
const router = express.Router();

const store = require("../store/listings");
const auth = require("../middleware/auth");
const listingMapper = require("../mappers/listings");

router.get("/:_id", auth, (req, res) => {
  const listing1= Restaurant.find({_id:req.params.id});
 // const listing = store.getListing(parseInt(req.params.id));
  if (!listing1) return res.status(404).send();
//  const resource = listingMapper(listing);
 // res.send(resource);
 res.send(listing1);
  //console.log(listing1);
});

module.exports = router;
