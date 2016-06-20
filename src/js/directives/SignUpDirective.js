angular.module('eventPlan')
.directive('signUpDirective', function() {
	return {
		templateUrl: 'templates/partials/sign-up.html',
		controller: 'SignUpController'
	};
});