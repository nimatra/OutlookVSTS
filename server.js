var path = require('path');
var express = require('express');
var webpack = require('webpack');
var bodyParser = require('body-parser');
var config = require('./config/webpack.prod');
var authenticate = require('./routes/authenticate');
var vsts = require('./routes/vsts');
var dogfood = require('./routes/dogfood');

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

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/authenticate', authenticate);
app.use('/VSTSAuth', vsts);
app.use('/dogfoodAuth', dogfood);
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.get('*', function(req,res){res.sendFile(__dirname+'/index.html');});

app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
