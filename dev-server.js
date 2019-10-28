'use strict';
var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var PORT = process.env.PORT || 3000;
var dummyData = require('./id3');
// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static middleware
app.use(express.static(path.join(__dirname, './public')));
app.get('/track/:fileName', function (req, res, err) {
    var filePath = path.resolve(__dirname, './public/tunes', req.params.fileName);
    var stat = fs.statSync(filePath);
    // res.writeHead(200, {
    //   'Content-Type': 'audio/mpeg',
    //   'Content-Length': stat.size
    // });
    var readStream = fs.createReadStream(filePath);
    // attach this stream with response stream
    readStream.pipe(res);
});
// static data and error handling 
app.get("/data", function (req, res) {
    var returnJason = require('./id3');
    res.send(JSON.stringify(returnJason));
    res.end;
});
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
}); // Send index.html for any other requests
// error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});
app.listen(PORT, function () { return console.log("serving on port " + PORT); });
