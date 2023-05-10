const express = require('express');

const postsRoute =  express.Router();

const Post = require('../model/post');

postsRoute.get('/getPosts',(req, res) => {

    const postId =  Number(req.query.id);
    let filter = {}
    // send only the post with matching id
    if(postId) {
        filter = {
            id: postId
        }
    }

    Post.find(filter).then(postData => {
        res.status(200).json({
            message: 'Fetched posts successfully!',
            data: postData
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Failed to fetch posts!',
            error: err
        });
    });
})

postsRoute.post('/createPost',(req, res) => {

    const socialMediaPost = req.body;

    const post = new Post({
        id: socialMediaPost.id,
        user: socialMediaPost.user,
        content: socialMediaPost.content
    })

    post.save().then((record) => {
        res.status(201).json({
            message: "record saved successfully!",
            data: record
        });
    }).catch(err => {
        res.status(500).json({
            message: "Failed to save!",
            data: err
        });
    });
})


postsRoute.delete('/deletePost/:id', (req, res) => {
    console.log(req.params.id);
    Post.deleteOne({id: req.params.id}).then(response => {
        res.json({
            message: "Record deleted successfully",
            data: response
        });
    }).catch(err => {
        res.status(500).json({
            message: "Failed to delete!",
            data: err
        });
    });
});

module.exports = postsRoute;