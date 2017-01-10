console.log('trip Controller')

angular
  .module('roamrrApp') //sets main app and dependancies
  .controller('ChoicesController',ChoicesController)
    .controller('EventsController',EventsController)
    //  .directive('wdiCard', wdiCard);

;

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
ChoicesController.$inject = ["$http",'$location']; // minification protection
function ChoicesController ($http,$location) {
console.log('choices controller');


    function getAllApiEvents(){
        vm.allEvents = [{title: 'The Best Song Ever',
      duration: '3:31',
      date_of_release: '7/13/2015',
      album_title: 'Best Album Ever'},{title: 'The Best Song Ever',
      duration: '3:31',
      date_of_release: '7/13/2015',
      album_title: 'Best Album Ever'},{title: 'The Best Song Ever',
      duration: '3:31',
      date_of_release: '7/13/2015',
      album_title: 'Best Album Ever'}];
        console.log('get all api events',vm.allEvents);

    
  }
}
  EventsController.$inject = ["$http",'$location','$scope']; // minification protection
function EventsController ($http,$location,$scope) {
console.log('events controller');
// var vm = this;
$scope.name2 = {name:'billy'};
// vm.name = {name:'clay'}
 $scope.stuff =[
    {
  created:  11/12/12,
  address: '123 angular',
  phone: '123-123-1234',
  website: 'www.www.com',
  reviews:'4 stars!',
  cost:'1 million dollars'  
    },
    {
  created:  01/12/42,
  address: '123 angular',
  phone: '123-123-1234',
  website:'www.111ww.com',
  reviews: '100 stars!',
  cost:'3.50 dollars'  
    },
    {
  created:  09/07/23,
  address: '123 angular',
  phone: '123-123-1234',
  website: 'www.stuffgoeshere.com',
  reviews:'10000 stars!',
  cost:'20 dollars'  
    },
    {
  created:  05/23/34,
  address: '123 angular',
  phone: '123-123-1234',
  website: 'www.blah.com',
  reviews:'0 stars!',
  cost:'10 million dollars'  
    },
    {
  created:  07/07/07,
  address: '123 angular',
  phone: '123-123-1234',
  website: 'www.junk.com',
  reviews:'.5 stars!',
  cost:'1 dollar'  
    }
  ];


      
}