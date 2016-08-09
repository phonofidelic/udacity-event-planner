'use-strict';
angular.module('eventPlan').factory('FocusService', ['$timeout', '$log', function($timeout, $log) {
	function focusService() {};

	focusService.prototype.focus = function(element) {
		$timeout(function() { angular.element(element).focus(); }, 100);
		$log.log('focus');
	}
	return focusService;
}])