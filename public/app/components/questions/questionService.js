angular.module('questionService',[])
.factory('Question', function($http) {
  var questionFactory = {};
  // get all question
  questionFactory.all = function() {
    return $http.get('/api/questions/');
  };
  // create a question
  questionFactory.create = function(questionData) {
    return $http.post('http://125.212.233.51:9000/api/gmat/post-question', questionData);
  } ;

  // get single question
  questionFactory.get = function(id) {
    return $http.get('/api/questions/' + id );
  };
  // update a question
  questionFactory.update = function(id,questionData) {
    return $http.put('/api/questions/' + id,questionData);
  };
  // delete a question
  questionFactory.delete = function(id) {
    return $http.delete('/api/questions/' + id);
  };
  //return our entire questionFactory object
  return questionFactory;

});
