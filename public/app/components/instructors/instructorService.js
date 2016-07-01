angular.module('instructorService', [])

.factory('Instructor', function($http) {

	// create a new object
	var instructorFactory = {};

	// get a single user
	instructorFactory.get = function(id) {
		return $http.get('/api/instructors/' + id);
	};

	// get all users
	instructorFactory.all = function() {
		return $http.get('/api/instructors/');
	};

	// create a user
	instructorFactory.create = function(userData) {
		return $http.post('/api/instructors/', userData);
	};

	// update a user
	instructorFactory.update = function(id, userData) {
		return $http.put('/api/instructors/' + id, userData);
	};

	// delete a user
	instructorFactory.delete = function(id) {
		return $http.delete('/api/instructors/' + id);
	};

	// return our entire userFactory object
	return instructorFactory;

});
