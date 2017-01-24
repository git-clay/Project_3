angular
  .module('roamrrApp') //sets main app and dependancies
  .controller('MainController', MainController)
  .controller('HomeController', HomeController)
  .controller('LoginController', LoginController)
  .controller('SignupController', SignupController)
  .controller('LogoutController', LogoutController)
  .controller('ProfileController', ProfileController)
  .controller('ActivityController', ActivityController)
  .service('Account', Account)
  
    ;
// .config(configRoutes);

//global storage
var userInfo = {},
    gps = [],
    formInfo = {},
    userObj,
    storedEvents = [];
/********** CONTROLLERS ***************/
MainController.$inject = ['$http', "Account", "$location",'$auth','$scope']; // minification protection
function MainController($http, Account, $location,$auth,$scope) {
  var vm = this;
  vm.isAuth = $auth.isAuthenticated();
  vm.userInfo = userInfo;
  vm.userEvents = {}; //userEvents is used to pull in saved cards user selects
  storedEvents = userObj;
  vm.go = function (res) {
    // storedEvents.push({
    //   user_id: userInfo.id
    // });
    // console.log('line29', storedEvents)

    return $http.post('/api/trips', storedEvents)
      .then(function (res) {
        if (res.status === -1) {
          console.log('error!!!!');
        }

        console.log('stored:', res)
        $location.path('/itinerary')
      })

  };

}

HomeController.$inject = ["$http", '$location', '$scope']; // minification protection
function HomeController($http, $location, $scope) {
  var vm = this;

  vm.mapFunc = function () {
    console.log('mapfunc');
    $location.path('/activity'); //routes to next page
  };
  $scope.stuff = userObj; // this is pulling in the global variable of trip info from yelp
}

ActivityController.$inject = ["Account", '$location']; // minification protection
function ActivityController(Account, $location) {
  console.log('activity controller')
  var vm = this;
  vm.formInfo = {};
  vm.activityForm = function () {
    formInfo = vm.formInfo;

    console.log('formInfo: ', vm.formInfo);
  };
}

LoginController.$inject = ["Account", '$location']; // minification protection
function LoginController(Account, $location) {
  var vm = this;
  vm.new_user = {}; // form data
  console.log('LoginController');
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
  console.log('signup controller');
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
  $location.path('/login'); //directs to login page when logged out
}

ProfileController.$inject = ["Account", '$location']; // minification protection
function ProfileController(Account, $location) {
  var vm = this;
  vm.new_user = {}; // form data
  console.log('LoginController');
  vm.login = function () {
    Account
      .login(vm.new_user)
      .then(function () {
        vm.new_user = {}; // clears form
      });
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

  function theyPassed(passInfo) {
    userInfo = passInfo.user; //stores to global object -- user
    $('#loginReg').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $auth.setToken(passInfo.token); // authentication token set for user to proceed
    $location.path('/choices');
  };

  function signup(userData) {
    userArr = [];

    return (
      $auth
      .signup(userData)
      .then(
        function onSuccess(res, err) {
          console.log('returned', res)
          if (res.data.token !== undefined) {
            vm = this;
            var passInfo = res.data;

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
                userObj = res.data;
                theyPassed(passInfo)
                console.log(userObj, "city name should be in here");
              });
          } else if (err) {
            $('div#errorBox').html('There was a problem with the login', err);
          } else if (res.data == 'Sorry, but that e-mail has already been registered.') {
            console.log(res.data)
            $('div#errorBox').html(res.data);
          }
        }))
  }

  function login(userData) {
    userArr = [];
    console.log('Account.login', userData);
    return (
      $auth
      .login(userData) // 
      .then(
        function onSuccess(res) {
          var vm = this
          var passInfo = res.data;
          gps.push(localStorage.getItem('nLat'));
          gps.push(localStorage.getItem('nLng'));
          return $http.post('/api/post', {
              gps: gps,
              formInfo: formInfo
            })
            .then(function (resp) {
              userObj = resp.data;
              var u = window.location.href,
                len = u.length;
              var urlEnd = u.slice((len - 6), (len)) // checks for '/login' in url
              if (urlEnd === '/login') {
                userInfo = passInfo.user; //stores to global object -- user
                $auth.setToken(passInfo.token); // authentication token set for user to proceed
                $location.path('/account');
                return;
              } else {
                theyPassed(passInfo) //bunch of stuff to do when authenticated
              }
            });
        },
        function onError(error) {
          console.error(error);
          $('div#errorBox').html('The e-mail password combination does not match our records');

          $
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
    return $http.get('/api/me')
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