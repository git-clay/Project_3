console.log('event model . js');

module.exports = function(sequelize, Sequelize){
console.log('sequelized event');

	var eventModel = sequelize.define('Event',{
	  created:  Sequelize.DATE,
	  email: { type: Sequelize.STRING, unique: true, lowercase: true },

	});

	return eventModel;

};

