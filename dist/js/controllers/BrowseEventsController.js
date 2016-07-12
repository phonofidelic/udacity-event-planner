/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('BrowseEventsController', ['$scope', '$log', '$firebaseObject', '$firebaseArray', function($scope, $log, $firebaseObject, $firebaseArray) {
	var vm = this;

	//get all event entries from db and save in local array
	var eventsRef = firebase.database().ref().child('events');
	vm.events = $firebaseArray(eventsRef);

	function initMap(item) {
		var map = new google.maps.Map(document.getElementById('map'+item.$id), {
			center: {lat: -34.397, lng: 150.644},
    		scrollwheel: false,
    		zoom: 8
    	});		
	}
	google.maps.event.addDomListener(window, "load", initMap);

	vm.getMap = function(item) {
		$log.log('map'+item.$id);
		initMap(item);	
	};
}]);