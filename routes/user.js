const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRoute =  express.Router();

const User = require('../model/user');

userRoute.post('/register',(req, res) => {

    const userData = req.body;
    // encrypting the password
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


userRoute.post('/login', (req, res) => {
    const userData = req.body;
    user.findOne({email: userData.email}).then(user => {
        if(user) {
            return bcrypt.compare(userData.password, user.password).then(authStatus => {
                if(authStatus) {
                    console.log(authStatus);
                    return jwt.sign(
                        {
                            email: user.email, 
                            id: user._id
                        }, 
                        '10x_academy_node_mastery',  // secret password-> store it securely somewhere
                        {
                        expiresIn: "1h"
                        }, (err, token) => {
                            if(err) {
                                return res.json({
                                    message: "Token creation failed"
                                });
                            }
                            return res.json({
                                message: "Authentication successful",
                                token: token
                            });
                        }
                    )
                }
                res.status(401).json({
                    message: "Authentication failed"
                });

            })
        }
        res.status(401).json({
            message: "Authentication failed"
        });
    }).catch(err => {
        res.send(err);
    })

})



module.exports = userRoute;