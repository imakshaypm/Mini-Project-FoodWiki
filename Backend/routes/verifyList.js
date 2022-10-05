const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

var conn = mongoose.connection;
conn.on('connected', function () {
    console.log('database is connected successfully');
});
conn.on('disconnected', function () {
    console.log('database is disconnected successfully');
})

const ObjectId = mongoose.Types.ObjectId

router.post("/", (req, res) => {
    const ListID = req.body.ListId;
    const swipeDirection = req.body.SwipeDirection

    if (swipeDirection == 'delete'){
        conn.db.collection("restaurants", function (err, collection) { //To update the popularity by One.
            collection.findOneAndDelete(
                { _id: ObjectId(ListID) },
                function (err, response) {
                   console.log(response)
                });
        })
    }

    if(swipeDirection == 'left'){
        conn.db.collection("restaurants", function (err, collection) { //To update the popularity by One.
            collection.findOneAndUpdate(
                { _id: ObjectId(ListID) },
                { $inc: { "popularity": 1 } },
                function (err, response) {
                    console.log(response)
                });
        })
        const userID = req.body.userID;
        console.log(userID)
        //console.log(ObjectId(userID.userID))
        conn.db.collection("users", function (err, collection) {  //To push the listID to the corresponding users query.
            collection.updateOne(
                { _id: ObjectId(userID) },
                {
                    $push: { approved: ListID.toString() }
                })
        })
    }
    if(swipeDirection == "right"){
        const userID = req.body.userID;
        console.log(userID)
        //console.log(ObjectId(userID.userID))
        conn.db.collection("users", function (err, collection) {  //To push the listID to the corresponding users query.
            collection.updateOne(
                { _id: ObjectId(userID) },
                {
                    $push: { approved: ListID.toString() }
                })
        })
    }
});


module.exports = router;
