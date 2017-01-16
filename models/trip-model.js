console.log('trip model . js');
var sequelize	= require('./index.js');

module.exports = function(sequelize, Sequelize){
  // console.log('sequelized trip',sequelize);

var Trip = sequelize.define("trip",{
	user_id: Sequelize.STRING,
  	name:Sequelize.STRING,
  	image_url:Sequelize.STRING,
  	display_address:Sequelize.STRING,
  	display_phone:Sequelize.STRING,
  	rating:Sequelize.STRING,
  	snippet_text:Sequelize.STRING
	});

Trip.sync(function(){
  Trip.create({ user_id:999999999999 })
  .validate()
  .success(function(errors) {
    console.log(errors)
  })
})
	return Trip;

};

