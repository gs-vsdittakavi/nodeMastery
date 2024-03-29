const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
require('dotenv').config();

const postsRoute = require('./routes/post');
const usersRoute = require('./routes/user');


const mongoose = require('mongoose');

const app = express();

app.use(cors());

const port =  process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(`${process.env.MONGO_CLUSTER_NAME}${process.env.MONGO_PWD}${process.env.MONGO_CONNECTION_STRING}`)
.then((response) => {
    console.log("connected to mongod DB successfully!");
})
.catch(err => {
    console.log("connection to DB failed", err);
})

//localhost:3000/post/getPosts
app.use('/post', postsRoute);
app.use('/user', usersRoute);

app.use((req, res) => {
    res.send("welcome to our api");
})

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

module.exports = app;