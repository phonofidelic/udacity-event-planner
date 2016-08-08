angular.module('eventPlan').controller('HomeController', ['$scope', '$timeout','$window', '$log', function($scope, $timeout, $window, $log) {
	var vm = this;

	$scope.focusCreateAccount = function() {
		$timeout(function() { angular.element('#inp-name').focus(); }, 100);
		$log.log('timeout');
	};

	$scope.focusSignIn = function() {
		$timeout(function() { angular.element('#sgn-email').focus(); }, 100);
		$log.log('timeout');
	};
}]);