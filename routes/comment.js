// comments section

app.get('/comments',(req, res) => {
    
    // get all the commebts from database

    res.status(200).json({
        message: 'sent post successfully!',
        data: comments
    });
})

app.post('/createComment',(req, res) => {
    // save the comments to DB

    res.status(201).json({
        message: "record saved successfully!",
        data: socialMediaPost
    });
})