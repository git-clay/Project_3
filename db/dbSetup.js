var DB = require("../models");

var thisComputer = process.env.LOGNAME;


var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err,client){
  if(err)throw err;
  console.log('connected to postgres! Getting schemas....');

  client
  .query('Select table_schema,table_name FROM information_schema.tables;')
  .on('row',function(row){
    console.log(JSON.stringify(row));
  });
});

//makes new db 'roamrr_models'
// var pgtools = require('pgtools');
// pgtools.createdb({
//   user: thisComputer,
//   port: 5432,
//   host: 'localhost'
// }, 'roamrr_models', function (err, res) {
//   if (err) {
//     console.error(err);
//     process.exit(-1);
//   }
//   console.log(res);
// });

DB.sequelize.sync({force: true}).then(function(){
  process.exit();
});