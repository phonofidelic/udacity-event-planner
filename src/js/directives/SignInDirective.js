angular.module('eventPlan')
.directive('signInDirective', function() {
	return {
		templateUrl: 'templates/partials/sign-in.html',
		controller: 'SignInController',
		controllerAs: 'vm'
	};
});