var mbaasApi = require('fh-mbaas-api');
var express = require('express');
var mbaasExpress = mbaasApi.mbaasExpress();
var cors = require('cors');
var bodyParser = require('body-parser');
var methodOverride  = require('method-override');

var blogService = require('./lib/articles');

// list the endpoints which you want to make securable here
var securableEndpoints;
// securableEndpoints = ['/articles'];

var app = express();

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT

// Enable CORS for all requests
app.use(cors());

// Note: the order which we add middleware to Express here is important!
app.use('/sys', mbaasExpress.sys(securableEndpoints));
app.use('/mbaas', mbaasExpress.mbaas);

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// Note: important that this is added just before your own Routes
app.use(mbaasExpress.fhmiddleware());

app.use('/box/srv/1.1/app/init', function(req, res){
  res.json({
    hosts: {url: 'http://localhost:8001'}
  });
});

app.get('/articles', blogService.findAll);
app.get('/articles/searchid/:id', blogService.findById);
app.get('/articles/searchuser/:user', blogService.findByUser)
app.post('/articles', blogService.newPost);

// Important that this is last!
app.use(mbaasExpress.errorHandler());

var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var server = app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port); 
});
