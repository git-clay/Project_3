var   express		= require('express'),
      app			= express(),
	    bodyParser	= require('body-parser'),
	    auth 		= require('./controllers/auth.js'),
      Yelp = require('yelp');

// require and load dotenv
require('dotenv').load();
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*********************** Served up directories ******************************/
app.use(express.static(__dirname + '/public'));
app.set('views', '/views');



/*********************** ROUTES ******************************/
// var routes = require('./routes/routes.js');
// app.use(routes,function(req,res,next){
//  next();
// });
/****************************************/
app.get(['/', '/register', '/login', '/profile'], function (req, res) {
  console.log('app.get catch-all');
  res.sendFile(__dirname + '/public/views/index.html');

});


/*********************** Yelp request function ******************************/

var yelp = new Yelp({
  consumer_key: '5eu-uFPxtc1RtmeJCAlmUQ',
  consumer_secret: 'ZwJB35PXcr0_oPYt2-l-XDCd6TE',
  token: 'INavbmqjPrFTdqM3i5ZTNkjyfeInIWfl',
  token_secret: 'pGqF4hywcR8_4HFGn05hZbxYKrU',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Montreal' })
.then(function (data) {
  console.log(data.businesses[0].location.display_address);
  console.log(data.businesses[0])
})
.catch(function (err) {
  console.error(err);
});





/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});