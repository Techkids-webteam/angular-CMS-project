angular.module('questionpackCtrl', ['questionpackService']) // muon list o ben questionpackService
    .controller('questionpackController', function(Questionpack){
        var vm = this;
        vm.processing = true;
        Questionpack.all()
            .success(function(data) {
                vm.processing = false;
                vm.question_pack = data.question_pack;
            });
        vm.deleteQuestionPack = function(id) {
            vm.processing = true;
            Questionpack.delete(id)
                .success(function(data) {
                    Questionpack.all()
                        .success(function(data) {
                            vm.processing = false;
                            vm.question_pack = data.question_pack;
                        });

                });
        };
    })

    .controller('questionPackCreateController', function(Questionpack) {
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
            var newQuestion = {
                id: (vm.questionPackData.question_ids.length + 1),
                ''
            };
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
