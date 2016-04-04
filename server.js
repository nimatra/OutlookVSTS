var path = require('path');
var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authenticate = require('./routes/authenticate');
var vsts = require('./routes/vsts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes

var authRouter = express.Router({mergeParams: true});
var vstsRouter = express.Router({mergeParams: true});

// [START]
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use('/authenticate', authRouter);
authRouter.use('/callback', authenticate.callback);
authRouter.use('/', authenticate.authorize);
app.use('/VSTS', vstsRouter);
// vstsRouter.use('/', vsts.listItems);
// [END]

// [START server]
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function () {
  console.log('App listening at http://%s', server);
  console.log("Press Ctrl+C to quit.");
});
// [END server]

// [START Webpack]
// var compiler = webpack(config);

// var server = new WebpackDevServer(compiler, {
//     hot: true,
//     // display no info to console (only warnings and errors)
//     noInfo: false,
//     publicPath: config.output.publicPath,
//     stats: {
//       // With console colors
//       colors: true,
//       // add the hash of the compilation
//       hash: true,
//       // add webpack version information
//       version: false,
//       // add timing information
//       timings: true,
//       // add assets information
//       assets: false,
//       // add chunk information
//       chunks: false,
//       // add built modules information to chunk information
//       chunkModules: false,
//       // add built modules information
//       modules: false,
//       // add also information about cached (not built) modules
//       cached: false,
//       // add information about the reasons why modules are included
//       reasons: false,
//       // add the source code of modules
//       source: false,
//       // add details to errors (like resolving log)
//       errorDetails: true,
//       // add the origins of chunks and chunk merging info
//       chunkOrigins: false,
//       // Add messages from child loaders
//       children: false
//     }
// });

// server.listen(3333, 'localhost', function (err) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("Listening at http://localhost:3333. Please wait, I'm building things for you...");
// });
// [END Webpack]