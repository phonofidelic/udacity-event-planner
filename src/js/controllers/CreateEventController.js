/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('CreateEventController', ['$scope', '$log', '$firebaseObject', '$firebaseArray', 'UserAuthService', function($scope, $log, $firebaseObject, $firebaseArray, UserAuthService) {
	var vm = this,
		user = new UserAuthService(),
		ref = firebase.database().ref().child('events/'),
		dbObject = $firebaseObject(ref),
		dbArray = $firebaseArray(ref);

	vm.eventData = {};



    vm.autoAddress = function() {
        var defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-33.8902, 151.1759),
          new google.maps.LatLng(-33.8474, 151.2631));
        var input = document.getElementById('inp-event-location');
        var options = {
            // bounds: defaultBounds,
            types: ['address']
        };
        $scope.addrAoutocomplete = new google.maps.places.Autocomplete(input, options);
    };

    vm.saveEvent = function() {
    	firebase.database().ref().child('events/').set(vm.eventData);
    };
}]);