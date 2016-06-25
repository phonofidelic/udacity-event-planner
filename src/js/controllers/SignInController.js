/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('SignInController', ['$scope', '$window', '$log', function($scope, $window, $log) {
	var vm = this;

	vm.signIn = function(email, password){
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			// TODO: handle errors
			$log.log('login error message: ', error.message, error.code);
		});

		// navigate to 
		$window.open('#!/edit-profile', '_self');
	};
}]);