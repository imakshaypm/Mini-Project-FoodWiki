const express = require("express");
const mongoose=require('mongoose');
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");

const store = require("../store/listings");
const categoriesStore = require("../store/categories");
const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const imageResize = require("../middleware/imageResize");
const delay = require("../middleware/delay");
const listingMapper = require("../mappers/listings");
const config = require("config");



const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const baseUrl = config.get("assetsBaseUrl");

/*const hotelSchema = new mongoose.Schema({  
  title: String,
  dishone: String,
  city: String,
  doneprice:Number,
  dishtwo:String,
  dtwoprice:Number,
  dishthree:String,
  dthreeprice:Number,
  userId:Number,
  
  city:String,
  description:String,
  categoryId:Number,
  location: { 'latitude': Number, 'longitude': Number},
  images: [{ fileName: String}],
  phone:Number,
  popularity:{type:Number, default:0}
 });
const Restaurant = mongoose.model("restaurant", hotelSchema);*/



const schema = {
  title: Joi.string().required(),
  dishone: Joi.string().required(),
  doneprice: Joi.number().required(),
  dishtwo: Joi.string(),
  dtwoprice: Joi.number(),
  dishthree: Joi.string(),
  dthreeprice: Joi.number(),
  userId: Joi.number().required(),
  city: Joi.string().required(),
  description: Joi.string().allow(""),
  categoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
  phone: Joi.number().min(1)
};





const validateCategoryId = (req, res, next) => {
  if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
    return res.status(400).send({ error: "Invalid categoryId." });

  next();
};

router.get("/",async (req, res) => {
  //const listings = store.getListings();
  const restaurant=new Restaurant();
  const listings1 = await Restaurant.find({popularity:{$lt:5}});
  //console.log(listings1)
  const resources = listings1.map(listingMapper);
  res.send(resources);
  console.log(req.body)
  //console.log(listings1[0]._id)
  //console.log(resources[2]._doc._id)
  //res.sendFile(resources.images);
  
  //const listings1 = await Restaurant.find();
  //console.log(listings1);
  
  


});



    
    


module.exports = router;