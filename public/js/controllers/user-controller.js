angular
  .module('roamrrApp') //sets main app and dependancies
  .controller('MainController', MainController)
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .controller('ActivityController', ActivityController)
  .service('Account', Account);

//global storage
var userInfo = {},
    gps = [],
    formInfo = {},
    yelpObj, //stores events from yelp
    storedEvents = [];
/********** CONTROLLERS ***************/
MainController.$inject = ['$http', "Account", "$location",'$auth','$scope']; // minification protection
function MainController($http, Account, $location,$auth,$scope) {
  var vm = this;
  vm.isAuth = $auth.isAuthenticated();
  vm.userInfo = userInfo;
  vm.userEvents = {}; //userEvents is used to pull in saved cards user selects
  console.log(userInfo,yelpObj);
  vm.go = function (res) {
    return $http.post('/api/trips', yelpObj)
      .then(function (res) {
        if (res.status === -1) {
          console.log('error!!!!');
        }
        $location.path('/itinerary');
      });

  };

}

HomeController.$inject = ["$http", '$location', '$scope']; // minification protection
function HomeController($http, $location, $scope) {
  var vm = this;

  vm.mapFunc = function () {
    $location.path('/activity'); //routes to next page
  };
  $scope.stuff = yelpObj; // this is pulling in the global variable of trip info from yelp
}

ActivityController.$inject = ["Account", '$location']; // minification protection
function ActivityController(Account, $location) {
  console.log('activity controller');
  var vm = this;
  vm.formInfo = {};
  vm.activityForm = function () {
    formInfo = vm.formInfo;
  };
}

LoginController.$inject = ["Account", '$location']; // minification protection
function LoginController(Account, $location) {
  var vm = this;
  vm.new_user = {}; // form data
  vm.login = function () {
    Account
      .login(vm.new_user)
      .then(function () {
        vm.new_user = {}; // clears form
      });
  };
}
SignupController.$inject = ["Account", '$location']; // minification protection
function SignupController(Account, $location) {
  var vm = this;
  vm.new_user = {}; // form data
  vm.signup = function () {
    Account
      .signup(vm.new_user)
      .then(function () {
        vm.new_user = {}; // clears form 

      });
  };
}

LogoutController.$inject = ["Account", '$location']; // minification protection
function LogoutController(Account, $location) {
  Account.logout();
  $location.path('/'); 
}

ProfileController.$inject = ["Account", '$location','$scope']; // minification protection
function ProfileController(Account, $location,$scope) {
  var vm = this;
  vm.new_user = {}; // form data
  vm.login = function () {
    Account
      .login(vm.new_user)
      .then(function () {
        vm.new_user = {}; // clears form
      });
  };
  // $scope.savedTrips ; // this needs to be set up with a connection to db trips table

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

  function theyPassed(passInfo) {
    userInfo = passInfo.user; //stores to global object -- user
    $('#loginReg').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $auth.setToken(passInfo.token); // authentication token set for user to proceed
    $location.path('/choices');
  }

  function signup(userData) {
    userArr = [];

    return (
      $auth
      .signup(userData)
      .then(
        function onSuccess(res, err) {
          console.log('returned', res);
          if (res.data.token !== undefined) {
            vm = this;
            var passInfo = res.data; //user info from db and

            gps.push(localStorage.getItem('nLat'));
            gps.push(localStorage.getItem('nLng'));

            return $http.post('/api/post', {
                gps: gps,
                formInfo: formInfo
              })
              .then(function (res) {
                if (res.status === -1) {
                  console.log('error!!!!');
                  $('div#errorBox').html('Sorry, There is an error with our server. Please Try again');
                }
                yelpObj = res.data;
                theyPassed(passInfo);
                // console.log(yelpObj, "city name should be in here");
              });
          } else if (err) {
            $('div#errorBox').html('There was a problem with the login', err);
          } else if (res.data == 'Sorry, but that e-mail has already been registered.') {
            console.log(res.data);
            $('div#errorBox').html(res.data);
          }
        }));
  }

  function login(userData) {
    userArr = [];
    return (
      $auth
      .login(userData) // 
      .then(
        function onSuccess(res) { //res gives token and user info from db
          var vm = this;
          var passInfo = res.data;
          gps.push(localStorage.getItem('nLat'));
          gps.push(localStorage.getItem('nLng'));
          return $http.post('/api/post', {
              gps: gps,
              formInfo: formInfo
            })
            .then(function (resp) {
              console.log(resp);
              yelpObj = resp.data; 
              var u = window.location.href,
                len = u.length;
              var urlEnd = u.slice((len - 6), (len)); // checks for '/login' in url
              if (urlEnd === '/login') {
                userInfo = passInfo.user; //stores to global object -- user
                $auth.setToken(passInfo.token); // authentication token set for user to proceed
                $location.path('/account');
                return;
              } else {
                theyPassed(passInfo); //bunch of stuff to do when authenticated
              }
            });
        },
        function onError(error) {
          console.error(error);
          $('div#errorBox').html('The e-mail password combination does not match our records');

          
        }
      )
    );
  }

  function logout() {
    return ($auth.logout() // delete token 
      .then(function () {
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
        function (response) {
          self.user = response.data;
        }
      )
    );
  }
}