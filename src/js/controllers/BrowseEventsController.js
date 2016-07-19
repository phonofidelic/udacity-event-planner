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
	for (item in vm.events) {
		if (angular.isDefined(item.mapCenter)) {
			item.statMap = 'https://maps.googleapis.com/maps/api/staticmap?center='+item.mapCenter.lat+','+item.mapCenter.lng;
			return item.statMap;
		}
	}

	vm.getMapCenter = function(index) {
		$log.log(index);
		return vm.events[index].mapCenter;
	};


	$scope.map = {
		// center: vm.getMapCenter(i),
		zoom: 14
	};

	gMaps.then(function(maps) {

	});
}]);