var request		= require('request'),
	chai		= require('chai'),
	chaiHttp	= require('chai-http'),
	server		= require('../server'),
	expect		= chai.expect,
	should		= chai.should()
	// user		= require('../public/js/controllers/user-controller.js')	// which js file to test??????
	// auth 		= require('#')
	;
chai.use(chaiHttp);	

var DB = require("../models").models;



var userCreate = function() {
	return DB.User.create({
	  created:  11/11/11,
	  email: 'clay@gmail.com',
	  // email: { type: Sequelize.STRING, unique: true, lowercase: true },
	  password: '1234'
  });
};


// var fetcher = (function(request, q) {
//   // This module is a wrapper around the request library.
//   // It permits method/promise chaining in the tests,
//   // and converts server responses to JSON, raising errors
//   // if the request takes too long or is in the wrong format.

//   return {
//     get:  function(action      ){ return fetch("get",   {url: action})             },
//     del:  function(action      ){ return fetch("del",   {url: action})             },
//     post: function(action, data){ return fetch("post",  {url: action, form: data}) },
//     put:  function(action, data){ return fetch("put",   {url: action, form: data}) }
//   };

//   ////

//   function fetch(method, options){
//     var deferred = Q.defer();

//     setTimeout(function(){
//       // Intended to be more intelligible to students than mocha's stock error of
//       //    "Error: timeout of 2000ms exceeded. /
//       //     Ensure the done() callback is being called in this test."
//       deferred.reject(new Error("No Response From Server"))
//     }, TIMEOUT);

//     request[method](options, function(error, response){
//       if(error){
//         return deferred.reject(new Error(error));
//       }

//       try {
//         response.json = JSON.parse(response.body);
//         deferred.resolve(response);
//       } catch (e) {
//         deferred.reject(new Error("Response body is the " + typeof(response.body) + " \"" + response.body.toString() + "\" and not valid JSON"))
//       }
//     });


//     return deferred.promise;
//   }

// }(request, Q))




describe('User', function(){
	// fake user info goes here
	var user = userCreate();
	// beforeEach(function(done) {

	// })


	describe('Testing /signup', function(){
		var response;
		it('should respond with status 200', function(done){
			chai.request(server)
				.get('/signup')
				.end(function(err,res){
					expect(res).to.have.status(200)
					done();
				});

		});
		it('should get info from html form', function(done){
			chai.request(server)
				.post('/signup')
				.send('displayName','bill')
				.end(function(err,res){
					expect(res.data).to.equal('bill')
					done();
				});
		});
		it('should save something to database', function(){
			expect();
		});
		it('should salt password', function(){
			expect();
		});
		it('should redirect to next page', function(){
			expect();
		});
		it('should save to database', function(){
			expect();
		});
		it('should change authentication status', function(){
			expect();
		});

	});

	describe('Testing login', function(){
		it('should get info from html form', function(){
			expect();
		});
		it('should login if user/password correct', function(){
			expect();
		});
		it('should throw error if wrong user/password', function(){
			expect();
		});
		it('should change authentication status', function(){
			expect();
		});
	});
})
