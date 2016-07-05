/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').
	config(['$locationProvider', '$routeProvider', 
		function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');

			$routeProvider.
				when('/', {
					templateUrl: 'templates/home.html',
					controller: 'SignUpController',
					controllerAs: 'vm'
				}).
				when('/main', {
					templateUrl: 'templates/main.html'
				}).
				when('/edit-profile', {
					templateUrl: 'templates/edit-profile.html',
					controller: 'EditProfileController',
					controllerAs: 'vm'
				}).
				when('/events', {
					templateUrl: 'templates/browse-events.html',
					controller: 'BrowseEventsController',
					controllerAs: 'vm'
				}).
				when('/create-event', {
					templateUrl: 'templates/create-event.html',
					controller: 'CreateEventController',
					controllerAs: 'vm'
				});
		}
	]);