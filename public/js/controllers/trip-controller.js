console.log('trip Controller')

angular
  .module('roamrrApp') //sets main app and dependancies
  .controller('ChoicesController',ChoicesController)
    // .controller('EventsController',EventsController)
    // .factory('YelpFactory')
  //     , function($resource){
  //   return $resource('http://localhost:3000/api/post')
  // })

    //  .directive('wdiCard', wdiCard);



// function wdiCard(){
//   var directive = {
//     restrict: 'E',
//     replace: true,
//     templateUrl: 'templates/cardDirective.html',
//     scope: {
//       question:'@'  //when 'question' show from questionList
//     }
//   };
//   return directive;
// }


// EventsController.$inject = ["$http",'$location']; // minification protection
// function EventsController ($http,$location) {
// console.log('Events controller');
//   var vm = this;
//   vm.activitiesList =[];


//     // function queryEvents(){
//     //   var activityGet = YelpFactory.query({}, function(response){
//     //     console.log('its the response for yelp' + response);
//     //     vm.activitiesList = response;
//     //   })
//     // }
//     // queryEvents()


//     function getAllApiEvents(){
//         vm.allEvents = [{title: 'The Best Song Ever',
//       duration: '3:31',
//       date_of_release: '7/13/2015',
//       album_title: 'Best Album Ever'},{title: 'The Best Song Ever',
//       duration: '3:31',
//       date_of_release: '7/13/2015',
//       album_title: 'Best Album Ever'},{title: 'The Best Song Ever',
//       duration: '3:31',
//       date_of_release: '7/13/2015',
//       album_title: 'Best Album Ever'}];
//         console.log('get all api events',vm.allEvents);

    
//   }
// }
  ChoicesController.$inject = ["$http",'$location','$scope']; // minification protection
function ChoicesController ($http,$location,$scope) {


    // function queryEvents(){
    //   var activityGet = YelpFactory.query({}, function(response){
    //     console.log('its the response for yelp' + response);
    //     vm.activitiesList = response;
    //   })
    // }
    // queryEvents()
      
}