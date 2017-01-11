/*! The MIT License (MIT)

Copyright (c) 2015 Andrew Stuart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

angular.module('angular-drag-drop', []);

angular.module('angular-drag-drop')
.directive('ngDrag', ["DragData", "$timeout", function (DragData, $timeout) {
  'use strict';

  /**
   * @ngdoc directive
   * @name angular-drag-drop.directive:ngDrag
   * @description A directive that allows an item to be dragged and its $scope
   * tracked and provided to the drop target upon drop.
   * @param {String} ngDrag Either emtpy or a string that can be used to
   * identify the type of data that is being transferred. This is most useful
   * for limiting where an item can be dropped. For example, say you show
   * multiple items each with multiple steps, and you want to limit dragging
   * steps to the same item.
   *
   * ```html
   * <div class="item" ng-drag="item/{{item.id}}">...</div>
   * ```
   *
   * @param {Expression} ngDragstart An expression that will be executed on
   * dragstart. Event available as `$event`.
   * @param {Expression} ngDragend An expression that will be evaluated on
   * dragend. Event available as `$event`.
   * @restrict A
   * @example
   * <example module="test">
   *   <file name="example.js">
   *     angular.module('test', ['angular-drag-drop'])
   *     .controller('ExController', function($scope) {
   *       $scope.tests = ['green', 'yellow', 'red'];
   *       $scope.alert = function(msg) {
   *         alert(msg);
   *       };
   *     });
   *   </file>
   *   <file name="example.html">
   *     <style>
   *       .parent div {
   *         height: 3em;
   *         background-color: rgba(0, 0, 0, 0.1);
   *         margin: 1em;
   *       }
   *     </style>
   *     <div class="parent" ng-controller="ExController">
   *       <div ng-repeat="data in tests" style="background-color: {{data}};" ng-drag>
   *         {{data}} (Drag Me)
   *       </div>
   *       <div ng-drop="dropped = $from.data" style="background-color: {{dropped}};">
   *         {{dropped}} (Drop{{dropped && 'ped'}} here)
   *       </div>
   *     </div>
   *   </file>
   * </example>
   * <example module="test2">
   * <file name="example2.js">
   *   angular.module('test2', ['angular-drag-drop'])
   *     .controller('test', function($scope) {
   *       $scope.data = [{
   *         color: 'red',
   *         numbers: [1, 2, 3]
   *       },{
   *         color: 'green',
   *         numbers: [4, 5, 6]
   *       },{
   *         color: 'blue',
   *         numbers: [7, 8, 9]
   *       }]
   *     });
   * </file>
   * <file name="example2.html">
   *   <style>
   *     .target {
   *       background-color: #ddd;
   *       height: 2em;
   *       min-width: 8em;
   *     }
   *
   *
   *     .num {
   *       display: inline-block;
   *       background-color: rgba(0, 0, 0, 0.1);
   *       padding: 1em;
   *       text-align: center;
   *       color: white;
   *       margin: 1em;
   *     }
   *
   *     .target.num { color: black; }
   *   </style>
   *   <p>Notice you can only drag between like colors.</p>
   *   <div ng-controller="test">
   *     <div ng-repeat="color in data" style="background-color: {{color.color}};">
   *       <div class="num" ng-repeat="number in color.numbers" ng-drag="color/{{color.color}}">
   *         {{number}}
   *       </div>
   *       <div class="target num" ng-drop="current = $from.number" allow-drop="color/{{color.color}}">
   *         {{current || 'Drag ' + color.color + ' Here'}}
   *       </div>
   *     </div>
   *   </div>
   * </file>
   * </example>
   */
  return {
    restrict: 'A',
    link: function postLink($scope, element, iAttrs) {
      element.attr('draggable', 'true');

      if (iAttrs.ngDragend) {
        element.on('dragend', function(e) {
          $timeout(function() {
            $scope.$eval(iAttrs.ngDragend, {$event: e});
          });
        });
      }

      element.on('dragstart', function(e) {

        var event = e.originalEvent || e;

        var type;
        try {
          type = event.dataTransfer.getData('ngdrag/type');
        } catch (e) {
          console.log(e);
        }

        //Only add data if not already added (would be less specific)
        if ( !type ) {
          event.dataTransfer.setData('ngdrag/type', iAttrs.ngDrag || 'ngdrag/id');
          event.dataTransfer.setData(iAttrs.ngDrag || 'ngdrag/id', $scope.$id);
        }
        DragData.add($scope);

        if (iAttrs.ngDragstart) {
          //$timeout is necessary here to get around chrome bug where DOM
          //manipulation on dragstart cancels the drag.
          $timeout(function() {
            $scope.$eval(iAttrs.ngDragstart, {$event: e});
          });
        }
      });
    }
  };
}]);

angular.module('angular-drag-drop')
.directive('ngDragenter', ["$timeout", function ($timeout) {
  'use strict';

  /**
   * @ngdoc directive
   * @name angular-drag-drop.directive:ngDragenter
   * @param {Expression} ngDragenter An expression to be executed on dragenter
   * @description Evaluates some expression on dragenter
   * @restrict A
   */

  return {
    restrict: 'A',
    link: function postLink($scope, iEle, iAttrs) {
      iEle.on('dragenter', function(e) {
        $timeout(function() {
          $scope.$eval(iAttrs.ngDragenter, {$event: e});
        });
      });
    }
  };
}])
.directive('ngDragleave', ["$timeout", function ($timeout) {
  'use strict';

  /**
   * @ngdoc directive
   * @name angular-drag-drop.directive:ngDragleave
   * @param {Expression} ngDragleave An expression to be executed on dragleave
   * @description Evaluates some expression on the dragleave event
   * @restrict A
   */

  return {
    restrict: 'A',
    link: function postLink($scope, iEle, iAttrs) {
      iEle.on('dragleave', function(e) {
        //Prevent event from bubbling past the target.
        if ( e.target === iEle[0] ) {
          e.stopPropagation();
        }

        $timeout(function() {
          $scope.$eval(iAttrs.ngDragleave, {$event: e});
        });
      });
    }
  };
}]);

angular.module('angular-drag-drop')
.directive('ngDrop', ["DragData", function(DragData) {
  'use strict';

  /**
   * @ngdoc directive
   * @name uni.directive:ngDrop
   * @param {Expression} ngDrop The expression to evaluate upon drop. If dropped element came from ngDrag, the ngDrag $scope is
   * available as $from.
   * @param {Expression} ngDragover An expression to evaluate on dragover.
   * @param {String} allowDrop A string that identifies the type of data that
   * will trigger the ngDrop handler. Used in conjuction with `<ele ng-drag="..." ...></ele>`,
   * this is helpful for limiting what can be dropped on a particular target.
   *
   * If the event has no data for the provided type, then the ng-drop function
   * will not be called.
   * @description Allows an expression to be evaluated upon drop. Event
   * available as $event.
   * @restrict A
   */
  return {
    restrict: 'A',
    link: function postLink($scope, element, iAttrs) {

      element.on('dragover', function(e) {
        e.preventDefault();
        if (iAttrs.ngDragover) {
          $scope.$apply(function() {
            $scope.$eval(iAttrs.ngDragover, {$event: e});
          });
        }
      });

      element.on('dragenter', function(e) {
        e.preventDefault();
        var type = (e.originalEvent || e).dataTransfer.getData('ngdrag/type');

        if(type === iAttrs.allowDrop) {
          event.dataTransfer.dropEffect = 'move';
        } else {
          event.dataTransfer.dropEffect = 'none';
        }
      });

      element.on('drop', function(e) {
        e.preventDefault();

        var id = (e.originalEvent || e).dataTransfer.getData(iAttrs.allowDrop || 'ngdrag/id');
        if(!id) { return; }
        var from = DragData.get(id);

        $scope.$apply(function() {
          $scope.$eval(iAttrs.ngDrop, {
            $from: from,
            $event: e
          });
        });
      });
    }
  };
}]);

angular.module('angular-drag-drop').service('DragData', function () {

  /**
   * @ngdoc service
   * @name angular-drag-drop.service:DragData
   * @description `DragData` is a service that holds references to $scopes for
   * the drag directives. The source will be exposed for the ng-drop expression.
   */

        var index = {};

        /**
         * @ngdoc
         * @methodOf angular-drag-drop.service:DragData
         * @name angular-drag-drop.service:DragData#add
         * @param {Scope} scope The scope to track
         * @description `add` adds a scope to the service to be tracked by its
         * $id.
         */

    this.add = function(scope) {
        if(scope.$id) {
            index[scope.$id] = scope;

            //Cleanup
            scope.$on('$destroy', function() {
              delete index[scope.$id];
            });
        }
    };

    /**
     * @ngdoc
     * @methodOf angular-drag-drop.service:DragData
     * @name angular-drag-drop.service:DragData#get
     * @param {String} id The $id of the scope that you want returned.
     * @description `get` returns the scope with the given $id.
     */

    this.get = function(id) {
        if(index[id]) {
            return index[id];
        }
    };
});
