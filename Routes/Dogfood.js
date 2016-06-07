var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');

var router = express.Router({ mergeParams: true });
module.exports = router;

router.entryPoint = function (req, res) {
    if(typeof req.query.accessToken === "undefined")
    {
        res.redirect("../authenticate?redirect=dogfood");
    }
    else
    {
        res.sendFile(__dirname + '/../dogfood/index.html');
    }
};
router.use('/', router.entryPoint);