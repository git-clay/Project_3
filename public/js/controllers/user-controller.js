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

var userInfo = {};
var gps =[];
var formInfo = {};
var userObj;
var storedEvents = [];
/********** CONTROLLERS ***************/
MainController.$inject = ["Account", "$location"]; // minification protection
function MainController(Account, $location) {
  var vm = this;
  vm.go= function (){
    $location.path('/itinerary')
  };

  vm.userInfo = userInfo.user;
  vm.userEvents={}; //userEvents is used to pull in saved cards user selects
  storedEvents = vm.userEvents; //saved cards stored globally
  

  }

HomeController.$inject = ["$http",'$location','$scope']; // minification protection
function HomeController ($http,$location,$scope) {
  var vm = this;

  vm.mapFunc = function(){
    console.log('mapfunc');
    $location.path('/activity'); //routes to next page
      };
    $scope.stuff=userObj; // this is pulling in the global variable of trip info from yelp
}




ActivityController.$inject = ["Account",'$location']; // minification protection
function ActivityController (Account,$location) {
console.log('activity controller')
var vm = this;
vm.formInfo = {};
  vm.activityForm = function(){
    formInfo = vm.formInfo;

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
         console.log('loginloginloginloginlogin')
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
          $('#loginReg').modal('hide'); //jquery to kill everything on modal
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


  function signup(userData) {
    userArr=[];

    return (
      $auth
      .signup(userData)
      .then(
        function onSuccess(res) {
          userInfo = {user:res.data.user};  //stores to global object -- user
          vm = this;
          gps.push(localStorage.getItem('nLat'));
          gps.push(localStorage.getItem('nLng'));
           console.log(res.data.user) ;//all user info comes back here
          $auth.setToken(res.data.token);  // authentication token set for user to proceed
          return  $http.post('/api/post', {gps: gps, formInfo: formInfo})
          .then(function(res){
            if(res.status===-1){console.log('error!!!!');
              $('div#errorBox').html('Sorry, There is an error with our server. Please Try again');
            }
           userObj =res.data;
              console.log(userObj + "city name should be in here");
            });
        },
          function onError(error) {
            console.error('onError line 176:',error);
          }
        )
      );
  }
  

  function login(userData) {
userArr=[];
    console.log('Acount.login', userData);
    return (
      $auth
      .login(userData) // 
      .then(
        function onSuccess(res) {

          console.log('onSuccess',res.data.user);//all user info comes back here
          userInfo = {user:res.data.user};  //stores to global object -- user
          gps.push(localStorage.getItem('nLat'));
          gps.push(localStorage.getItem('nLng'));
          $auth.setToken(res.data.token);

          return  $http.post('/api/post', {gps: gps, formInfo: formInfo}).then(function(data){
     userObj =data.data;
              console.log(data);
            });
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



