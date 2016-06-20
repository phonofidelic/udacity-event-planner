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
		it('should be called', function() {
			spyOn(controller, 'checkValidation');

			controller.checkValidation();

			expect(controller.checkValidation).toHaveBeenCalled();
		});	
	});

	describe('sendData', function() {
		it('data object should be populated', function() {
			spyOn(controller, 'sendData');

			controller.data = {
				name: 'john',
				email: 'john@email.com',
				password1: 'abc123!@#',
				password2: 'abc123!@#'
			};
			
			controller.sendData(controller.data);

			expect(controller.data.name).toBeDefined();
			expect(controller.data.email).toBeDefined();
			expect(controller.data.password1).toBeDefined();
			expect(controller.sendData).toHaveBeenCalledWith({
				name: 'john',
				email: 'john@email.com',
				password1: 'abc123!@#',
				password2: 'abc123!@#'
			});
		});
	});
});