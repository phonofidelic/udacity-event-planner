/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('signUp', []);

angular.module('signUp').controller('SignUppController', ['$scope', '$log', 'IssueTracker', 'PasswordStrengthMeter', function($scope, $log, IssueTracker, PasswordStrengthMeter) {
	var inputArr = [],
		vm = this;
	vm.data = {};

	var issueTracker = new IssueTracker();

	vm.checkValidation = function() {
		// check name input
		if (angular.isUndefined(vm.data.name)) {
			issueTracker.add('Pleas enter your name.');
		}

		// check email input
		if (angular.isUndefined(vm.data.email)) {
			issueTracker.add('Please enter a vallid email address.');
		}

		// // check password
		// if (angular.isUndefined(vm.data.password1)) {
		// 	issueTracker.add('Pleas create a password.');
		// }

		// check that passwords match

		var inputIssues = issueTracker.retrieve();

		$log.log('data: ', vm.data);
		$log.log(inputIssues);

	};

	// check password strength
	var passwordStrengthMeter = new PasswordStrengthMeter();
	vm.passwordStrength = function(password) {
		vm.passwordProgress = passwordStrengthMeter.passTest(password);
		
		
		vm.passwordProgress = vm.passwordProgress+'%';
		$log.log('vm.passwordProgress: ', vm.passwordProgress);
		return vm.passwordProgress;
	};

}]);

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

angular.module('signUp').factory('IssueTracker', function() {
	function IssueTracker() {
		this.issues = [];
	};
	IssueTracker.prototype = {
		add: function(issue) {
			this.issues.push(issue);
		},
		retrieve: function() {
			var message = '';
			switch (this.issues.length) {
			case 0:
				break;
			case 1: 
				message = 'Please fix the following issue:\n' + this.issues[0];
				break;
			case 2:
				message = 'Please fix the following issues:\n' + this.issues.join('\n');
				break;
			}
			return message;
		}
	};
	return IssueTracker;
});
