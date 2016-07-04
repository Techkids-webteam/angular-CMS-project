angular.module('questionpackCtrl', ['questionpackService','questionService']) // muon list o ben questionpackService
    .controller('questionpackController', function(Questionpack) {
        var vm = this;
        vm.processing = true;
        Questionpack.all()
            .success(function(data) {
                vm.processing = false;
                vm.question_packs = data.question_packs;
            });
        vm.deleteQuestionPack = function(id) {
            if (confirm("Delete this Question Pack")) {
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
        question_ids: [
            "57763231078d1226a06cee46",
            "57763232078d1226a06cee47",
            "57763233078d1226a06cee48",
            "57763233078d1226a06cee49",
            "57763233078d1226a06cee4a",
            "57763233078d1226a06cee4b",
            "57763234078d1226a06cee4c",
            "57763234078d1226a06cee4d",
            "57763235078d1226a06cee4e",
            "57763235078d1226a06cee4f"
        ]
    };


    vm.getTemplate = function(id) {
        // if (question.id === vm.selectedQuestion.id) return 'edit';
        // else
        return 'display';
    };

    vm.addQuestionId = function(id) {
        console.log(vm.questionPackData.question_ids);
        vm.questionPackData.question_ids.push(id);
        console.log(vm.questionPackData.question_ids);
    };

    vm.editQuestion = function(question) {
        vm.selectedQuestion = angular.copy(question);
    };

    vm.deleteQuestionId = function(id) {
        if (confirm("Delete this Question?")) {
            for (var i = 0; i < vm.questionPackData.question_ids.length; i++) {
                if (vm.questionPackData.question_ids[i] === id) {
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
        Questionpack.create(vm.questionPackData)
            .success(function(data) {
                vm.processing = false;
                vm.questionPackData = {};
                vm.message = data.message;
                $location.path("/questionpacks");
            });
    };
})

.controller('questionpackEditController', function($routeParams, Questionpack, $location,Question) {
    var vm = this;
    vm.type = 'edit';
    vm.questionPackData = {
        question_ids: []
    };
    vm.selectedQuestion = {};
    Questionpack.get($routeParams.question_pack_id)
        .success(function(res) {
            vm.questionPackData = res.data;
            //filter by stimulus
            vm.types= vm.questionPackData.question_ids;
            vm.filterArray = function(question) {
            return (vm.types.indexOf(question._id) !== -1);
            };

            vm.getTemplate = function(question) {
                if (!question) return 'edit';
                else return 'display';
            };
        });

    vm.addQuestionId = function(id) {
        console.log(vm.questionPackData.question_ids);
        vm.questionPackData.question_ids.push(id);
        console.log(vm.questionPackData.question_ids);
    };

    vm.editQuestion = function(question) {
        vm.selectedQuestion = angular.copy(question);
    };

    vm.deleteQuestionId = function(id) {
        if (confirm("Delete this Question?")) {
            for (var i = 0; i < vm.questionPackData.question_ids.length; i++) {
                if (vm.questionPackData.question_ids[i] === id) {
                    vm.questionPackData.question_ids.splice(i, 1);
                }
            }
        }
    };
    // get stimulus
    vm.types= vm.questionPackData.question_ids;
    vm.filterArray = function(question) {
    return (vm.types.indexOf(question._id) !== -1);
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
                $location.path("/questionpacks");
            });
    };
});
