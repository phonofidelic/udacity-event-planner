angular.module('eventPlan').factory('IssueTracker', function() {
	function IssueTracker() {
		this.issues = [];
	};
	IssueTracker.prototype = {
		add: function(issue) {
			this.issues.push(issue);
		},
		retrieve: function() {
			var message = '';
			switch (this.issues.length) {
			case 0:
				break;
			case 1: 
				message = 'Please fix the following issue:\n' + this.issues[0];
				break;
			default:
				message = 'Please fix the following issues:\n' + this.issues.join('\n');
				break;
			}
			return message;
		}
	};
	return IssueTracker;
});
