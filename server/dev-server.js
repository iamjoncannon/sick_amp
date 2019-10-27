'use strict';
var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3001;
// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static middleware
app.use(express.static(path.join("../", __dirname, './public')));
app.get('*', function (req, res) {
    res.sendFile(path.join("../", __dirname, './public/index.html'));
}); // Send index.html for any other requests
// error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});
app.listen(PORT, function () { return console.log("serving on port " + PORT); });
