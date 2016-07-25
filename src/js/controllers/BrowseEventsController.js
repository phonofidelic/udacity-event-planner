/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('BrowseEventsController', ['$scope', '$http', '$log','$window', '$firebaseObject', '$firebaseArray', 'UserAuthService', function($scope, $http, $log, $window, $firebaseObject, $firebaseArray, UserAuthService) {
	var vm = this;
	var userAuthService = new UserAuthService();
	//get all event entries from db and save in local array
	var eventsRef = firebase.database().ref().child('events');
	vm.events = $firebaseArray(eventsRef);

	vm.signOut = function() {
		userAuthService.signOut();
	};
}]);