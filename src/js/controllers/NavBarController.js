/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('NavBarController', ['$scope', 'FocusService', function($scope, FocusService) {
	$scope.focusService = new FocusService();
}]);