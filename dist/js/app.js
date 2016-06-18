/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('signUp', []);

angular.module('signUp').controller('SignUppController', ['$scope', '$log', 'IssueTracker', function($scope, $log, IssueTracker) {
	var inputArr = [],
		vm = this;
	vm.data = {};

	var issueTracker = new IssueTracker();

	vm.checkValidation = function() {
		// check name input
		if (vm.data.name === undefined) {
			issueTracker.add('Pleas enter your name.');
		}

		// check email input
		if (vm.data.email === undefined) {
			issueTracker.add('Please enter a vallid email address.');
		}

		// check password
		if (vm.data.password1 === undefined) {
			issueTracker.add('Pleas create a password.')
		}

		// check that passwords match

		var inputIssues = issueTracker.retrieve();

		$log.log('data: ', vm.data);
		$log.log(inputIssues);

	};

	// check password strength
	vm.passwordStrength = function() {
		var password = vm.data.password1.split('');
		var strength = [];
		// var reccomendedChars = [/[A-z0-9\!\@\#\$\%\^\&\*]/g];
		var reccomendedChars = ['!', '@', '#', '$', '%', '^', '&', '*'];
		for (var i = 0; i < password.length; i++) {
			$log.log('password indexOf: ', password.indexOf(reccomendedChars[i]));
			var found = password.indexOf(reccomendedChars[i]);
			if (found != -1) {
				strength.push(found);
			}
		}
		$log.log('found: ', strength);
	};
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