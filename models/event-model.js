console.log('event model . js');

module.exports = function(sequelize, Sequelize){
console.log('sequelized event');

	var eventModel = sequelize.define('Event',{
	name: Sequelize.STRING,
	created:  Sequelize.DATE,
	address: Sequelize.STRING,
	phone: Sequelize.STRING,
	website:Sequelize.STRING,
	reviews:Sequelize.STRING,
	cost:Sequelize.STRING
	});

	return eventModel;

};

