/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('EditProfileController', ['$scope', '$log', '$timeout', 'UserAuthService', '$firebaseObject', function($scope, $log, $timeout, UserAuthService, $firebaseObject) {
	var vm = this,
		user = new UserAuthService(),
		ref = firebase.database().ref().child('users'),
		syncObject = $firebaseObject(ref);
	vm.userData = {};
	vm.userData.name = localStorage.getItem('user_name');
	vm.userData.email = localStorage.getItem('user_email');
	// vm.userData.username = 
	
	syncObject.$bindTo($scope, 'users');

	// unreliable way to make sure function is executed after 
	// firbase auth stuff is done
	$timeout(function() {
		user.setUser();
		$log.log('document is ready');
	}, 2000);
	
	vm.addUid = function() {
		
	};

	vm.signOut = function() {
		firebase.auth().signOut();
		localStorage.clear();
		$log.log('signed out');
		window.open('/', '_self');
	};

	vm.saveUserData = function() {
		var data = {
			uid: firebase.auth().currentUser.uid,
			name: vm.userData.name,
			email: vm.userData.email,
			username: vm.userData.username
		};	
		// firebase.database().ref()
		user.setData(data)
	};
	vm.resetPassword = function() {

	};
	vm.getUserData = function() {
		// var id = firebase.auth().currentUser.uid;
		// user.getUserData(id);	
		$log.log('db data: ', $scope.users);	
	}
	
}]);