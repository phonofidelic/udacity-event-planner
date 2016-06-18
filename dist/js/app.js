/*eslint angular/di: [2,"array"]*/
'use-strict';
angular.module('signUp', []);

angular.module('signUp').controller('SignUppController', ['$scope', function($scope) {
	var data = {},
		inputArr = [],
		vm = this;

	vm.checkValidation = function() {
		// collect all input values
		angular.element('input.form-control').each(function() {
			var input = angular.element(vm);
			inputArr.push(input[0]);
		});

		$log.log('inputArr: ', inputArr);
	};
}]);