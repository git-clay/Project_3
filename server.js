var   express		= require('express'),
      app			= express(),
	    bodyParser	= require('body-parser'),
	    auth 		= require('./controllers/auth.js');

// require and load dotenv
require('dotenv').load();
// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*********************** Served up directories ******************************/
app.use(express.static('public'));
app.use(function(req, res){
   res.sendFile(__dirname + '/public/views/index.html');
});


// app.get('/', function homepage(req, res){
// 	res.sendFile(__dirname + '/public/views/index.html');
// });

/*********************** User auth ******************************/
// require User and Post models
var User = require('./models/user');


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

app.post('/auth/register', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken.' });
    }
    var user = new User({
      displayName: req.body.displayName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: auth.createJWT(result) });
    });
  });
});

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


/*
 * Catch All Route
 */
app.get(['/', '/register', '/login', '/profile'], function (req, res) {
  res.render('index');
});





/*********************** ROUTES ******************************/
var routes = require('./routes/routes.js');
app.use(routes,function(req,res,next){
	next();
});

/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});