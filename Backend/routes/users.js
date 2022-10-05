const express = require("express");
const mongoose=require("mongoose");
const router = express.Router();
const Joi = require("joi");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");


const schema = {
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  location: Joi.object({
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
  }),
  city: Joi.string().required()
};
const userSchema = new mongoose.Schema({
  name:String,
  phone:Number,
  email:String,
  password:String,
  //location: { 'latitude': Number, 'longitude': Number},
  approved:[{type:String}],
  city:String
});

const User = mongoose.model("users",userSchema);
  



router.post("/", validateWith(schema), async(req, res) => {
  const { name, email, password, location, city } = req.body;

  const em=await User.find({email:email});

  //console.log(em);
  if (em.length != 0)
  {
    return res.status(400).send({ error: "A user with the given email already exists." });
  }
  //const user = { name, email, password, location, city };
  
  //usersStore.addUser(user);
  else{
  const user = new User({
    name:name,
    email:email,
    password: password,
    //location:JSON.parse(location),
    city: city
  })
  const result=await user.save();

  //console.log(user);

  res.status(201).send(user);}
});

router.get("/", (req, res) => {
  res.send(usersStore.getUsers());
});

module.exports = router;
//module.exports = users;
