console.log('trip model . js');

module.exports = function(sequelize, Sequelize){
  console.log('sequelized trip');

	var tripModel = sequelize.define('Trip',{
	  created:  Sequelize.DATE,
	  email: { type: Sequelize.STRING, unique: true, lowercase: true },
	
	});


	return tripModel;

};

