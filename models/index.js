// 'use strict';

// var fs        = require('fs');
// var path      = require('path');
// var Sequelize = require('sequelize');
// var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config/config')[env];
// var db        = {};

// //Create a Sequelize connection to the database using the URL in config/config.js
// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.url, config);
// }

// //Load all the models
// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(function(file) {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// //Export the db Object
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;















var thisComputer = process.env.LOGNAME;


var Sequelize = require('sequelize'),
	sequelize = new Sequelize( process.env.ROAMRR_DB_URL ||
		'postgres://'+thisComputer+'@localhost:5432/roamrr_models' ),
    bcrypt = require('bcryptjs');



	// sequelize = new Sequelize(process.env.DATABASE_URL||process.env||
	// 	'postgres://'+thisComputer+'@localhost:5432/roamrr_models'),
 //    bcrypt = require('bcryptjs');

//Export models and Sequelize for seed and dbSetup
module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;


var User 	= sequelize.import("./user.js");
var Event	= sequelize.import('./event-model.js');
var Trip	= sequelize.import('./trip-model.js');

Event.belongsTo(User);
User.hasMany(Event);

Trip.belongsTo(User);
User.hasMany(Event);

Event.belongsTo(Trip);
Trip.hasMany(Event);


module.exports.models = {
	sequelize :sequelize,
	User : User,
	Event : Event,
	Trip : Trip
};
