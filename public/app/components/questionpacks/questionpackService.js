angular.module('questionpackService', []) // ten duoc dat trong app.routes.js
.factory('Questionpack', function($http){
    var questionpackFactory = {};
    //get all question packs:
    questionpackFactory.all = function(){
        return $http.get('/api/question_packs');
    };

    // create a question pack
    questionpackFactory.create = function(questionPackData) {
      return $http.post('/api/question_packs/', questionPackData);
    } ;

    // get single question pack
    questionpackFactory.get = function(id) {
      return $http.get('/api/question_packs/' + id );
    };

    // update a question pack
    questionpackFactory.update = function(id,questionPackData) {
      return $http.put('/api/question_packs/' + id,questionPackData);
    };

    // delete a question pack
    questionpackFactory.delete = function(id) {
      return $http.delete('/api/question_packs/' + id);
    };

     //return our entire questionpackFactory object
    return questionpackFactory;
})
