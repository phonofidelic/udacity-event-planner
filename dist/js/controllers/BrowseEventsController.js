/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('BrowseEventsController', ['$scope', '$log', '$firebaseObject', '$firebaseArray', 'uiGmapGoogleMapApi', function($scope, $log, $firebaseObject, $firebaseArray, uiGmapGoogleMapApi) {
	var vm = this,
		gMaps = uiGmapGoogleMapApi;

	//get all event entries from db and save in local array
	var eventsRef = firebase.database().ref().child('events');
	vm.events = $firebaseArray(eventsRef);

	// function initMaps() {

	// 	var map = new google.maps.Map(document.getElementById('map'+item.$id), {
	// 		center: {lat: -34.397, lng: 150.644},
 //    		scrollwheel: false,
 //    		zoom: 8
 //    	});		
	// }

	// vm.getMap = function(item) {
	// 	$log.log('map'+item.$id);
	// 	initMap(item);	
	// };

	$scope.map = {
		center: {
			latitude: 45,
			longitude: -73
		},
		zoom: 14
	};

	gMaps.then(function(maps) {

	});
}]);