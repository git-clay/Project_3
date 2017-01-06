var express			= require('express'),
	router			= express.Router(),
	bodyParser		= require('body-parser'),
	userController	= require('../controllers/auth.js');


/****************** Routes for authentication ************************/
// router
//   .get('/register',userController.getRegister)
//   .post('/users',userController.postRegister);