angular.module('questionCtrl', ['questionService'])
    .controller('questionController', function(Question) {
        var vm = this;
        vm.processing = true;
        Question.all()
            .success(function(data) {
                vm.processing = false;
                vm.questions = data;
            });
        vm.deleteQuestion = function(id) {
            vm.processing = true;
            Question.delete(id)
                .success(function(data) {
                    Question.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.questions = data;
                        });

                });
        };
    })
    .controller('questionCreateController', function(Question) {
        var vm = this;
        vm.type = 'create';
        vm.saveQuestion = function() {
            vm.processing = true;
            vm.message = '';
            Question.create(vm.questionData)
                .success(function(data) {
                    vm.processing = false;
                    vm.questionData = {};
                    vm.message = data.message;
                });
        };
    })
    .controller('questionEditController', function($routeParams, Question) {
        var vm = this;
        vm.type = 'edit';
        Question.get($routeParams.question_id)
            .success(function(data) {
                vm.questionData = data;
            });
        vm.saveQuestion = function() {
            vm.processing = true;
            vm.message = '';
            Question.update($routeParams.question_id, vm.questionData)
                .success(function(data) {
                    vm.processing = false;
                    vm.questionData = {};
                    vm.message = data.message;
                });
        };
    });
