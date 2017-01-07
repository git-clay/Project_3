console.log('hit index.js in models');

var Sequelize = require('sequelize'),
	sequelize = new Sequelize('postgres://claybin@localhost:5432/roamrr_models'),
    bcrypt = require('bcryptjs');


//Export models and Sequelize for seed and dbSetup
module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;

var User = sequelize.import("./user");

module.exports.models = {
	User : User
};
