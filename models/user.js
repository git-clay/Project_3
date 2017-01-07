var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://claybin@localhost:5432/tunr_models'),
    bcrypt = require('bcryptjs');
console.log('user model . js')
var userModel = sequelize.define('User',{
  created:  Sequelize.DATE,
  updated: Sequelize.DATE,
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

//   // encrypt password
//   var user = this;
//   if (!user.isModified('password')) {
//     return next();
//   }
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       user.password = hash;
//       next();
//     });
//   });
// });

// userModel.methods.comparePassword = function (password, done) {
//   bcrypt.compare(password, this.password, function (err, isMatch) {
//     done(err, isMatch);
//   });
// };

var User = sequelize.model('User', userModel);
module.exports = User;
