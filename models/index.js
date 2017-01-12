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
//   .filter(function(file) {	//automatically finds models js files
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(function(file) { // imports the db model name
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) { //gives the db keys
//     db[modelName].associate(db);
//   }
// });

// //Export the db Object
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

/*    ^^es6 - might be best for heroku db^^   */



// init will help start db
// //import Sequelize from 'sequelize';
// import init from 'sequelize-init'
 
// let sequelize = new Sequelize('database', 'username', 'password');
// let db = init(sequelize, __dirname, {exclude: ['index.js']});
 
// export default db;

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err,client){
  if(err)throw err;
  console.log('connected to postgres! Getting schemas....');

  client
  .query('Select table_schema,table_name FROM information_schema.tables;')
  .on('row',function(row){
    console.log(JSON.stringify(row));
  });
});

var thisComputer = process.env.LOGNAME;  //username to insert into new Sequelize
var Sequelize = require('sequelize'),
	sequelize = new Sequelize( 
		'postgres://'+thisComputer+'@localhost:5432/roamrr_models' ),
    bcrypt = require('bcryptjs'); 


// sequelize.sync(); //if the tables dont match the models >> new table is created
// console.log(sequelize);

// sequelize = new Sequelize(process.env.DATABASE_URL||process.env||

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
	User : User,
	Event : Event,
	Trip : Trip
};
