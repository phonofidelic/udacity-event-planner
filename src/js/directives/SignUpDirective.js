angular.module('eventPlan')
.directive('signUpDirective', function() {
	return {
		templateUrl: 'templates/sign-up.html',
		controller: 'SignUpController'
	};
});