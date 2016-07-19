/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('BrowseEventsController', ['$scope', '$http', '$log', '$firebaseObject', '$firebaseArray', 'uiGmapGoogleMapApi', function($scope, $http, $log, $firebaseObject, $firebaseArray, uiGmapGoogleMapApi) {
	var vm = this,
		gMaps = uiGmapGoogleMapApi;

	//get all event entries from db and save in local array
	var eventsRef = firebase.database().ref().child('events');
	vm.events = $firebaseArray(eventsRef);

	// vm.geocode = function(addr) {
	// 	if (angular.isDefined(addr)) {
	// 		var address = addr;
	// 		$log.log('geocode address: ', address);
	// 	}

	// 	$http({
	// 		method: 'GET',
	// 		url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCXcFHRjLncSzc1UBklhRueyStZdZHaELA'
	// 	}).then(function successCallback(response) {
	// 		// handle response
	// 		// var center = response.data.results[0].geometry.location;
	// 		$log.log('geocode response: ', response);
	// 		// return center
			
	// 	}, function errorCallback(response) {
	// 		// handle error
	// 	})
	// }

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