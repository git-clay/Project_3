console.log('state provider');
angular
  .module('roamrrApp', ['ui.router', 'satellizer']) //sets main app and dependancies
  .config(configRoutes);
// , 'ng-drag'
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
    }).state('signup', {
      url: '/signup',
      templateUrl: '../views/templates/signup.html',
      controller: 'SignupController',
      controllerAs: 'sc',
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '../views/templates/login.html',
      // controller: 'LoginController',
      // controllerAs: 'lc',
      // resolve: {
      //   skipIfLoggedIn: skipIfLoggedIn
      // }
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
        /******** Activity controller directives ***********/
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
    .state('main',{
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('itinerary',{
      url:'/itinerary',
      templateUrl:'../views/templates/itinerary.html'
    })
    .state('team',{
      url:'/team',
      templateUrl:'../views/templates/team.html'
    })
    .state('splash',{
      url:'/splash',
      templateUrl:'../views/templates/splash.html'
    });


    function skipIfLoggedIn($q, $auth) {
      console.log('skipIfLoggedIn')
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
        console.log('fail');
        // $location.path('/login');
      }
      return deferred.promise;
    }

}


