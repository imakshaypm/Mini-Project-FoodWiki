const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const usersStore = require("../store/users");
const validateWith = require("../middleware/validation");

var ObjectId = require('mongodb').ObjectId

var userArray

var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})

router.get("/", (req, res) => {
    var userName
    var listings
    if (req.query.screen == "ListDetailScreen"){
        conn.db.collection("users", function (err, collection) {
            collection.find({ _id: ObjectId(req.query.userID) }).toArray(function (err, data) {
                if (data){
                    userName = data[0].name.toString()
                } else {
                    res.status(201).send(err)
                }
            })
        })
        conn.db.collection("restaurants", function (err, collection) {
            collection.find({ userId: req.query.userID,  popularity: { $gt: 5 }}).toArray(function (err, data) {
                if (data) {
                    listings = data.length
                    res.send({name: userName, noList: listings})
                    //console.log(listings)
                } else {
                    res.status(201).send(err)
                }
                //console.log(userArray[0].password); // it will print your collection data
            })
        })
    }
    if (req.query.screen == "FactScreen"){
        conn.db.collection("users", function (err, collection) {
            collection.find({ _id: ObjectId(req.query.userID) }).toArray(function (err, data) {
                if (data) {
                    userName = data
                    res.send(userName)
                    //console.log(userName)
                } else {
                    res.status(201).send(err)
                }
            })
        })
    }
    //res.send({ name: userName, noList: listings })
    //console.log("lai")
})

/*router.post("/", (req, res) => {
    const { userID } = req.body;
    console.log(userID)
    conn.db.collection("users", function (err, collection) {
        collection.find({ _id: userID }).toArray(function (err, data) {
            userArray = data
            console.log(userArray);
            //console.log(userArray[0].password); // it will print your collection data
        })
    })
    //const user = usersStore.getUserByEmail(email);
    console.log(userArray)
    if (!userArray || userArray[0].password !== password)
        return res.status(400).send({ error: "Invalid email or password." });

    const token = jwt.sign(
        { userId: userArray[0]._id, name: userArray[0].name, email, city: userArray[0].city, approved: userArray[0].approved },
        "jwtPrivateKey"
    );
    res.send(token);
}
);*/

module.exports = router;
