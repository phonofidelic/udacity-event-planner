/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').factory('UserAuthService', ['$log', function($log) {
	// 
	function User() {
		this.data = {};
	};
	User.prototype = {
		register: function(email, password) {
			firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.catch(function(error) {
				// TODO: handle errors
				$log.error(error.message);
			});
		},
		setUserInDatabase: function(email, name) {
			var timestamp = Date.now();
			var userData = {
				email: email,
				name: name,
				id: timestamp
			};
			firebase.database().ref('users/' + userData.id).set(userData);
		},
		getUserData: function() {
			
		}
	};
	return User;
}]);