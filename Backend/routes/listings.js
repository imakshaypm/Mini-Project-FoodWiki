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
const users=require('./users');


const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const baseUrl = config.get("assetsBaseUrl");

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const hotelSchema = new mongoose.Schema({  
  title: String,
  dishone: String,
  city: String,
  doneprice:Number,
  dishtwo:String,
  dtwoprice:Number,
  dishthree:String,
  dthreeprice:Number,
  userId:String,
  city:String,
  description:String,
  categoryId:Number,
  location: { 'latitude': Number, 'longitude': Number},
  images: [{ fileName: String}],
  phone:Number,
  popularity:{type:Number, default:0}
 });
const Restaurant = mongoose.model("restaurant", hotelSchema);



const schema = {
  title: Joi.string().required(),
  dishone: Joi.string().required(),
  doneprice: Joi.number().required(),
  dishtwo: Joi.string(),
  dtwoprice: Joi.number(),
  dishthree: Joi.string(),
  dthreeprice: Joi.number(),
  userId: Joi.string().required(),
  city: Joi.string().required(),
  description: Joi.string().allow(""),
  categoryId: Joi.number().required().min(1),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }).required(),
  phone: Joi.number().min(1)
};


//mongoose.connect('mongodb://localhost:27017/foodwiki').then(() => console.log('Connected to MongoDb...')).catch(err => console.error("Couldnt connect", err));




const validateCategoryId = (req, res, next) => {
  if (!categoriesStore.getCategory(parseInt(req.body.categoryId)))
    return res.status(400).send({ error: "Invalid categoryId." });

  next();
};

router.get("/", async (req, res) => {
  //const listings = store.getListings();
  if (req.query.screen == "SearchScreen") {
    const name = req.query.search
    //console.log(name)
    const listings1 = await Restaurant.find({ popularity: { $gt: 5 }, title: { $regex: "^"+name, $options: "i" } });
    //console.log(listings1)
    const resources = listings1.map(listingMapper);
    res.send(resources);
  }
  if (req.query.screen == "ListingScreen"){
    const listings1 = await Restaurant.find({ popularity: { $gt: 5 } });
    const resources = listings1.map(listingMapper);
    res.send(resources);
  }
  if (req.query.screen == "FactScreen") {
    
    const listings1 = await Restaurant.find({ popularity: { $lt: 5 } });
    //console.log(listings1)
    const resources = listings1.map(listingMapper);
    res.send(resources);
  }
  if (req.query.screen == "UserListing") {

    const listings1 = await Restaurant.find({});
    //console.log(listings1)
    const resources = listings1.map(listingMapper);
    res.send(resources);
  }
  //console.log(listings1[0]._id)
  //console.log(resources[2]._doc._id)
  //res.sendFile(resources.images);
  
  //const listings1 = await Restaurant.find();
  //console.log(listings1);
});

router.post(
  "/",
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array("images", config.get("maxImageCount")),
    validateWith(schema),
    validateCategoryId,
    imageResize,
  ],

  async (req, res) => {
    const listing = {
      title: req.body.title,
      dishone: req.body.dishone,
      doneprice: parseFloat(req.body.doneprice),
      dishtwo: req.body.dishtwo,
      dtwoprice: parseFloat(req.body.dtwoprice),
      dishthree: req.body.dishthree,
      dthreeprice: parseFloat(req.body.dthreeprice),
      userId: req.body.userId,
      city: req.body.city,
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
      phone: req.body.phone,
      location: JSON.parse(req.body.location)
      
    };

    const restaurant=new Restaurant({
      title: req.body.title,
      dishone: req.body.dishone,
      doneprice: parseFloat(req.body.doneprice),
      dishtwo: req.body.dishtwo,
      dtwoprice: parseFloat(req.body.dtwoprice),
      dishthree: req.body.dishthree,
      dthreeprice: parseFloat(req.body.dthreeprice),
      userId: req.body.userId,
      city: req.body.city,
      categoryId: parseInt(req.body.categoryId),
      description: req.body.description,
      phone: parseInt(req.body.phone),
      location: JSON.parse(req.body.location),
      images: req.images.map((fileName) => ({ fileName: fileName }))
    });
    /*restaurant.images = JSON.parse(req.images.map((fileName) => ({ fileName: fileName })));*/
    listing.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.user) listing.userId = req.user.userId;
    const result= await restaurant.save();
    //console.log(restaurant)
    res.status(201).send(listing);
  }
);

module.exports = router;
