app.controller('AppCtrl', ['$scope', '$location', '$timeout', 'user',
  function($scope, $location, $timeout, user) {
    if ((user.name == undefined || user.name == "") && !user.logged) $location.path("/login");
    $scope.$on('$routeChangeStart', function(next, current) {
      if ((user.name == undefined || user.name == "") && !user.logged) $location.path("/login");
    });
    // Initialize the scope defaults.
    // Start Controller methods
    // Toast is in parent scope
    $scope.toasts = [];
    $scope.showToast = function(message) {
      $scope.toasts.unshift(message);
    }
    $scope.toggleToast = function() {
      $scope.toastShown = !$scope.toastShown;
    };
  }
]);
