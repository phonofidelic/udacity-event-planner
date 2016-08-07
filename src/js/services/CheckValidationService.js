/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').factory('CheckValidationService', ['$log', function($log) {
	function CheckValidationService() {
		var types = {};
		types.email = 'Please enter a vallid email address.';
		types.passwordLength = 'Passwords must be at least 6 characters.';
	};

	CheckValidationService.prototype = {
		validate: function(input, type) {
			var status;
			
			switch (type) {
				case 'text':
					if (angular.isDefined(input)) {
						status = true;
					} else {
						status = false;
					}
					break;
				case 'email':
					// regex for email taken from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
					var email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
					if (email.test(input)) {
						status = true;
					} else {
						status = false;
					}
					break;
				case 'password':
					if (angular.isDefined(input) && input.length > 5) {
						status = true;
					} else {
						status = false;
					}
					break;
				default:
					status = false;
			}
			return status
		}
	};
	return CheckValidationService;
}]);