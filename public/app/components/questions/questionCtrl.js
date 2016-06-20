angular.module('questionCtrl', ['questionService'])
    .controller('questionController', function(Question) {
        var vm = this;
        vm.processing = true;
        // see more ======================
        vm.numLimit = 80;
        vm.readMore = function() {
          vm.numLimit = 3000;
        };
        //========== testing ===============
        vm.totalItems = 50;
        vm.currentPage = 1;
        vm.alerts = [
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];

        vm.addAlert = function() {
          vm.alerts.push({msg: 'Another alert!'});
        };

        vm.closeAlert = function(index) {
          vm.alerts.splice(index, 1);
        };

        Question.all()
            .success(function(data) {
                vm.processing = false;
                vm.questions = data.questions;
            });
        vm.deleteQuestion = function(id) {
            vm.processing = true;
            Question.delete(id)
                .success(function(data) {
                    Question.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.questions = data.questions;
                        });

                });
        };
    })
    .controller('questionCreateController', function(Question) {
        var vm = this;
        vm.type = 'create';
        vm.selectedChoice = {};
        vm.questionData = {
            answer_choices: []
        };

        vm.getTemplate = function(choice) {
            if (choice.id === vm.selectedChoice.id) return 'edit';
            else return 'display';
        };

        vm.addChoice = function() {
            var newChoice = {
                id: (vm.questionData.answer_choices.length + 1),
                choice: '',
                explanation: '',
                note: ''
            };
            vm.questionData.answer_choices.push(newChoice);
            vm.selectedChoice = angular.copy(newChoice);
        };

        vm.editChoice = function(choice) {
            vm.selectedChoice = angular.copy(choice);
        };

        vm.deleteChoice = function(choice) {
            if (confirm("Delete this Choice?")) {
                for (var i = 0; i < vm.questionData.answer_choices.length; i++) {
                    if (vm.questionData.answer_choices[i].id === choice.id) {
                        vm.questionData.answer_choices.splice(i, 1);
                    }
                }
            }
        };

        vm.saveColor = function(idx) {
            vm.questionData.answer_choices[idx] = angular.copy(vm.selectedChoice);
            vm.reset();
        };

        vm.reset = function() {
            vm.selectedChoice = {};
        };

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
        vm.questionData = {
            answer_choices: []
        };
        vm.selectedChoice = {};
        Question.get($routeParams.question_id)
            .success(function(data) {
                vm.questionData = data;
            });
        vm.getTemplate = function(choice) {
            if (choice.id === vm.selectedChoice.id) return 'edit';
            else return 'display';
        };

        vm.addChoice = function() {
            var newChoice = {
                id: (vm.questionData.answer_choices.length + 1),
                choice: '',
                explanation: '',
                note: ''
            };
            vm.questionData.answer_choices.push(newChoice);
            vm.selectedChoice = angular.copy(newChoice);
        };

        vm.editChoice = function(choice) {
            vm.selectedChoice = angular.copy(choice);
        };

        vm.deleteChoice = function(choice) {
            if (confirm("Delete this Choice?")) {
                for (var i = 0; i < vm.questionData.answer_choices.length; i++) {
                    if (vm.questionData.answer_choices[i].id === choice.id) {
                        vm.questionData.answer_choices.splice(i, 1);
                    }
                }
            }
        };

        vm.saveColor = function(idx) {
            vm.questionData.answer_choices[idx] = angular.copy(vm.selectedChoice);
            vm.reset();
        };

        vm.reset = function() {
            vm.selectedChoice = {};
        };
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
    })
    .controller('shitController', function(Question) {
        var vm = this;
        vm.linhtinh = "dkm";
        vm.numLimit = 20;
        vm.myString ="sdsadsdsdsaldkjslkdsaklds dsalkdjsakdsaj djasldj dsakljd dasjlkds jdasldjsl ";
        vm.readMore = function() {
          vm.numLimit = 300;
        };
    });
