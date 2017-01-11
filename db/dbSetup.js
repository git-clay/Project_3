var DB = require("../models");

var thisComputer = process.env.LOGNAME;

//makes new db 'roamrr_models'
var pgtools = require('pgtools');
pgtools.createdb({
  user: thisComputer,
  port: 5432,
  host: 'localhost'
}, 'roamrr_models', function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});

DB.sequelize.sync({force: true}).then(function(){
  process.exit();
});