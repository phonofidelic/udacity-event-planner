/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('EditProfileController', ['$scope', '$window', '$log', '$timeout', 'UserAuthService', '$firebaseObject', function($scope, $window, $log, $timeout, UserAuthService, $firebaseObject) {
	var vm = this,
		userAuthService = new UserAuthService(),
		ref = firebase.database().ref().child('users'),
		syncObject = $firebaseObject(ref);

	// initialize data model
	vm.userData = {};

	// async request to firebase db retrievs saved user-data and sets local variables
	syncObject.$loaded()
		.then(function(data) {
			var uid = firebase.auth().currentUser.uid;
			var user = data[uid];
			$log.log('from syncObject: ', user);
			
			vm.userData.uid = uid;

			// if username is exists in db, set local username variable to it 
			if (user.username) {
				vm.userData.username = user.username;
			} else {
				// if username does not exist in db, set it to users email username
				var email = firebase.auth().currentUser.email;
				vm.userData.username = email.substr(0, email.indexOf('@'));
				userAuthService.setOne(uid, 'username', vm.userData.username);
			}

			if (angular.isUndefined(user.name)) {
				vm.userData.name = 'no name';
			} else {
				vm.userData.name = user.name;
			}
			vm.userData.email = user.email || firebase.auth().currentUser.email;

			if (angular.isUndefined(user.avatar)) {
				// set firstLetter variable for user avatar
				vm.firstLetter = vm.userData.email.toLowerCase().trim().split('')[0];
				var randomHexString = (Math.random()*0xFFFFFF<<0).toString(16);
				vm.userData.avatar = 'https://avatars.discourse.org/v2/letter/'+vm.firstLetter+'/'+randomHexString+'/';
				userAuthService.setOne(uid, 'avatar', vm.userData.avatar)
			} else {
				vm.userData.avatar = user.avatar;
			}
		})
		.catch(function(error) {
			$log.log('syncObject error: ', error);
		});

	syncObject.$bindTo($scope, 'users');

	vm.signOut = function() {
		userAuthService.signOut();
	};

	vm.saveUserData = function() {
		var data = vm.userData;
		var uid = vm.userData.uid;	
		$log.log('data from saveUserData: ', data);
		userAuthService.setData(uid, data);

	};
	vm.resetPassword = function() {

	};

	vm.getUserAvatar = function() {
		// var firstLetter = vm.firstLetter;
		// $log.log('firstLetter: ', firstLetter);
	}

	vm.getUserData = function() {
		// var id = firebase.auth().currentUser.uid;
		// userAuthService.getUserData(id);	
		// $log.log('db data: ', $scope.users[firebase.auth().currentUser.uid]);
		$log.log('db data: ', syncObject);	
	};
}]);