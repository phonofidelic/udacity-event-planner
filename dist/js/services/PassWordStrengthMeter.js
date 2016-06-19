/*eslint angular/di: [2,"array"]*/
angular.module('signUp').factory('PasswordStrengthMeter', ['$log', function($log) {
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
			var strength = 0;
			// convert password input to an array of single character strings
			password = password.split('');

			// each time passTest is called, check each character against 
			// points. Increase strength by 10 for each passing condition.
			var result = this.points.reccomendedChars.test(password);
			if (result === true) {
				strength += 20;
			}
			if (this.points.hasLower.test(password)) {
				strength += 20;
			}
			if (this.points.hasUpper.test(password)) {
				strength += 20;
			}
			if (this.points.hasNumber.test(password)) {
				strength += 20;
			}
			if (password.length >= 6) {
				strength += 20;
			}
			



			// $log.log(result);
			$log.log('strength: ', strength);
			return strength;
		}
	};
	return PasswordStrengthMeter;
}]);