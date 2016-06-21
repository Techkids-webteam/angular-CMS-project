angular.module('questionpackService', []) // ten duoc dat trong app.routes.js
.factory('Questionpack', function($http){
    var questionpackFactory = {};
    //get all question packs:
    questionpackFactory.all = function() {
      return $http.get('http://125.212.233.51:9000/api/gmat/question_packs');
    };

    // create a question pack
    questionpackFactory.create = function(questionPackData) {
      return $http.post('http://125.212.233.51:9000/api/gmat/post-question-pack', questionPackData);
    } ;

    // get single question pack
    questionpackFactory.get = function(id) {
      return $http.get('/api/question_packs/' + id );
    };

    // update a question pack
    questionpackFactory.update = function(id,questionPackData) {
      return $http.post('http://125.212.233.51:9000/api/gmat/edit-question-pack' + id,questionPackData);
    };

    // delete a question pack
    questionpackFactory.delete = function(id) {
      return $http.post('http://125.212.233.51:9000/api/gmat/delete-question-pack' + id);
    };

     //return our entire questionpackFactory object
    return questionpackFactory;
})
