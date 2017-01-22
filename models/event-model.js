console.log('Event model . js');
var sequelize	= require('./index.js');

module.exports = function(sequelize, Sequelize){
  // console.log('sequelized Event',sequelize);

var Event = sequelize.define("event",{
  	name:Sequelize.STRING,
  	image_url:Sequelize.STRING,
  	display_address:Sequelize.STRING,
  	display_phone:Sequelize.STRING,
  	rating:Sequelize.STRING,
  	snippet_text:Sequelize.STRING
	});

Event.sync(function(){
  Event.create({ user_id:999999999999 })
  .validate()
  .success(function(errors) {
    console.log(errors)
  })
})
	return Event;

};

