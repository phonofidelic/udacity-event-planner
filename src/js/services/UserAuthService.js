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
				.then(function(user) {
					$log.log('User created with uid: ' + user.uid);
				})
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
		setData: function(user, newData) {
			// this.data./* newDataKey */ = newData;
			firebase.database().ref('users/' + user).set(newData);
		},
		getUserData: function(id) {
			firebase.database().ref('users/' + id).on('value', function(snapshot) {
				$log.log('db snapshot: ', snapshot.val());
			});
		},
		dbRef: function(id) {
			firebase.database().ref('users/' + id);
		}
	};
	return User;
}]);