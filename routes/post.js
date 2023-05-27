const express = require('express');

const postsRoute =  express.Router();

const Post = require('../model/post');

const authMiddleware =  require('../middleware/auth');

postsRoute.get('/getPosts', (req, res) => {
    //PAGINATION
    //http://localhost:3000/post/getPosts/?pageNumber=1&recordsPerPage=10; for page 1
    //http://localhost:3000/post/getPosts/?pageNumber=2&recordsPerPage=10; for page 2

    const pageNo = Number(req.query.pageNumber);
    const recordsCount = Number(req.query.recordsPerPage);

    const postId =  Number(req.query.id);
    let filter = {}
    // send only the post with matching id
    if(postId) {
        filter = {
            id: postId
        }
    }
    let postRequest = Post.find(filter);

    if( !postId && (pageNo  && recordsCount)) {

        postRequest
        .skip(recordsCount * pageNo-1) // for page 2 records (10*(2-1)) = 10
        .limit(recordsCount);
    }

    postRequest.then(postData => {
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

postsRoute.post('/createPost', authMiddleware, (req, res) => {

    const socialMediaPost = req.body;

    const post = new Post({
        title: socialMediaPost.title,
        content: socialMediaPost.content,
        author: req.userId
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

postsRoute.put('/updatePost/:postId', authMiddleware, (req, res) => {
    const postId = req.params.postId; // Get the post ID from the request URL
    const updatedPostData = req.body; // Get the updated post data from the request body
    
    Post.findOneAndUpdate({
        _id: postId,
        author: req.userId
    }, updatedPostData)
        .then(updatedPost => {
            console.log(updatedPost);
        if (!updatedPost) {
            // If the post doesn't exist, send a 404 response
            return res.status(404).json({
            message: "Post not found."
            });
        }
        
        // If the post is updated successfully, send a success response with the updated post
        res.status(200).json({
            message: "Post updated successfully!",
            data: updatedPost
        });
        })
        .catch(err => {
        // If there's an error while updating the post, send an error response
        res.status(500).json({
            message: "Failed to update post.",
            data: err
        });
        });
});


postsRoute.delete('/deletePost/:id', authMiddleware, (req, res) => {
    console.log(req.params.id);
    Post.deleteOne({_id: req.params.id, author: req.userId}).then(response => {
        res.status(200).json({
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


// postsRoute.post('/admin', authMiddleware, adminMiddleWare, (req, res, next) => {
// //
// })

module.exports = postsRoute;