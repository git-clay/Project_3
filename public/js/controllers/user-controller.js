angular
  .module('roamrrApp') //sets main app and dependancies
  .controller('MainController', MainController)
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  // .controller('ProfileController', ProfileController)
  .controller('ActivityController', ActivityController)
  .service('Account', Account);
  // .config(configRoutes);

console.log('USER-CONTROLLER . JS');
var userInfo = {};
var userArr =[];
/********** CONTROLLERS ***************/
MainController.$inject = ["Account"]; // minification protection
function MainController(Account) {
  var vm = this;
  console.log('main controller',userInfo.user)
  vm.userInfo = userInfo.user;
  // vm.currentUser = function() {
  //   return userInfo;
  // };
}

HomeController.$inject = ["$http",'$location']; // minification protection
function HomeController ($http,$location) {
  console.log('home controller');

  var vm = this;
  vm.mapFunc = function(){
    console.log('mapfunc');
    $location.path('/activity');

      };
  // vm.posts = [];
  // vm.new_post = {}; // form data

  // $http.post('/api/posts')
  //   .then(function (response) {
  //     vm.posts = response.data;
  //   });
}




ActivityController.$inject = ["Account",'$location']; // minification protection
function ActivityController (Account,$location) {
console.log('activity controller')
var vm = this;
vm.formInfo = {};
  vm.activityForm = function(){
    console.log('formInfo: ',vm.formInfo);
  };
}





LoginController.$inject = ["Account",'$location']; // minification protection
function LoginController (Account,$location) {
  var vm = this;
  vm.new_user = {}; // form data
  console.log('LoginController');
  vm.login = function() {
    Account
      .login(vm.new_user)
      .then(function(){
         vm.new_user={}; // clears form
         $('#loginReg').modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $location.path('/choices'); // directs to choices page
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
      .then(function () {
          vm.new_user={}; // clears form 
          $('#loginReg').modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          $location.path('/choices');

        }
      );
  };
}

LogoutController.$inject = ["Account", '$location']; // minification protection
function LogoutController(Account, $location) {
  Account.logout();
  $location.path('/login'); //directs to login page when logged out
}

// // not used  --- will be if we decide to add profile page 
// ProfileController.$inject = ["Account"]; // minification protection
// function ProfileController(Account) {
//   var vm = this;
//   vm.new_profile = {}; // form data
//   vm.updateProfile = function() {
//   };
// }

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
  console.log('account');

  function signup(userData) {
    console.log('signup', userData);
    return (
      $auth
      .signup(userData)
      .then(
        function onSuccess(res) {
          console.log(res.data)
          console.log(res.data.user); //all user info comes back here
          userInfo = {user:res.data.user};  //stores to global object -- user
          // console.log(res.data.token);
          if(res.data.token)
          $auth.setToken(res.data.token);
        },
        function onError(error) {
          console.error(error);
        }
      )
    );
  }

  function login(userData) {
    console.log('Acount.login', userData);
    return (
      $auth
      .login(userData) // 
      .then(
        function onSuccess(res) {
          console.log('onSuccess',res.data);//all user info comes back here
          userInfo = {user:res.data.user};  //stores to global object -- user
          // console.log(response.data.token);


          $auth.setToken(res.data.token);
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
        userInfo = {}; // clears global variable
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







