var express	= require('express'),
	app		= express();

/*********************** Served up directories ******************************/
app.use(express.static(__dirname + '/public'));
app.set('views', '/public/views');


app.get('/', function homepage(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

/*********************** ROUTES ******************************/


/*********************** SERVER ******************************/
app.listen(process.env.PORT || 3000, function() {
	console.log('BOOM, Express is firing on all cylinders');
});