angular.module('eventPlan')
.directive('editProfileDirective', function() {
	return {
		templateUrl: 'templates/partials/sec-edit-profile.html',
		controller: 'EditProfileController',
		controllerAs: 'vm'
	};
});