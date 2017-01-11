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
var gps =[];
var formInfo = {};
/********** CONTROLLERS ***************/
MainController.$inject = ["Account"]; // minification protection
function MainController(Account) {
  var vm = this;
  console.log('main controller',userInfo.user);
 
  

  
  
  // vm.currentUser = function() {
  //   return userInfo;
  // };
}


HomeController.$inject = ["$http"]; // minification protection
function HomeController ($http) {
  console.log('home controller');

  var vm = this;
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
        document.body.className=document.body.className.replace('modal-open',''); //kills modal
        var modal = document.getElementById('loginReg').style.display='none'; // removes modal shadow left over
         vm.new_user={}; // clears form
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
        document.body.className=document.body.className.replace('modal-open',''); //kills modal
        var modal = document.getElementById('loginReg').style.display='none'; // removes modal shadow left over
          vm.new_user={}; // clears form 
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

// function postFunc(gps, formInfo){ 
//     // vm = this;
//            gps.push(localStorage.getItem('nLat'));
//   gps.push(localStorage.getItem('nLng'));
//   // vm.userInfo = userInfo.user;
//   console.log(gps);
//   console.log(formInfo);
//   console.log(formInfo.scenic);
//     console.log(formInfo.city);
//   console.log(formInfo.days);
//     $http.post('/api/post', {gps: gps, formInfo: formInfo}).then(function(data){

//       console.log(data)});

//         //     return $.ajax({
//         //  method: 'POST',
//         //  url: '/api/post',
//         //  data: {gps: gps, scenic: formInfo.scenic, city: formInfo.city},
//         //  success: function (data){
//         //     console.log(data)},
//         // error: function(data) {
//         //         console.log(data)
//         //         console.log('oops')
//         //     },
         
//         //  });
//          }
//     }



  function signup(userData) {
     
    console.log('signup', userData);
    return (
      $auth
      .signup(userData)
      .then(
        function onSuccess(res) {

          // function postFunc(gps, formInfo){ 
          vm = this;
          gps.push(localStorage.getItem('nLat'));
          gps.push(localStorage.getItem('nLng'));
          // // vm.userInfo = userInfo.user;
          // console.log(gps);
          // console.log(formInfo);
          // console.log(formInfo.scenic);
          //   console.log(formInfo.city);
          // console.log(formInfo.days);
          return  $http.post('/api/post', {gps: gps, formInfo: formInfo}).then(function(data){
              console.log(data)});
        //     return $.ajax({
        //  method: 'POST',
        //  url: '/api/post',
        //  data: {gps: gps, scenic: formInfo.scenic, city: formInfo.city},
        //  success: function (data){
        //     console.log(data)},
        // error: function(data) {
        //         console.log(data)
        //         console.log('oops')
        //     },
         
        //  });
         // }
         // postFunc(gps, formInfo);


         
          console.log(res.data.user) //all user info comes back here
          // console.log(res.data.token);
          $auth.setToken(res.data.token);
        },

        function onError(error) {
          console.error(error);
        }
        )
      );
  }
  

  function login(userData) {
    postFunc(gps, formInfo);
    console.log('Acount.login', userData);
    return (
      $auth
      .login(userData) // 
      .then(
        function onSuccess(res) {
          
          console.log('onSuccess',res.data.user);//all user info comes back here
          userInfo = {user:res.data.user};  //stores to global object
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










