var request		= require('request'),
	chai		= require('chai'),
	chaiHttp	= require('chai-http'),
	server		= require('../server.js'),
	expect		= chai.expect,
	should		= chai.should()
	// user		= require('../public/js/controllers/user-controller.js')	// which js file to test??????
	// auth 		= require('#')
	;
chai.use(chaiHttp);	

describe('User', function(){
	// fake user info goes here
	// var johnny = new User("Johnny");
	// beforeEach(function(done) {

	// })


	describe('Testing /register', function(){
		var response;
		it('should respond with status 200', function(done){
			chai.request(server)
				.get('register')
				.end(function(err,res){

				})
			expect(response.statusCode).to.equal(200);	

		});
		it('should get info from html form', function(){
			request({
				url:'http://localhost3000/register',
				method: 'POST'
			}, function(err,res,body){
				console.log('post',res,body)
					expect(res).to.equal('1');	
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
