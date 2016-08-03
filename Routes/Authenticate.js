var express = require('express');
var fs = require('fs');
var https = require('https');
var querystring = require('querystring');
var tedious = require('tedious');
var DEBUG = require('../debug');
var TYPES = tedious.TYPES;

var REFRESH_MINIMUM = 60;

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

var table = DEBUG ? 'dbo.TestUsers' : 'dbo.Users'

router.getToken = function (user, callback) {
  var config = JSON.parse(getDbConfig());
  var connection = new tedious.Connection(config);
  connection.on('connect', function (err) {
    if (err) {
      console.log(err);
      return;
    }
    var request = new tedious.Request("SELECT TOP 1 x.Token, x.Expiry, x.Refresh FROM " + table + " AS x WHERE Id=@User", function (err, rowcount, rows) {
      if (err) {
        callback({ success: false, error: err });
      }
      if (rows == null || rowcount == 0) {
        callback({ success: false });
      }
      else {
        var row = rows[0]; //There should only be 1 row

        var data = {
          token: row[0].value,
          expiry: Date.parse(row[1].value),
          refresh: row[2].value
        };
        callback({ success: true, data: data })
      }
    });
    request.addParameter('User', TYPES.VarChar, user);
    connection.execSql(request);
  });
}

router.db = function (req, res) {
  router.getToken(req.query.user, (response) => {
    if (response.success) { // recieved row
      var data = response.data;
      var expiryLimit = new Date();
      expiryLimit.setMinutes(expiryLimit.getMinutes() + REFRESH_MINIMUM);
      if (data.expiry > expiryLimit) { // if the token doesn't expire before our limit
        res.send("success");
      }
      else {
        data.user = req.query.user;
        router.refreshToken(data, res);
      }
    }
    else {
      res.send("failure");
    }
  });
};
router.use('/db', router.db);

router.callback = function (req, res) {

  var secrets = JSON.parse(getClientSecret());
  var data = querystring.stringify({
    assertion: req.query.code,
    client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    client_id: secrets.web.client_id.toString(),
    client_assertion: secrets.web.client_secret.toString(),
    redirect_uri: secrets.web.redirect_uris[0]
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
      saveToken(req.query.state, exchanges);
    });
  });
  httpPost.write(data);
  httpPost.end();
  res.redirect("../done");

};
router.use('/callback', router.callback);


router.authorize = function (req, res) {

  router.credentials = JSON.parse(getClientSecret());

  var authParams = {
    redirect_uri: router.credentials.web.redirect_uris[0],
    response_type: 'Assertion',
    client_id: router.credentials.web.client_id,
    scope: 'vso.agentpools_manage vso.build_execute vso.chat_manage vso.code_manage vso.code_status vso.dashboards vso.dashboards_manage vso.entitlements vso.extension.data_write vso.extension_manage vso.gallery_acquire vso.gallery_manage vso.identity vso.loadtest_write vso.packaging_manage vso.profile_write vso.project_manage vso.release_manage vso.test_write vso.work_write',
    approval_prompt: 'force',
    state: req.query.user
  };
  var authBaseUrl = router.credentials.web.auth_uri;
  var url = authBaseUrl + '?' + querystring.stringify(authParams).toString();
  res.redirect(url);

};
router.use('/', router.authorize);

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
    saveToDB(id, data);
  });

  function saveToDB(id, data) {
    var request = new tedious.Request("INSERT INTO " + table + "(Id, Token, Expiry, Refresh) VALUES (@Id, @Token, DATEADD(ss, @Expiry, GETDATE()),  @Refresh);", function (err) {
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
    saveToDB(state.user, data);
  });

  var TYPES = tedious.TYPES;

  function saveToDB(id, data) {
    var request = new tedious.Request("UPDATE " + table + " SET Token=@Token, Expiry=DATEADD(ss, @Expiry, GETDATE()), Refresh=@Refresh WHERE Id=@Id;", function (err) {
      if (err) {
        console.log(err);
      }
    });
    request.addParameter('Id', TYPES.VarChar, id);
    request.addParameter('Token', TYPES.VarChar, data.access_token);
    request.addParameter('Expiry', TYPES.Int, data.expires_in);
    request.addParameter('Refresh', TYPES.VarChar, data.refresh_token);
    res.send("success");
    connection.execSql(request);
  }
}