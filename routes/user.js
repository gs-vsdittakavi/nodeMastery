const express = require('express');
const bcrypt = require('bcrypt');

const userRoute =  express.Router();

const User = require('../model/user');

userRoute.post('/register',(req, res) => {

    const userData = req.body;

    bcrypt.hash(userData.password, 10)
    .then((encryptedPassword) => {
        const user = new User({
            email: userData.email,
            name: userData.name,
            password: encryptedPassword
        })
        user.save().then((userData) => {
            res.status(201).json({
                message: "User registered successfully!",
                data: userData
            });
        }).catch(err => {
            res.status(500).json({
                message: "Failed to create user!",
                error: err
            });
        });
    }).catch(err => {
        console.log("error while encrypting", err);
    })
})



module.exports = userRoute;