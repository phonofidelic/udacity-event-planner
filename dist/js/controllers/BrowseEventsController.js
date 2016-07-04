/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('BrowseEventsController', ['$scope', '$log', '$firebaseObject', '$firebaseArray', function($scope, $log, $firebaseObject, $firebaseArray) {
	var vm = this;

	//get all event entries from db and save in local array
	var eventsRef = firebase.database().ref().child('events');
	vm.events = $firebaseArray(eventsRef);
}]);