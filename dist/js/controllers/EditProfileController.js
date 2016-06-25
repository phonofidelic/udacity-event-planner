/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('EditProfileController', ['$scope', '$window', '$log', '$timeout', 'UserAuthService', '$firebaseObject', function($scope, $window, $log, $timeout, UserAuthService, $firebaseObject) {
	var vm = this,
		user = new UserAuthService(),
		ref = firebase.database().ref().child('users'),
		syncObject = $firebaseObject(ref);

	// initialize data model
	vm.userData = {};

	// async request to firebase db
	syncObject.$loaded()
		.then(function(data) {
			var user = data[firebase.auth().currentUser.uid];
			$log.log('from syncObject: ', user);
			// set user data locally
			vm.userData.uid = firebase.auth().currentUser.uid;
			vm.userData.username = user.username || firebase.auth().currentUser.username;
			vm.userData.name = user.name;
			vm.userData.email = user.email;
		})
		.catch(function(error) {
			$log.log('syncObject error: ', error);
		});



	
	syncObject.$bindTo($scope, 'users');

	
	vm.addUid = function() {
		
	};

	vm.signOut = function() {
		firebase.auth().signOut();
		localStorage.clear();
		$log.log('signed out');
		$window.open('/', '_self');
	};

	vm.saveUserData = function() {
		var data = vm.userData;
		var uid = vm.userData.uid;	
		user.setData(uid, data);
	};
	vm.resetPassword = function() {

	};
	vm.getUserData = function() {
		// var id = firebase.auth().currentUser.uid;
		// user.getUserData(id);	
		// $log.log('db data: ', $scope.users[firebase.auth().currentUser.uid]);
		$log.log('db data: ', syncObject);	
	};
	
}]);