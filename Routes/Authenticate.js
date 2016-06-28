var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var tedious = require('tedious');
var DEBUG = require('../debug');

var REFRESH_MINIMUM = 60; //

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
    var output = { success: false, token: '' }
    var request = new tedious.Request("SELECT TOP 1 x.Token, x.Expiry, x.Refresh FROM dbo.Users AS x WHERE Id=@User", function (err, rowcount, rows) {
      if (err) {
        console.log(err);
      }
      if(rowcount == 0){
        res.send(JSON.stringify(output));
      }
      else {
        var row = rows[0]; //There should only be 1 row

        var data = {
          token: row[0].value,
          expiry: Date.parse(row[1].value),
          refresh: row[2].value
        };
        var expiryLimit = new Date();
        expiryLimit.setMinutes(expiryLimit.getMinutes() + REFRESH_MINIMUM);
        if (data.expiry > expiryLimit) { // if the token doesn't expire before our limit
          output.token = data.token;
          output.success = true;
          res.send(JSON.stringify(output));
        }
        else {
          data.user = user;
          router.refreshToken(data, res);
        }
      }
    });
    request.addParameter('User', TYPES.VarChar, user);
    connection.execSql(request);
  }
};
router.use('/db', router.db);

router.callback = function (req, res) {

  router.credentials = JSON.parse(clientSecret);
  router.code = req.query.code;
  router.getToken(req.query.state, res);

};
router.use('/callback', router.callback);


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

router.getToken = function (state, res) {

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
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      exchanges = JSON.parse(str);
      saveToken(state, exchanges);
    });
  });
  httpPost.write(data);
  httpPost.end();
  res.redirect("../done");
};


router.refreshToken = function (state, res) {

  router.credentials = JSON.parse(getClientSecret());
  var data = querystring.stringify({
    assertion: state.refresh,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    grant_type: "refresh_token",
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
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      exchanges = JSON.parse(str);
      updateToken(state, exchanges, res);
    });
  });
  httpPost.write(data);
  httpPost.end();
};


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

function updateToken(state, data, res) {
  var config = JSON.parse(getDbConfig());
  var connection = new tedious.Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err);
      return;
    }
    updateToken(state.user, data);
  });

  var TYPES = tedious.TYPES;

  function updateToken(id, data) {
    var request = new tedious.Request("UPDATE dbo.Users SET Token=@Token, Expiry=DATEADD(ss, @Expiry, GETDATE()), Refresh=@Refresh WHERE Id=@Id;", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('Id', TYPES.VarChar, id);
    request.addParameter('Token', TYPES.VarChar, data.access_token);
    request.addParameter('Expiry', TYPES.Int, data.expires_in);
    request.addParameter('Refresh', TYPES.VarChar, data.refresh_token);
    res.send(JSON.stringify({success:true, token:data.access_token}));
    connection.execSql(request);
  }
}