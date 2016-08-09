angular.module('eventPlan').controller('HomeController', ['$scope', '$timeout','$window', '$log', 'FocusService', function($scope, $timeout, $window, $lo, FocusService) {
	var vm = this;

	$scope.focusService = new FocusService();
}]);