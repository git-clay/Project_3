var sequelize = require('../models/index.js').sequelize;

sequelize
.sync({force: true}).then(function(err){
	if(err){console.log(err)};
	console.log('synced');
  process.exit();
});
var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	  email: 'stuff@gmail.com',
	  // email: { type: Sequelize.STRING, unique: true, lowercase: true },
	  password: '1234'
  });
};
// var eventCreate = function() {
// 	return DB.Event.create({
// 	  created:  11/11/11,
// 	  email: 'clay@gmail.com',
// 	  // email: { type: Sequelize.STRING, unique: true, lowercase: true },
// 	  password: '1234'
//   });
// };
var tripCreate = function() {
	return DB.Trip.create({
	  'user_id':'12342352',
	  	'name':'PizzaShop',
	  	'image_url':'www.fakeurl.com',
	  	'display_address':'123 street st',
	  	'display_phone':'555-666-3332',
	  	'rating': '1000',
	  	'snippet_text':'blah blah blah'
	    });
};
// name
// image_url
// display_address
// display_phone
// rating
// snippet_text
tripCreate();
userCreate()
.then(function() {

	console.log('seed stuff')
	process.exit();
});
