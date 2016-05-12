(function(angular) {
  'use strict';
  angular.module('app')
    .controller('TodoController', TodoController);

  function TodoController(
    $scope, $firebaseArray, $window
  ) {
    var Firebase = $window.Firebase;
    var url = 'https://todo-korea.firebaseio.com/todos';
    var fireRef = new Firebase(url);

    // TODO를 firebase에 연결시키기
    $scope.todos = $firebaseArray(fireRef);
    $scope.newTodo = '';

    $scope.addTodo = function() {
      if ($scope.newTodo === '') {
        return;
      }
      $scope.todos.$add({
        title: $scope.newTodo,
        completed: false
      });
      $scope.newTodo = '';
    };
    //====================================================
    //  TODO가 바뀔때마다 돌아가는 function
    //====================================================
    // $scope.todos
    $scope.$watch('todos', function() {
      var total = 0;
      var remaining = 0;
      $scope.todos.forEach(function(todo) {
        if (!todo || !todo.title) {
          return;
        }
        total++;
        if (todo.completed === false) {
          remaining++;
        }
      });
      $scope.total = total;
      $scope.remaining = remaining;
    }, true);


    $scope.removeTodo = function(todo) {
      $scope.todos.$remove(todo);
    };

    $scope.markAll = function(allCompleted) {
      $scope.todos.forEach(function(todo) {
        todo.completed = allCompleted;
        $scope.todos.$save(todo);
      });
    };


  }
})(angular);

// Create
// Read
// Delete

// Dependency Injection

// TwoWay data binding

// ThreeWay data binding

// ng-enter Directive.

// 




// Reference
// Inversion of Control
//   So now control is inverted... instead of the computer accepting user input in a fixed order, 
// the user controls the order in which the data is entered, and when the data is saved in the database.
// Basically, anything with an event loop, callbacks, or execute triggers falls into this category.
