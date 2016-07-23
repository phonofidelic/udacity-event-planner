/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').factory('UserAuthService', ['$log', function($log) {
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
		}
	};
	return User;
}]);