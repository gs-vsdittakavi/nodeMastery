const jwt = require("jsonwebtoken");

//logic to validate the auth token
module.exports  = (req, res, next) => {
    try {
        console.log("auth middleware reached");
        const token = req.headers.authorization;
        console.log(token);
        // In actual projects, we dont use secrets like this in code directly
        //Instead, we store them in secure places like vaults and read it from there
        const verifiedToken = jwt.verify(token, '10x_academy_node_mastery'); 
        console.log(verifiedToken);
        next();
    } catch {
        res.json({
            message: 'Authentication failed'
        })
    }
}