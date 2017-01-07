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
var routes = require('./routes/routes.js');
app.use(routes,function(req,res,next){
	console.log('server routes')
 next();
});

/****************************************/
var db		= require('./models'),
	User 	= db.models.User;



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

app.get('/api/posts', function (req, res) {
  res.json([
  {
    title: "Hardcoded Title",
    content: "Here is some great hardcoded content for the body of a blog post. Happy coding!"
  },
  {
    title: "Another Post",
    content: "MEAN stack is the best stack."
  }
  ]);
});


/*
 * Auth Routes
 */

app.post('/auth/signup', function (req, res) {
	    console.log('POST auth/signup',req.body)
console.log('User: ',User,'database: ',db)
  // User.findOne({ email: req.body.email }, function (err, existingUser) {
    // if (existingUser) {
    //   return res.status(409).send({ message: 'Email is already taken.' });
    // }
    User.create(req.body)
    	.then(function(user){
    		if(!user) return error(res, "not saved");
    		res.json(user);
  		});

      // res.send({ token: auth.createJWT(result) });
    });
// });

app.post('/auth/login', function (req, res) {
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password.' });
      }
      res.send({ token: auth.createJWT(user) });
    });
  });
});







app.get(['/', '/signup', '/login', '/profile'], function (req, res) {
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

module.exports = app;	//for testing