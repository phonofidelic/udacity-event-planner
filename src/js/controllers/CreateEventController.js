/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('CreateEventController', ['$scope', '$http', '$window', '$log', '$firebaseObject', '$firebaseArray', 'UserAuthService', 'IssueTracker', function($scope, $http, $window, $log, $firebaseObject, $firebaseArray, UserAuthService, IssueTracker) {
	var vm = this,
		userAuthService = new UserAuthService(),
		ref = firebase.database().ref().child('events'),
		dbArray = $firebaseArray(ref),
		usrRef = firebase.database().ref().child('users'),
		usrObject = $firebaseObject(usrRef);

	vm.eventData = {};
	vm.eventData.eventGuests = [];
	vm.eventData.mapCenter = {};

    // get user data from db and set username as host
    usrObject.$loaded()
        .then(function(data) {
            var user = data[firebase.auth().currentUser.uid];
            vm.eventData.eventHost = user.username;
            vm.eventData.hostAvatar = user.avatar;
        })
        .catch(function(error) {
            // handle error
            $log.error('usrObject error: ', error);
        });

	// datetime picker setup
	angular.element('#inp-event-start-time').datetimepicker();
	angular.element('#inp-event-end-time').datetimepicker();

	vm.autoAddress = function() {
		var input = document.getElementById('inp-event-location');
		var options = {
			types: ['address']
		};
		$scope.addrAoutocomplete = new google.maps.places.Autocomplete(input, options);
	};

	vm.getEventStartTime = function() {
		var startVal = angular.element('#inp-event-start-time').val();
		vm.eventData.eventStartTime = moment(startVal).format('dddd, MM-DD-YYYY');
		// set start epoch for validation comparison
		vm.eventData.eventStartTimeEpoch = moment(startVal).valueOf();
	};

	vm.getEventEndTime = function(event) {
		var endVal = angular.element('#inp-event-end-time').val();
		vm.eventData.eventEndTime = moment(endVal).format('dddd, MM-DD-YYYY');
		// set end epoch for validation comparison
		vm.eventData.eventEndTimeEpoch = moment(endVal).valueOf();
	};

	vm.getEventAddress = function() {
		$log.log('$scope.addrAoutocomplete.getPlace(): ', $scope.addrAoutocomplete.getPlace());
		var locationData = $scope.addrAoutocomplete.getPlace();
		if (angular.isDefined(locationData)) {
			vm.eventData.eventLocation = locationData.name;
			$log.log('vm.eventData.eventLocation: ', vm.eventData.eventLocation);
		}
	};

	vm.geocode = function(addr) {
		if (angular.isDefined(addr)) {
			var address = addr;
			$log.log('geocode address: ', address);
		}
		var mapCenter = $http({
			method: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCXcFHRjLncSzc1UBklhRueyStZdZHaELA'
		}).then(function successCallback(response) {
			// handle response
			vm.eventData.mapCenter = response.data.results[0].geometry.location;
			$log.log('geocode response: ', response.data.results[0].geometry.location);
			// return response.data.results[0].geometry.location		
		}, function errorCallback(error) {
			// handle error
			$log.log('geocode error: ', error);
		});
		return mapCenter;
	};

	vm.addGuest = function(guest) {
		vm.eventData.eventGuests.push(guest);
	};

	vm.removeGuest = function(guest) {
		$log.log('remove ', guest);
		vm.eventData.eventGuests.splice(guest, 1);
	};

	vm.checkValidation = function() {
		var issueTracker = new IssueTracker();
		var status;

		if (angular.isUndefined(vm.eventData.eventHost)) {
			issueTracker.add('Who will host your event?.');
		}

		if (angular.isUndefined(vm.eventData.eventName)) {
			issueTracker.add('Please name your event.');
		}

		if (angular.isUndefined(vm.eventData.eventType)) {
			issueTracker.add('Please select a type of event.');
		}

		if (angular.isUndefined(vm.eventData.eventStartTime)) {
			issueTracker.add('When will your event begin?');
		}

		if (angular.isUndefined(vm.eventData.eventEndTime)) {
			issueTracker.add('When will your event end?');
		}

		if (vm.eventData.eventStartTimeEpoch > vm.eventData.eventEndTimeEpoch) {
			issueTracker.add('Sorry, your event cannot start before it begins.');
		}

		if (angular.isUndefined(vm.eventData.eventLocation)) {
			issueTracker.add('Where will your event be held?');
		}

		$log.log('issues: ', issueTracker.retrieve());

		if (issueTracker.issues.length === 0) {
			status = true;
		} else {
			status = false;
			vm.issues = issueTracker.issues;
		}
		$log.log('status: ', status);
		issueTracker.clearIssues();
		return status;
	};

	vm.saveEvent = function() {
		// geocode is called with the result of getAddress as parameter and sets mapCenter coords
		// Once geocode is resolved, run validation check and send eventData object to db.
		vm.geocode(vm.getEventAddress())
		.then(function(){
			if (vm.checkValidation()) {
				dbArray.$add(vm.eventData)
					.then(function(ref) {
						$window.open('#!/events', '_self');
					}).catch(function(error) {
						$log.log('error: ', error);
					});
				// $log.log('data to send: ', vm.eventData);
			} else {
				$log.log('error');
			}
		}, 
		function(error) {
			$log.log('error: ', error);
		});
	};

	vm.signOut = function() {
		userAuthService.signOut();
	};
}]);