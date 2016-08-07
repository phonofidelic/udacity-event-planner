/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').factory('PasswordStrengthMeter', ['$log', function($log) {
	function PasswordStrengthMeter() {
		this.points = {
			reccomendedChars: /[\!\@\#\$\%\^\&\*]/,
			hasLower: /[a-z]/,
			hasUpper: /[A-Z]/,
			hasNumber: /[0-9]/,
			notEmail: ''
		};
	};
	PasswordStrengthMeter.prototype = {
		passTest: function(password) {
			var status = {};
			status.strength = 0;
			// convert password input to an array of single character strings
			if (password) { password = password.split(''); } else { return; }

			// each time passTest is called, check each character against 
			// points. Increase strength by 10 for each passing condition.
			var result = this.points.reccomendedChars.test(password);
			if (result === true) {
				status.strength += 20;
				status.characters = true;
			}
			if (this.points.hasLower.test(password)) {
				status.strength += 20;
				status.hasLower = true;
			}
			if (this.points.hasUpper.test(password)) {
				status.strength += 20;
				status.hasUpper = true;
			}
			if (this.points.hasNumber.test(password)) {
				status.strength += 20;
				status.hasNumber = true;
			}
			if (password.length >= 6) {
				status.strength += 20;
				status.length = true;
			}
			$log.log('password: ', status);
			return status;
		}
	};
	return PasswordStrengthMeter;
}]);