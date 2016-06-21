/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('SignInController', ['$scope', '$log', function($scope, $log) {
	var vm = this;

	vm.signIn = function(email, password){
		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			// TODO: handle errors
			$log.error(error.message);
		});
	};
}]);