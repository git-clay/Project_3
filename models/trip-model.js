console.log('trip model . js');
var sequelize	= require('./index.js');

module.exports = function(sequelize, Sequelize){
  // console.log('sequelized trip',sequelize);

var Trip = sequelize.define("trip",{
	where: Sequelize.STRING,
  howLong: Sequelize.STRING
	});

Trip.sync(function(){
  Trip.create({ where:'Dubai',howLong:'7' })
  .validate()
  .success(function(errors) {
    console.log(errors)
  })
})
	return Trip;

};

