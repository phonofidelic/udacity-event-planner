/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('EditProfileController', ['$scope', '$window', '$log', '$timeout', 'UserAuthService', '$firebaseObject', function($scope, $window, $log, $timeout, UserAuthService, $firebaseObject) {
	var vm = this,
		user = new UserAuthService(),
		ref = firebase.database().ref().child('users'),
		syncObject = $firebaseObject(ref);

	// initialize data model
	vm.userData = {};

	// async request to firebase db
	// vm.test = function() {
	syncObject.$loaded()
		.then(function(data) {
			var user = data[firebase.auth().currentUser.uid];
			$log.log('from syncObject: ', user);
			// get userdata from db and set local vars
			vm.userData.uid = firebase.auth().currentUser.uid;
			vm.userData.username = user.username || firebase.auth().currentUser.username;
			if (angular.isUndefined(user.name)) {
				vm.userData.name = 'no name';
			} else {
				vm.userData.name = user.name;
			}
			
			vm.userData.email = user.email || firebase.auth().currentUser.email;
		})
		.catch(function(error) {
			$log.log('syncObject error: ', error);
		});
	// };

	syncObject.$bindTo($scope, 'users');

	vm.signOut = function() {
		firebase.auth().signOut();
		localStorage.clear();
		$log.log('signed out');
		$window.open('/', '_self');
	};

	vm.saveUserData = function() {
		var data = vm.userData;
		var uid = vm.userData.uid;	
		$log.log('data from saveUserData: ', data);
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