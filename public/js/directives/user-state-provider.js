console.log('state provider')
angular
  .module('roamrrApp', ['ui.router', 'satellizer']) //sets main app and dependancies
  .config(configRoutes);

/************* ROUTES *********************/
configRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"]; // minification protection
function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
console.log('config routes');
  //this allows us to use routes without hash params!
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  // for any unmatched URL redirect to /
  $urlRouterProvider.otherwise("/");

$stateProvider
    .state('home', {
      url: '/', //when '/'
      templateUrl: '../views/templates/map.html',  //append this template to ui-router on index.html
      controller: 'HomeController', //using homecontroller
      controllerAs: 'home'  // call the controller using 'home'
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
      templateUrl: '../views/templates/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile',
      resolve: {
        loginRequired: loginRequired
      }
    })
    .state('activity',{
      url: '/activity',
      templateUrl: '../views/templates/activity.html',
      controller: 'ActivityController',
      controllerAs: 'activity'
    })
    .state('choices',{
      url: '/choices',
      templateUrl: '../views/templates/choices.html',
      controller: 'ChoicesController',
      controllerAs: 'choices'
    })
    /******** Activity controller directives ***********/
    .state('events',{
      url: '/events',
      templateUrl: '../views/templates/events.html',
      controller: 'EventsController',
      controllerAs: 'event'
    });


    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
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
        console.log('fail')
        // $location.path('/login');
      }
      return deferred.promise;
    }

}


