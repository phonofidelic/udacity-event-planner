/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').controller('SignInController', ['$scope', '$window', '$log', 'Auth', '$firebaseAuth', 'UserAuthService', function($scope, $window, $log, Auth, $firebaseAuth, UserAuthService) {
	var vm = this;
	var  userAuthService = new UserAuthService();
		auth = $firebaseAuth();
		var provider = new firebase.auth.GoogleAuthProvider();

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
	};

	vm.googleSignIn = function() {
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// var profile = googleUser.getBasicProfile();
			var token = result.credential.accessToken,
				user = result.user;	
			// $log.log('profile: ', profile);
			$log.log('user: ', user);
			$log.log('uid: ', user.uid);

			userAuthService.setData(user.uid, user);

			$window.open('#!/edit-profile', '_self');
		}).catch(function(error) {
			var errorCode = error.code,
				errorMessage = error.message,
				email = error.email,
				credential = error.credential;
				$log.log('error: ', error);
		});
	};



	// vm.angularFireSignin = function() {
	// 	vm.firebaseUser = null;
	// 	vm.error = null;

	// 	auth.$signInAnonymously().then(function(firebaseUser) {
	// 		vm.firebaseUser = firebaseUser;
	// 	}).catch(function(error) {
	// 		$log.log('error: ', error);
	// 	})
	// };
}]);