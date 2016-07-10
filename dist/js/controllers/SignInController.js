/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('SignInController', ['$scope', '$window', '$log', 'Auth', function($scope, $window, $log, Auth) {
	var vm = this;
		// auth = $firebaseAuth();

	vm.signIn = function(email, password){
		vm.firebaseUser = null;
		vm.error = null;

		Auth.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
			vm.firebaseUser = firebaseUser;
			$window.open('#!/edit-profile', '_self');
		}).catch(function(error) {
			// TODO: handle errors
			$log.log('login error message: ', error.message, error.code);
			vm.error = error;
			alert(error);
		});
		// navigate to 
		
	};

}]);