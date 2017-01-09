var   express		= require('express'),
      app			= express(),

	    bodyParser	= require('body-parser'),
	    auth 		= require('./controllers/auth.js'),
      Yelp = require('yelp'),
      bcrypt 		= require('bcryptjs'),
      cities = require('cities');
      // jQuery = require('jQuery'),
      // jsdom = require('jsdom');

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
	console.log('server routes')
 next();
});

/****************************************/
var db		= require('./models'),
	User 	= db.models.User;


/***************Importing the lat and long variables from front.js*****************/
// var myModule = require('./public/js/front.js');  
// var lat = myModule.lat;

// console.log(lat);



/*
 * API Routes
 */

app.get('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    res.send(user.populate('posts'));
  });
});

app.put('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found.' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.send(user);
    });
  });
});

app.post('/api/post', function (req, res) {
  console.log(req.body.lat, req.body.lng);
  var latReal = req.body.lat;
  var lngReal = req.body.lng;
  var city = cities.gps_lookup(latReal, lngReal).city;
  console.log(city);
  return city
});



/*
 * Auth Routes
 */
// app.get('/users')
app.post('/auth/signup', function (req, res) {
	    console.log('POST auth/signup password',req.body.email);
	     // encrypt password
	  // bcrypt.genSalt(10, function (err, salt) {
	    // bcrypt.hash(req.body.password, salt, function (err, hash) {
	    //   req.body.password = hash;
	    //     console.log('hashed',req.body.password);
		  	// console.log(req.body.password);
   		//  });


	        User.create(req.body)
		    	.then(function(user){
		    		if(!user) return error(res, "not saved");
		    		console.log(user.dataValues);
		    		auth.createJWT(user);

	      			res.send({ token: auth.createJWT(user),user:user });
      			});
 //  User.findOne({ 
 //  	where: {email: req.body.email }})
 //  	.spread(function (user,created) {
 //  		console.log(user.get({
 //  			plain:true
 //  		}))
 //  		console.log('created: ',created)
 //    if (created ===false) {
 //    	console.log('FAAAAAIIIIILLLL')
 //      return res.status(409).send({ message: 'Email is already taken.' });
 //    } else {


	});
  // });
app.post('/auth/login', function (req, res) {
	// bcrypt.genSalt(10, function (err, salt) {
	//     bcrypt.hash(req.body.password, salt, function (err, hash) {
	//       req.body.password = hash;
	//         console.log('hashed',req.body.password);
	// 	  	console.log(req.body.password);
	// 	  });
	// 	 });
  User.findOne({where:{ email: req.body.email }}).then (function (user) {
var compare = 'user.$modelOptions.instanceMethods.comparePassword'

    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

//     comparePassword = function (password, done) {
// 		console.log('stored from db: ',user.dataValues.password)
// 		console.log('password from login form: ',req.body.password)
// 		return  bcrypt.compare(password, this.password, function (err, isMatch) {
//     done(err, isMatch);
//   });
// };
// comparePassword();
var p1=user.dataValues.password,
	p2=req.body.password;
	// user.$modelOptions.instanceMethods.comparePassword(p1,p2);


validPassword = function(){
	console.log('stored from db: ',user.dataValues.password)
console.log('password from login form: ',req.body.password)
	bcrypt.compare( req.body.password,user.dataValues.password,function(err,isMatch){
		console.log(isMatch)
		if(isMatch===true){
			res.send({ token: auth.createJWT(user) });
		}
	});
};
validPassword();

  });
});







app.get(['/', '/signup', '/login', '/profile','/logout'], function (req, res) {
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
  // console.log(data.businesses[0].location.display_address);
  // console.log(data.businesses[0])
})
.catch(function (err) {
  // console.error(err);
});


// cities.gps_lookup(lat, lng);
// var city = cities.gps_lookup(lat, lng).city;
// console.log(city);





/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});

module.exports = app;	//for testing