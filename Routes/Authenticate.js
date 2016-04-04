var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');


var router = express.Router();
module.exports = router;


/**
 * Auth Callback - Redirects to the Calendar Page
 * @param req request object from the google oauth callback
 * @param res response object from the google oauth callback
 */
router.callback = function (req, res) {
  fs.readFile(__dirname + '/../client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    router.credentials = JSON.parse(content);
    router.code = req.query.code;
    router.Exchange(res);
  });
};


/**
 * Authentication call - redirects to google login page
 * @param req request object from the get call to /authenticate
 * @param res response object from the get call to /authenticate
 */
router.authorize = function (req, res) {

  fs.readFile(__dirname + '/../client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    router.credentials = JSON.parse(content);

    var authParams = querystring.stringify({
      redirect_uri: router.credentials.web.redirect_uris[0],
      response_type: 'Assertion',
      client_id: router.credentials.web.client_id,
      scope: 'vso.work_write',
      approval_prompt: 'force'
    });
    var authBaseUrl = router.credentials.web.auth_uri;
    var url = authBaseUrl + '?' + authParams.toString();
    res.redirect(url);

  });
};

/**
 * Makes a http POST call to exchange the given code from the first call and get the token
 * @param res - response object, it is used saved here to be used in the callback
 */
router.Exchange = function (res) {

  var data = querystring.stringify({
    assertion: router.code,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    client_id: router.credentials.web.client_id.toString(),
    client_assertion: router.credentials.web.client_secret.toString(),
    redirect_uri: router.credentials.web.redirect_uris[0]
  });
  var options = {
    host: 'app.vssps.visualstudio.com',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  };
  router.res = res;
  var httpPost = https.request(options, exchangeApiCallback);
  httpPost.write(data);
  httpPost.end();
};

/**
 * callback of the get token call - redirects to /calendars
 * @param response - callback response
 */
function exchangeApiCallback(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    exchanges = JSON.parse(str);
    router.AccessToken = exchanges.access_token;
    router.res.redirect("../calendars?accessToken=" + router.AccessToken);
    // router.res.render('callback', {title: str});

  });
}
