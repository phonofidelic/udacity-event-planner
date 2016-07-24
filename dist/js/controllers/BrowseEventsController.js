/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('BrowseEventsController', ['$scope', '$http', '$log','$window', '$firebaseObject', '$firebaseArray', function($scope, $http, $log, $window, $firebaseObject, $firebaseArray) {
	var vm = this;

	//get all event entries from db and save in local array
	var eventsRef = firebase.database().ref().child('events');
	vm.events = $firebaseArray(eventsRef);

	vm.signOut = function() {
		firebase.auth().signOut();
		localStorage.clear();
		$log.log('signed out');
		$window.open('/', '_self');
	};
}]);