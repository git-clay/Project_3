angular
  .module('roamrrApp', ['ui.router', 'satellizer']) //sets main app and dependancies
  .config(configRoutes);


// , 'ng-drag'
/************* ROUTES *********************/
configRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"]; // minification protection
function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
  //this allows us to use routes without hash params!
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });


$stateProvider
    .state('home', {
      url: '/', //when '/'
      views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
          templateUrl: '../views/templates/map.html',  //append this template to ui-router on index.html
          controller: 'HomeController', //using homecontroller
          controllerAs: 'home'  // call the controller using 'home'
          }
      }
    })
    .state('login', {
      url: '/login',
      views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
      templateUrl: '../views/templates/login.html',
      controller: 'ProfileController',
      controllerAs: 'pc'
          }
      }
    })
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'LogoutController',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .state('profile', {
      url: '/profile',
        views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
          templateUrl: '../views/templates/profile.html',
          controller: 'ProfileController',
          controllerAs: 'profile',
          resolve: {
            loginRequired: loginRequired
          }
          }
        }
    })
        /******** Activity controller directives ***********/
    .state('activity',{
      url: '/activity',
            views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
          templateUrl: '../views/templates/activity.html',
          controller: 'ActivityController',
          controllerAs: 'activity'
          }
      }

    })
    .state('choices',{
      url: '/choices',
            views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
          templateUrl: '../views/templates/choices.html'
          }
      }

    })
    .state('itinerary',{
      url:'/itinerary',
            views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
      templateUrl:'../views/templates/itinerary.html'
      }
    }
    })
    .state('team',{
      url:'/team',
        views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
              templateUrl:'../views/templates/team.html'
          }
      }
    })
    .state('splash',{
      url:'/splash',
            views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
            templateUrl:'../views/templates/splash.html'
          }
      }
    })
    .state('account', {
      url: '/account',
            views:{
        'navbar':{
          templateUrl:'../views/templates/navbar.html',
          controller:'MainController',
          controllerAs:'mc'
          },
        '':{  
          templateUrl: '../views/templates/profile.html',
          controller: 'ProfileController',
          controllerAs: 'pc'
          }
      }

    });
    
    //$urlRouterProvider.otherwise('/auth');
      $urlRouterProvider.otherwise(function($injector, $location) {
          console.log("Could not find " + $location);
          $location.path('/');
      });

    function skipIfLoggedIn($q, $auth) {
      console.log('skipIfLoggedIn')
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
        $location.path('/');

      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        console.log('login required');
        // $location.path('/login');
      }
      return deferred.promise;
    }

}


