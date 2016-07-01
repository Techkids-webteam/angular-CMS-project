angular.module('questionpackCtrl', ['questionpackService']) // muon list o ben questionpackService
    .controller('questionpackController', function(Questionpack){
        var vm = this;
        vm.processing = true;
        Questionpack.all()
            .success(function(data) {
                vm.processing = false;
                vm.question_packs = data.question_packs;
            });
        vm.deleteQuestionPack = function(id) {
            if(confirm("Delete this Question Pack")){
                vm.processing = true;
                Questionpack.delete(id)
                    .success(function(data) {
                        Questionpack.all()
                            .success(function(data) {
                                vm.processing = false;
                                vm.question_packs = data.question_packs;
                            });
                    });
            }
        };
    })

    .controller('questionpackCreateController', function(Questionpack, $location) {
        var vm = this;
        vm.type = 'create';
        vm.selectedQuestion = {};
        vm.questionPackData = {
            question_ids: []
        };


        vm.getTemplate = function(question) {
            if (question.id === vm.selectedQuestion.id) return 'edit';
            else return 'display';
        };

        vm.addQuestion = function() {
            var newQuestion = {id:''};
            vm.questionPackData.question_ids.push(newQuestion);
            vm.selectedQuestion = angular.copy(newQuestion);
        };

        vm.editQuestion = function(question) {
            vm.selectedQuestion = angular.copy(question);
        };

        vm.deleteQuestion = function(question) {
            if (confirm("Delete this Question?")) {
                for (var i = 0; i < vm.questionPackData.question_ids.length; i++) {
                    if (vm.questionPackData.question_ids[i].id === question.id) {
                        vm.questionPackData.question_ids.splice(i, 1);
                    }
                }
            }
        };

        vm.saveColor = function(idx) {
            vm.questionPackData.question_ids[idx] = angular.copy(vm.selectedQuestion);
            vm.reset();
        };

        vm.reset = function() {
            vm.selectedQuestion = {};
        };

        vm.saveQuestionPack = function() {
            vm.processing = true;
            vm.message = '';
            Questionpack.update($routeParams.question_pack_id, vm.questionPackData)
                .success(function(data) {
                    vm.processing = false;
                    vm.questionPackData = {};
                    vm.message = data.message;
                });
        };
    })

    .controller('questionpackEditController', function($routeParams, Questionpack) {
        var vm = this;
        vm.type = 'edit';
        vm.questionPackData = {
            question_ids: []
        };
        vm.selectedQuestion = {};
        Questionpack.get($routeParams.question_pack_id)
            .success(function(data) {
                vm.questionPackData = data;
            });
        vm.getTemplate = function(question) {
            if (choice.id === vm.selectedQuestion.id) return 'edit';
            else return 'display';
        };

        vm.addQuestion = function() {
            var newQuestion = '';
            vm.questionPackData.question_ids.push(newQuestion);
            vm.selectedQuestion = angular.copy(newQuestion);
        };

        vm.editQuestion = function(question) {
            vm.selectedQuestion = angular.copy(question);
        };

        vm.deleteQuestion = function(question) {
            if (confirm("Delete this Question?")) {
                for (var i = 0; i < vm.questionPackData.question_ids.length; i++) {
                    if (vm.questionPackData.question_ids[i].id === question.id) {
                        vm.questionPackData.question_ids.splice(i, 1);
                    }
                }
            }
        };

        vm.saveColor = function(idx) {
            vm.questionPackData.question_ids[idx] = angular.copy(vm.selectedQuestion);
            vm.reset();
        };

        vm.reset = function() {
            vm.selectedQuestion = {};
        };

        vm.saveQuestionPack = function() {
            vm.processing = true;
            vm.message = '';
            Questionpack.update($routeParams.question_pack_id, vm.questionPackData)
                .success(function(data) {
                    vm.processing = false;
                    vm.questionPackData = {};
                    vm.message = data.message;
                });
        };
    });
