angular.module('questionService',[])
.factory('Question', function($http) {
  var questionFactory = {};
  // get all question
  questionFactory.all = function() {
    return $http.get('http://125.212.233.51:9000/api/gmat/questions');
  };
  // create a question
  questionFactory.create = function(questionData) {
    return $http.post('http://125.212.233.51:9000/api/gmat/post-question', questionData);
  } ;

  // get single question
  questionFactory.get = function(id) {
    return $http.get('http://125.212.233.51:9000/api/gmat/questions/'+id );
  };
  // update a question
  questionFactory.update = function(id,questionData) {
    return $http.post('http://125.212.233.51:9000/api/gmat/edit-question/'+ id,questionData);
  };
  // delete a question
  questionFactory.delete = function(id) {
    return $http.post('http://125.212.233.51:9000/api/gmat/delete-question/'+ id);
  };
  //return our entire questionFactory object
  return questionFactory;

});
