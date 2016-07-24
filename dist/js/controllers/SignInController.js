/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('SignInController', ['$scope', '$window', '$log', 'Auth', 'IssueTracker', function($scope, $window, $log, Auth, IssueTracker) {
	var vm = this;

	vm.signIn = function(email, password, status){
		vm.firebaseUser = null;
		vm.error = null;

		if (status) {
			Auth.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
				vm.firebaseUser = firebaseUser;
				$window.open('#!/edit-profile', '_self');
			}).catch(function(error) {
				// TODO: handle errors
				$log.log('login error message: ', error.message, error.code);
				vm.error = error.message;
				// alert(error);
			});
		}
	};

	vm.checValidation = function() {
		var issueTracker = new IssueTracker();
		var status;

		if (angular.isUndefined(vm.email)) {
			issueTracker.add('Pleas enter your email.');
		}

		if (angular.isUndefined(vm.password)) {
			issueTracker.add('Pleas enter your password.');
		}

		if (issueTracker.issues.length === 0) {
			status = true;
		} else {
			status = false;
			vm.issues = issueTracker.issues;
		}
		issueTracker.clearIssues();
		return status;
	};
}]);