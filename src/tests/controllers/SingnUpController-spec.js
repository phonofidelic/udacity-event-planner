describe('SignUpController', function() {
	var $rootScope,
		$scope,
		$controller;

	beforeEach(function() {
		module('eventPlan');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			controller = $injector.get('$controller')('SignUpController', {$scope: $scope});
		});
	});
	describe('hello world test', function() {
		it('should be true', function() {
			expect(true).toBeTruthy();
		});	
	});

	describe('check validation', function() {
		it('should check validation', function() {
			spyOn(controller, 'checkValidation');

			controller.checkValidation();

			expect(controller.checkValidation).toHaveBeenCalled();
		});	
	});
});