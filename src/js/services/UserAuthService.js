/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').factory('UserAuthService', ['$log', '$window', function($log, $window) {
	// 
	function User() {
		this.data = {};
	};
	User.prototype = {
		setData: function(user, newData) {
			firebase.database().ref('users/' + user).set(newData);
		},
		setOne: function(user, field, newData) {
			firebase.database().ref('users/' + user + '/' + field).set(newData);
		},
		getUserData: function(id) {
			firebase.database().ref('users/' + id).on('value', function(snapshot) {
				$log.log('db snapshot: ', snapshot.val());
				return snapshot.val();
			});
		},
		signOut: function() {
			firebase.auth().signOut();
			localStorage.clear();
			$window.open('/#!/', '_self');

		}
	};
	return User;
}]);