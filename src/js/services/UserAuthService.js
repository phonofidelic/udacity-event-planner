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
		setUser: function() {
			this.data = {
				uid: firebase.auth().currentUser.uid,
				email: firebase.auth().currentUser.email
			};
			firebase.database().ref('users/' + this.data.uid).set(this.data);
		},
		setData: function(newData) {
			// this.data./* newDataKey */ = newData;
			firebase.database().ref('users/' + this.data.uid).set(newData);
		},
		getUserData: function() {
			var currentUserEmail = firebase.auth().currentUser.email;
			firebase.database().ref('users/' + currentUserEmail);
		}
	};
	return User;
}]);