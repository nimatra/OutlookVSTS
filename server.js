var path = require('path');
var https = require('https');
var express = require('express');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var fs = require('fs');
var config = require('./config/webpack.prod');
var authenticate = require('./routes/authenticate');
var DEBUG = require('./debug');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Routes

app.use('/authenticate', authenticate);
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.get('*', function(req,res){res.sendFile(__dirname+'/index.html');});


if(DEBUG == true){

  const options = {
    key: fs.readFileSync('secrets/key.pem'),
    cert: fs.readFileSync('secrets/cert.pem')
  };

  https.createServer(options, app).listen(port, function() {
    console.log('Listening at https://localhost:' + port);
  });
}
else{
  app.listen(port, "localhost", function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost:' + port);
  });
}
