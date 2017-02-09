var app = angular.module('roamrrApp');
console.log("drag");

app.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  };
});

app.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      board: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          this.classList.remove('over');
          
          var boardId = this.id;
          var result = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(result);
          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {            
              fn(result.id, boardId);
            }
          });
          
          return false;
        },
        false
      );
    }
  };
});

app.controller('DragDropCtrl', function($scope) {
  $scope.handleDrop = function(result, board) {

  };
});