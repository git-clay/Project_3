var   express		= require('express'),
      app			= express(),
	    bodyParser	= require('body-parser');
	    // auth 		= require('./controllers/auth.js');

// require and load dotenv
require('dotenv').load();
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*********************** Served up directories ******************************/
app.use(express.static(__dirname + '/public'));
app.set('views', '/views');

/*********************** ROUTES ******************************/
var routes = require('./routes/routes.js');
app.use(routes,function(req,res,next){
 next();
});
/****************************************/
app.get(['/', '/register', '/login', '/profile'], function (req, res) {
  console.log('app.get catch-all');
  res.sendFile(__dirname + '/public/views/index.html');

});













/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});