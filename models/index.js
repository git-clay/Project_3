var thisComputer = process.env.LOGNAME;



var Sequelize = require('sequelize'),
    sequelize = new Sequelize(
        'postgres://'+thisComputer+'@localhost:5432/roamrr_models'),
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
	sequelize:sequelize,

	User : User,
	Event : Event,
	Trip : Trip
};
