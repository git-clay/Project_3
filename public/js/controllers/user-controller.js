angular
  .module('roamrrApp', ['ui.router', 'satellizer']) //sets main app and dependancies
  .controller('MainController', MainController)
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .service('Account', Account)
  .config(configRoutes);

console.log('USER-CONTROLLER . JS');

/********** CONTROLLERS ***************/
MainController.$inject = ["Account"]; // minification protection
function MainController(Account) {
  var vm = this;
  console.log('main controller');

  vm.currentUser = function() {
    return Account.currentUser();
  };
}

HomeController.$inject = ["$http"]; // minification protection
function HomeController($http) {
  console.log('home controller');

  var vm = this;
  // vm.posts = [];
  // vm.new_post = {}; // form data

  // $http.get('/api/posts')
  //   .then(function (response) {
  //     vm.posts = response.data;
  //   });
}

LoginController.$inject = ["Account", '$location']; // minification protection
function LoginController(Account, $location) {
  var vm = this;
  vm.new_user = {}; // form data
  console.log('LoginController')
  vm.login = function() {
    Account
      .login(vm.new_user)
      .then(function() {
        vm.new_user = {}; // clears form
        $location.path('/profile'); // directs to profile page
      });
  };
}
SignupController.$inject = ["Account", '$location']; // minification protection
function SignupController(Account, $location) {
  var vm = this;
  vm.new_user = {}; // form data
  console.log('signup controller');
  vm.signup = function() {
    Account
      .signup(vm.new_user)
      .then(function() {
        vm.new_user = {};
        $location.path('/profile');
      });
  };
}

LogoutController.$inject = ["Account", '$location']; // minification protection
function LogoutController(Account, $location) {
  Account.logout();
  $location.path('/login'); //directs to login page when logged out
}


ProfileController.$inject = ["Account"]; // minification protection
function ProfileController(Account) {
  var vm = this;
  vm.new_profile = {}; // form data

  vm.updateProfile = function() {
    // TODO #14: Submit the form using the relevant `Account` method
    // On success, clear the form
  };
}

/********** SERVICES ***************/

Account.$inject = ["$http", "$q", "$auth", '$location']; // minification protection
function Account($http, $q, $auth, $location) {
  var self = this;
  self.user = null;

  self.signup = signup;
  self.login = login;
  self.logout = logout;
  self.currentUser = currentUser;
  self.getProfile = getProfile;
  self.updateProfile = updateProfile;
  console.log('account')

  function signup(userData) {
    console.log('signup', userData)
    return (
      $auth
      .signup(userData)
      .then(
        function onSuccess(response) {
          console.log(response.data.user)
          console.log(response.data.token);
          $auth.setToken(response.data.token);
        },
        function onError(error) {
          console.error(error);
        }
      )
    );
  }

  function login(userData) {
    console.log('Acount.login', userData)
    return (
      $auth
      .login(userData) // login (https://github.com/sahat/satellizer#authloginuser-options)
      .then(
        function onSuccess(response) {
          console.log('onSuccess')
          console.log(response.data.token);
          $auth.setToken(response.data.token);
        },

        function onError(error) {
          console.error(error);
        }
      )
    );
  }

  function logout() {
    return ($auth.logout() // delete token 
      .then(function() {
        $auth.removeToken();
        self.user = null;
      })
    );
  }

  function currentUser() {
    if (self.user) {
      return self.user;
    }
    if (!$auth.isAuthenticated()) {
      return null;
    }

    var deferred = $q.defer();
    getProfile().then(
      function onSuccess(response) {
        self.user = response.data;
        deferred.resolve(self.user);
      },

      function onError() {
        $auth.logout();
        self.user = null;
        deferred.reject();
      }
    );
    self.user = promise = deferred.promise;
    return promise;

  }

  function getProfile() {
    return $http.get('/api/me');
  }

  function updateProfile(profileData) {
    return (
      $http
      .put('/api/me', profileData)
      .then(
        function(response) {
          self.user = response.data;
        }
      )
    );
  }
}