
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	auth = require('./controllers/auth.js'),
	Yelp = require('yelp'),
	bcrypt = require('bcryptjs'),
	cities = require('cities');

require('dotenv').load();// require and load dotenv
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

/*********************** Served up directories ******************************/
app.use(express.static(__dirname + '/public'));
app.set('views', '/views');

/*********************** ROUTES ******************************/
var routes = require('./routes/routes.js');
app.use(routes, function(req, res, next) {
	console.log('server routes')
	next();
});
/**************** DATABASE ************************/

/**************** DB ************************/
var db = require('./models'),
	User = db.models.User;

/*
 * API Routes
 */

app.get('/api/me', auth.ensureAuthenticated, function(req, res) {
	console.log('api/me')
	User.findById(req.user, function(err, user) {
		res.send(user.populate('posts'));
	});
});

app.put('/api/me', auth.ensureAuthenticated, function(req, res) {
	console.log('api/me "put"')
	User.findById(req.user, function(err, user) {
		if (!user) {
			return res.status(400).send({
				message: 'User not found.'
			});
		}
		user.displayName = req.body.displayName || user.displayName;
		user.username = req.body.username || user.username;
		user.email = req.body.email || user.email;
		user.save(function(err) {
			res.send(user);
		});
	});
});

var yelp = new Yelp({
	consumer_key: '5eu-uFPxtc1RtmeJCAlmUQ',
	consumer_secret: 'ZwJB35PXcr0_oPYt2-l-XDCd6TE',
	token: 'INavbmqjPrFTdqM3i5ZTNkjyfeInIWfl',
	token_secret: 'pGqF4hywcR8_4HFGn05hZbxYKrU',
});


var city;

app.post('/api/post', function (req, res) {
  console.log(req.body.lat, req.body.lng);
  var latReal = req.body.lat;
  var lngReal = req.body.lng;
  var city = cities.gps_lookup(latReal, lngReal).city;
  yelpgo(city);
  return city;
});


function yelpgo(city){
	yelp.search({
		term: 'food',
		location: city
	})
	.then(function(data) {
		console.log(data.businesses)
	})
	.catch(function(err) {
		// console.error(err);
	});


app.post('/auth/signup', function (req, res) {
	    console.log('POST auth/signup',req.body)
  // User.findOne({ email: req.body.email }, function (err, existingUser) {
    // if (existingUser) {
    //   return res.status(409).send({ message: 'Email is already taken.' });
    // }
    User.create(req.body)
    	.then(function(user){
    		if(!user) return error(res, "not saved");
    		console.log(user.dataValues)

    		res.json(user.dataValues);
  		});

      // res.send({ token: auth.createJWT(result) });
    });

	console.log(city+ "you did it boss");
}


// });

// See http://www.yelp.com/developers/documentation/v2/search_api



/*
 * Auth Routes
 */
// app.get('/users')
app.post('/auth/signup', function(req, res) {
	console.log('POST auth/signup password', req.body.email);
		bcrypt.genSalt(10, function (err, salt) {
	    bcrypt.hash(req.body.password, salt, function (err, hash) {
	      req.body.password = hash;
	        console.log('hashed',req.body.password);
		  	console.log(req.body.password);
	
	User.create(req.body)
		.then(function(user) {
			if (!user) return error(res, "not saved");
			console.log(user.dataValues);
			auth.createJWT(user);

			res.send({
				token: auth.createJWT(user),
				user: user
			});
		});
			  });
		 });



});
app.post('/auth/login', function(req, res) {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(function(user) {
		var compare = 'user.$modelOptions.instanceMethods.comparePassword'

		if (!user) {
			return res.status(401).send({
				message: 'Invalid email or password.'
			});
		}
		var p1 = user.dataValues.password,
			p2 = req.body.password;
		// user.$modelOptions.instanceMethods.comparePassword(p1,p2);

		validPassword = function() {
			console.log('stored from db: ', user.dataValues.password)
			console.log('password from login form: ', req.body.password)
			bcrypt.compare(req.body.password, user.dataValues.password, function(err, isMatch) {
				console.log(isMatch)
				if (isMatch === true) {
					res.send({
						token: auth.createJWT(user)
					});
				}
			});
		};
		validPassword();
	});
});




app.get(['/'], function(req, res) {	// one page app -- angular appends to index.html using ui-view
	res.sendFile(__dirname + '/public/views/index.html');
});


/*********************** Yelp request function ******************************/


// cities.gps_lookup(lat, lng);
// var city = cities.gps_lookup(lat, lng).city;
// console.log(city);





/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});

module.exports = app; //for testing