var sequelize = require('../models/index.js').sequelize;

// sequelize
// .sync({force: true}).then(function(err){
// 	if(err){console.log(err)};
// 	console.log('synced');
//   process.exit();
// });
var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	  email: 'stuff@gmail.com',
	  // email: { type: Sequelize.STRING, unique: true, lowercase: true },
	  password: '1234'
  });
};
var eventCreate = function() {
	return DB.Event.create({
  	name:'stuff Here',
  	image_url:'stuff Here',
  	display_address:'stuff Here',
  	display_phone:'stuff Here',
  	rating:'stuff Here',
  	snippet_text:'stuff Here'
  });
};

var tripCreate = function() {
	return DB.Trip.create({
	where: 'kernersville',
  	howLong: '7'
	    });
};
// name
// image_url
// display_address
// display_phone
// rating
// snippet_text

userCreate();
tripCreate();
eventCreate();

