app.directive('toast', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $timeout(function() {
        scope.toasts.pop();
      }, 20000);
    }
  };
});
