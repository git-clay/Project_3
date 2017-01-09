var expect	= require('chai').expect,
	req 	= require('request'),
	api		= require('#');	// depends where we are sending api requests from

var url		= 'http://www.';

describe('Testing __ API', function(){
	var apiErr,apiRes,apiBody;
	before(function(done) {
		req(URL, function(err, res, body) {
			apiErr = err;
			apiRes = res;
			apiBody = body;
			done();
		});
	});
	it("should return 200 - OK", function() {
		expect(apiRes.statusCode).to.eq(200);
	});

	it("should have a Title in the body", function() {
	  if (typeof(apiBody) == "string") {
	  	apiBody = JSON.parse(apiBody);
	  }
		expect(apiBody.Title).to.not.be.empty;
	});
});