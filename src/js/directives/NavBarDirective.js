angular.module('eventPlan')
.directive('navBarDirective', function() {
	return {
		templateUrl: 'templates/partials/navbar.html',
		controller: 'NavBarController',
		controllerAs: 'vm'
	};
});