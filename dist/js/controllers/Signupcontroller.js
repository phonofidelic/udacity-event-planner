/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('SignUpController', ['$scope', '$log', 'IssueTracker', 'PasswordStrengthMeter', function($scope, $log, IssueTracker, PasswordStrengthMeter) {
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

		// check password
		if (angular.isUndefined(vm.data.password1)) {
			issueTracker.add('Pleas create a password.');
		}

		// check that passwords match
		if (vm.data.password1 !== vm.data.password2) {
			issueTracker.add('Passwords do not match.');
		}

		var inputIssues = issueTracker.retrieve();

		$log.log('data: ', vm.data);
		$log.log(inputIssues);

		// after all inputs pass, send user-data to back-end (or 
		// whatever we're using as a back-end)
		vm.sendData(vm.data);
	};

	vm.sendData = function(data) {
		localStorage.setItem('user_name', data.name);
		localStorage.setItem('user_email', data.email);
	};

	// check password strength
	var passwordStrengthMeter = new PasswordStrengthMeter();
	vm.passwordStrength = function(password) {
		vm.passwordProgress = passwordStrengthMeter.passTest(password);	
		// send passwordProgress value for ng-style to set width of progress bar
		vm.passwordProgress = vm.passwordProgress+'%';
		$log.log('vm.passwordProgress: ', vm.passwordProgress);
		return vm.passwordProgress;
	};

}]);