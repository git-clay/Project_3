console.log('user model . js');
var    bcrypt = require('bcryptjs');

module.exports = function(sequelize, Sequelize){
console.log('sequelized user');

	var userModel = sequelize.define('User',{
	  created:  Sequelize.DATE,
	  email: { type: Sequelize.STRING, unique: true, lowercase: true },
	  password: { type: Sequelize.STRING, select: false },
	  displayName: Sequelize.STRING,
	  username: Sequelize.STRING,
	  picture: Sequelize.STRING
	});

// userModel.pre('save', function (next) {
//   // set created and updated
//   now = new Date();
//   this.updated = now;
//   if (!this.created) {
//     this.created = now;
//   }

  // // encrypt password
  // var user = this;
  // console.log(userModel)
  // if (!user.isModified('password')) {
  //   return next();
  // }
  // bcrypt.genSalt(10, function (err, salt) {
  //   bcrypt.hash(userModel.password, salt, function (err, hash) {
  //     userModel.password = hash;
  //     next();
  //   });
  // });
// });

// user.methods.comparePassword = function (password, done) {
//   bcrypt.compare(password, this.password, function (err, isMatch) {
//     done(err, isMatch);
//   });
// };
	return userModel;

};

