/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('SignUpController', ['$scope','$window', '$log', 'IssueTracker', 'PasswordStrengthMeter', 'UserAuthService', 'Auth', '$firebaseObject', function($scope, $window, $log, IssueTracker, PasswordStrengthMeter, UserAuthService, Auth, $firebaseObject) {
	var inputArr = [],
		vm = this;

	// initialize data model
	vm.data = {};

	var issueTracker = new IssueTracker(),
		user = new UserAuthService();

	vm.checkValidation = function() {
		var status;
		// check name input
		if (angular.isUndefined(vm.data.name)) {
			issueTracker.add('Pleas enter your name.');
			// return;
		}

		// check email input
		if (angular.isUndefined(vm.data.email)) {
			issueTracker.add('Please enter a vallid email address.');
			// return;
		}

		// check password
		if (angular.isUndefined(vm.data.password1)) {
			issueTracker.add('Pleas create a password.');
			// return;
		}

		// check that passwords match
		if (vm.data.password1 !== vm.data.password2) {
			issueTracker.add('Passwords do not match.');
			// return;
		}

		// check that passwords is at least 6 characters long
		if (vm.data.password1 && vm.data.password1.length < 6) {
			issueTracker.add('Passwords must be at least 6 characters.');
			// return;
		}

		var inputIssues = issueTracker.retrieve();

		// $log.log('data: ', vm.data);
		$log.log(inputIssues);
		$log.log('issues array: ', issueTracker.retrieveIssueArray());

		if (issueTracker.issues.length === 0) {
			// after all inputs pass, set status to be sent to createAccount
			status = true;
		} else {
			status = false;
		}
		issueTracker.clearIssues();
		return status;
	};

	vm.createAccount = function(validation) {
		vm.message  = null;
		vm.error = null;

		// check that validation returns true
		if(validation === true) {
			Auth.$createUserWithEmailAndPassword(vm.data.email, vm.data.password1)
				.then(function(userId) {
					// setData
					vm.message = 'User created with uid: ' + user.uid;
					user.setData(userId.uid, vm.data);
					$window.open('#!/edit-profile', '_self');
				}).catch(function(error) {
					vm.error = error;
				});
		}
	}

	// check password strength
	var passwordStrengthMeter = new PasswordStrengthMeter();
	vm.passwordStrength = function(password) {
		vm.passwordProgress = passwordStrengthMeter.passTest(password);	
		// send passwordProgress value for ng-style to set width of progress bar
		vm.passwordProgress = vm.passwordProgress+'%';
		// $log.log('vm.passwordProgress: ', vm.passwordProgress);
		return vm.passwordProgress;
	};

}]);