const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // console.log(req);
    const parseUrl = url.parse(req.url, true);
    console.log(parseUrl.path);
    console.log(parseUrl.query);
    res.end("hello world! Im listening!");
});

server.listen(3000,()=>{
    console.log("server is listening");
});

