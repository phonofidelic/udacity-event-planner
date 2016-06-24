/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('EditProfileController', ['$scope', '$log', function($scope, $log) {
	var vm = this;
	vm.name = localStorage.getItem('user_name');
	vm.userData = {};

	vm.getUserData = function() {
		
	}

	vm.signOut = function() {
		firebase.auth().signOut();
		localStorage.clear();
		$log.log('signed out');
		window.open('/', '_self');
	}

	vm.saveUserData = function() {
		localStorage.setItem('user_name', vm.name);
		vm.username = localStorage.getItem('user_name');
	}
}]);