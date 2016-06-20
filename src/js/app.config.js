/*eslint angular/di: [2,"array"]*/
angular.module('eventPlan').
	config(['$locationProvider', '$routeProvider', 
		function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');

			$routeProvider.
				when('/sign-in', {
					template: '<sign-up-directive>'
				}).
				otherwise('/sign-in');
		}
	]);