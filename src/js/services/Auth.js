/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').factory('Auth', ['$firebaseAuth', function($firebaseAuth) {
	return $firebaseAuth();
}]);