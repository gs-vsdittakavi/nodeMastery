const express = require('express');

const postsRoute =  express.Router();


let posts = [
    {
        "id": 1,
        "user": "Bibek",
        "content": "10x is awesome!"
    },
    {
        "id": 2,
        "user": "Shubham",
        "content": "I am awesome!"
    },
    {
        "id": 3,
        "user": "Neeharika",
        "content": "India is awesome!"
    },
    {
        "id": 4,
        "user": "Shwetha",
        "content": "World is awesome!"
    }
]

postsRoute.get('/getPosts',(req, res) => {
    // res.send("express server running");
    console.log(req.path);
    // console.log(req.query.id);
    const id =  Number(req.query.id);
    
    // send only the post with matching id
    let queriedPost = posts;
    if(id) {
        queriedPost = [posts.find(post => {
            return post.id === id;
        })]
    }
    res.status(200).json({
        message: 'sent post successfully!',
        data: queriedPost
    });
})

postsRoute.post('/createPost',(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const socialMediaPost = req.body;
    console.log(req);
    posts.push(socialMediaPost);

    res.status(201).json({
        message: "record saved successfully!",
        data: socialMediaPost
    });
})

module.exports = postsRoute;