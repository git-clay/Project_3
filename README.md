# Project_3
SEAN stack travel app

#### [Heroku App](https://protected-hamlet-38916.herokuapp.com/)
#### [Trello Board](https://trello.com/b/g2CM30fa/project-3-travel)
#### [Wireframes](https://raw.githubusercontent.com/git-clay/Project_3/master/Wireframes/wireframes.png)

Basically a simplified tripadvisor using their api for travel information and google's api to search for activities.
User's can login and save custom trips to their profile. 

We wanted to step away from the conventional idea of planning a trip. Instead of meandering around trourist traps we wanted to create a way to visit the places the locals still enjoy because these spots are true gems! 

###Tools:
    "angular":
    "angular-ui-router":
    "angular-drag-drop": 
    "animate.css": 
    "bcrypt": Password salt and hash (Encription technique)
    "body-parser": To more easily manage json objects
    "bootstrap": 
    "chai": Used for testing (Tdd)
    "chai-http": This will allow tesing on url routes
    "cities": Used to turn latitude and longitude into city information
    "express"" : To more easily communicate with the database
    "jwt-simple": Used to create authentication tokens for user login
    "pg": 
    "pg-hstore": 
    "pgtools": 
    "postgres" & "sequellize": Used to create and update the database via SQL
    "nodemon" : used to automatically reload node after any file was saved
    "mocha": Used to display tests in the terminal
    "moment": Accesses the current time to create an a token
    "morgan":
    "satellizer": used to register and login users
    "request": used to pull in all of these tools on the designated file
    "yelp": Api library used to access the yelp information we need





    Routes and controllers were created to make the RESTful requests more organized both within the app itself and requests from a third party api.

        >Our angular module is called roamrrApp which allows us to direct states from the ui-router and use our controllers.
        
        >The controllers allow angular to dynamically manipulate the page

        >Registration / login:
             - User input is packaged using angular and sent to the backend. The server encripts the password and saves the user login information on the sql database.
             - With a successful login, the front end is sent an authentication token (created with an algorithm accessing the current time and the secret key)

        >
