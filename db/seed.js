var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	  created:  11/11/11,
	  email: 'clay@gmail.com',
	  // email: { type: Sequelize.STRING, unique: true, lowercase: true },
	  password: '1234'
  });
};
var eventCreate = function() {
	return DB.Event.create({
	  created:  11/11/11,
	  email: 'clay@gmail.com',
	  // email: { type: Sequelize.STRING, unique: true, lowercase: true },
	  password: '1234'
  });
};
var tripCreate = function() {
	return DB.Trip.create({
	  created:  11/11/11,
	  email: 'clay@gmail.com',
	  // email: { type: Sequelize.STRING, unique: true, lowercase: true },
	  password: '1234'
  });
};



userCreate()
.then(function() {
	process.exit();
});
