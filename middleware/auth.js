const { request } = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//logic to validate the auth token
module.exports  = (req, res, next) => {
    try {
        console.log("auth middleware reached");
        // Bearer eyjfjlhfjhslflhsfhshjfhs.jfhlhsjlfdhjflhdlhgd.fhjsfhgjskafkghjkdfjkgd
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        // In actual projects, we dont use secrets like this in code directly
        //Instead, we store them in secure places like vaults and read it from there
        const verifiedToken = jwt.verify(token, process.env.ENCRYPTION_SECRET); 
        console.log(verifiedToken);
        req.userId = verifiedToken.id;
        next();
    } catch {
        res.status(401).json({
            message: 'Authentication failed'
        })
    }
}

//         C
//        / \
// A ----/   \ -----B




//                          auth middleware   
//                         /               \
// matchingpath ----------/                 \---------- callback