angular.module('instructorService', [])

.factory('Instructor', function($http) {

	// create a new object
	var instructorFactory = {};

	// get a single user
	instructorFactory.get = function(id) {
		return $http.get('/api/users/' + id);
	};

	// get all users
	instructorFactory.all = function() {
		return $http.get('/api/users/');
	};

	// create a user
	instructorFactory.create = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// update a user
	instructorFactory.update = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	// delete a user
	instructorFactory.delete = function(id) {
		return $http.delete('/api/users/' + id);
	};

	// return our entire userFactory object
	return instructorFactory;

});
