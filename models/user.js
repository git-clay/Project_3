console.log('user model . js');
var    bcrypt = require('bcryptjs');

module.exports = function(sequelize, Sequelize){
console.log('sequelized user');

//might need to capitalize user
var User = sequelize.define('user',{
  email: { type: Sequelize.STRING, unique: true, lowercase: true },
  password: Sequelize.STRING,
  displayName: Sequelize.STRING,
  username: Sequelize.STRING,
  picture: Sequelize.STRING},{
  instanceMethods:{
  		generateHash:function(password){
  			return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
  		}, comparePassword: function(password,password2,done){
  			console.log(password);
  			console.log(password2);
  			bcrypt.compare(password2,password,function(err,isMatch){
  				console.log(err);
  				console.log(isMatch);
  			});
  		}
  }
});
User.sync(function(){
  User.create({ from: "foo@bar" })
  .validate()
  .success(function(errors) {
    console.log(errors)
  })
})
	return User;
};



