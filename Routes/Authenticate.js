var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var tedious = require('tedious');
var DEBUG = require('../debug');

var router = express.Router({ mergeParams: true });
module.exports = router;

var clientSecret = "";
getClientSecret = function () {
  if (clientSecret === "") {
    if (DEBUG == true) {
      var secretFile = require('../secrets/clientSecret');
      clientSecret = JSON.stringify(secretFile);
    }
    else {
      clientSecret = process.env.ClientSecretJson;
    }
  }
  return clientSecret;
};

var dbConfig = "";
getDbConfig = function () {
  if (dbConfig === "") {
    if (DEBUG == true) {
      var dbFile = require('../secrets/dbConfig.js')
      dbConfig = JSON.stringify(dbFile);
    }
    else {
      dbConfig = process.env.dbConfigJson;
    }
  }
  return dbConfig;
}

router.db = function (req, res) {
 var config = JSON.parse(getDbConfig());
  var connection = new tedious.Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err);
      return;
    }
    getToken(req.query.user);
  });

  var TYPES = tedious.TYPES;

  function getToken(user) {
    var output = {success: false, token : ''}
    var request = new tedious.Request("SELECT TOP 1 x.Token, x.Expiry, x.Refresh FROM dbo.Users AS x WHERE Id=@User", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('User', TYPES.VarChar, user);
    request.on('row', function(columns){
      columns.forEach(function (column) {
        if(column.metadata.colName === 'Token'){
          output.token = column.value;
          output.success = true;
          console.log(JSON.stringify(output));
          res.send(JSON.stringify(output));
        }
      })
    });
    request.on('done', function (rowCount, more) {
          res.send(JSON.stringify(output));
    });
    connection.execSql(request);
  }
};
router.use('/db', router.db);

/**
 * Auth Callback - Redirects to the Calendar Page
 * @param req request object from the google oauth callback
 * @param res response object from the google oauth callback
 */
router.callback = function (req, res) {

  // Authorize a client with the loaded credentials, then call the
  // Google Calendar API.
  router.credentials = JSON.parse(clientSecret);
  router.code = req.query.code;
  router.Exchange(req.query.state, res);

};
router.use('/callback', router.callback);


/**
 * Authentication call - redirects to google login page
 * @param req request object from the get call to /authenticate
 * @param res response object from the get call to /authenticate
 */
router.authorize = function (req, res) {

  router.credentials = JSON.parse(getClientSecret());

  var authParams = querystring.stringify({
    redirect_uri: router.credentials.web.redirect_uris[0],
    response_type: 'Assertion',
    client_id: router.credentials.web.client_id,
    scope: 'vso.work_write',
    approval_prompt: 'force',
    state: req.query.user
  });
  var authBaseUrl = router.credentials.web.auth_uri;
  var url = authBaseUrl + '?' + authParams.toString();
  res.redirect(url);

};
router.use('/', router.authorize);

/**
 * Makes a http POST call to exchange the given code from the first call and get the token
 * @param res - response object, it is used saved here to be used in the callback
 */
router.Exchange = function (state, res) {

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
  var httpPost = https.request(options, function (response) {
    exchangeApiCallback(state, response);
  });
  httpPost.write(data);
  httpPost.end();
  res.redirect("../done");
};

/**
 * callback of the get token call - redirects to /calendars
 * @param response - callback response
 */
function exchangeApiCallback(state, response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    exchanges = JSON.parse(str);
    console.log(exchanges.access_token.length);
    saveToken(state, exchanges);
  });
}

function saveToken(id, data) {
  var config = JSON.parse(getDbConfig());
  var connection = new tedious.Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err);
      return;
    }
    addToken(id, data);
  });

  var TYPES = tedious.TYPES;

  function addToken(id, data) {
    var request = new tedious.Request("INSERT INTO dbo.Users(Id, Token, Expiry, Refresh) VALUES (@Id, @Token, DATEADD(ss, @Expiry, GETDATE()),  @Refresh);", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('Id', TYPES.VarChar, id);
    request.addParameter('Token', TYPES.VarChar, data.access_token);
    request.addParameter('Expiry', TYPES.Int, data.expires_in);
    request.addParameter('Refresh', TYPES.VarChar, data.refresh_token);
    connection.execSql(request);
  }
}