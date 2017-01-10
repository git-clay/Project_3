var request		= require('request'),
	chai		= require('chai'),
	chaiHttp	= require('chai-http'),
	// server		= require('../server'),
	expect		= chai.expect,
	should		= chai.should();
	User		= require('../models/user.js');	// which js file to test??????

chai.use(chaiHttp);	

var DB = require("../models").models;

var userCreate = function() {
	return DB.User.create({
	  displayName:  'Cool name goes here',
	  email: 'clay@gmail.com',
	  password: '1234'
  });
};



describe('User', function(){
	// fake user info goes here
	var user = userCreate();
	user = user._boundTo.dataValues
	console.log(user)
	// beforeEach(function(done) {

 // Set up the module
 // beforeEach(module('roamrrApp'));

	describe('Testing /signup', function(){
		var response;
	

	    it("should create a new object", function() {   
	      expect(typeof(user)).to.equal("object");
	    });
	    it("should have a name", function() {
      		expect(user.displayName).to.not.be.empty;
    	});
	    it("should have an email", function() {
      		expect(user.email).to.not.be.empty;
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
