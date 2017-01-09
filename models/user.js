console.log('user model . js');
var    bcrypt = require('bcryptjs');

module.exports = function(sequelize, Sequelize){
console.log('sequelized user');

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
  				console.log(err)
  				console.log(isMatch)
  			});
  		}
  }
});

// model.pre('save', function (next) {
//   // set created and updated
//   now = new Date();
//   this.updated = now;
//   if (!this.created) {
//     this.created = now;
//   }
//  bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       user.password = hash;
//       next();
//     });
//   });
// });

// model.comparePassword = function (password, done) {
// 	console.log(password)
// return  bcrypt.compare(password, this.password, function (err, isMatch) {
//     done(err, isMatch);
//   });
// };
	return User;

};

