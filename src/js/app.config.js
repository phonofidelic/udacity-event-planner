/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').
	config(['$locationProvider', '$routeProvider', 
		function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');

			$routeProvider.
				when('/', {
					templateUrl: 'home.html',
					controller: 'SignUpController',
					controllerAs: 'vm'
				}).
				when('/edit-profile', {
					templateUrl: 'templates/edit-profile.html',
					controller: 'EditProfileController',
					controllerAs: 'vm'
				});
		}
	]);