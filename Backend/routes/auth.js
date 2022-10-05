const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
};

var userArray 

var conn = mongoose.connection;
conn.on('connected', function () {
  console.log('database is connected successfully');
});
conn.on('disconnected', function () {
  console.log('database is disconnected successfully');
})

router.post("/", validateWith(schema), (req, res) => {
  const { email, password } = req.body;
  conn.db.collection("users", function (err, collection) {
    collection.find({ email: email }).toArray(function (err, data) {
      userArray = data
      //console.log(userArray);
      //console.log(userArray[0].password); // it will print your collection data
    })
  })
  //const user = usersStore.getUserByEmail(email);
  //console.log(userArray)
  if (!userArray || userArray[0].password !== password)
    return res.status(400).send({ error: "Invalid email or password." });

  const token = jwt.sign(
    { userId: userArray[0]._id, name: userArray[0].name, email, city: userArray[0].city, approved: userArray[0].approved },
    "jwtPrivateKey"
  );
  res.send(token);
  }
);

module.exports = router;
