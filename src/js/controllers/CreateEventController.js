/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('eventPlan').controller('CreateEventController', ['$scope', '$window', '$log', '$firebaseObject', '$firebaseArray', 'UserAuthService', 'IssueTracker', function($scope, $window, $log, $firebaseObject, $firebaseArray, UserAuthService, IssueTracker) {
	var vm = this,
		user = new UserAuthService(),
		ref = firebase.database().ref().child('events'),
		dbObject = $firebaseObject(ref),
		dbArray = $firebaseArray(ref),
        usrRef = firebase.database().ref().child('users'),
        usrObject = $firebaseObject(usrRef);

	vm.eventData = {};
	vm.eventData.eventGuests = [];

    // get user data from db and set username as host
    usrObject.$loaded()
        .then(function(data) {
            var user = data[firebase.auth().currentUser.uid];
            vm.eventData.eventHost = user.username;
        })
        .catch(function(error) {
            // handle error
            $log.error('usrObject error: ', error);
        });

	dbObject.$loaded()
		.then(function(data) {
			$log.log('from dbObject: ', data);
		})
		.catch(function(error) {
			$log.log('syncObject error: ', error);
		});

	// datetime picker setup
	$('#inp-event-start-time').datetimepicker();

	$('#inp-event-end-time').datetimepicker();

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

	vm.getEventStartTime = function(event) {
		vm.eventData.eventStartTime = event.target.value;
	};

	vm.getEventEndTime = function(event) {
		vm.eventData.eventEndTime = event.target.value;
	};

	vm.getEventAddress = function() {
		$log.log($scope.addrAoutocomplete.getPlace());
		vm.eventData.eventLocation = $scope.addrAoutocomplete.getPlace();
	}

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

		if (angular.isUndefined(vm.eventData.eventLocation)) {
			issueTracker.add('Where will your event be held?');
		}

		$log.log('issues: ', issueTracker.retrieve());

		if (issueTracker.issues.length === 0) {
			status = true;
		} else {
			status = false;
		}
		$log.log('status: ', status);
		issueTracker.clearIssues();
		return status;
	};

	vm.saveEvent = function(validation) {
		if (validation === true) {
			dbArray.$add(vm.eventData)
				.then(function(ref) {
					$window.open('#!/events', '_self');
				}).catch(function(error) {
					$log.log('error: ', error);
				});
		} else {
			$log.log('error');
		}

	};

}]);