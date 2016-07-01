angular.module('questionCtrl', ['questionService'])
    .controller('questionController', function(Question) {
        var vm = this;
        vm.processing = true;

        // // acordination
        // vm.oneAtATime = true;
        // vm.status = {
        //     isCustomHeaderOpen: false,
        //     isFirstOpen: true,
        //     isFirstDisabled: false
        // };
        // // tabs
        // vm.tabs = [{
        //     title: 'Dynamic Title 1',
        //     content: 'Dynamic content 1'
        // }, {
        //     title: 'Dynamic Title 2',
        //     content: 'Dynamic content 2',
        // },{
        //     title: 'Dynamic Title 3',
        //     content: 'Dynamic content 3',
        // },{
        //     title: 'Dynamic Title 4',
        //     content: 'Dynamic content 4',
        // }];
        // vm.model = {
        //     name: 'Tabs'
        // };
        // question all
        Question.all()
            .success(function(data) {
                vm.processing = false;
                vm.questions = data.questions;
                vm.viewby = 10;
                vm.totalItems = vm.questions.length;
                vm.currentPage = 1;
                vm.itemsPerPage = vm.viewby;
                vm.maxSize = 5; //Number of pager buttons to show

                vm.setPage = function(pageNo) {
                    vm.currentPage = pageNo;
                };

                vm.pageChanged = function() {
                    console.log('Page changed to: ' + vm.currentPage);
                };

                vm.setItemsPerPage = function(num) {
                    vm.itemsPerPage = num;
                    vm.currentPage = 1; //reset to first paghe
                };
                for (var i = 1; i < vm.questions.length; i++) {
                    vm.questions[i].index = i;
                    console.log(vm.questions[i].index);
                }
            });
        vm.deleteQuestion = function(id) {
            if(confirm("Delete this Question?")){
                vm.processing = true;
                Question.delete(id)
                    .success(function(data) {
                        Question.all()
                            .success(function(data) {
                                vm.processing = false;
                                vm.questions = data.questions;
                            });

                    });
            }
        };
    })
    .controller('questionCreateController', function(Question, $location) {
        var vm = this;
        vm.type = 'create';
        vm.selectedChoice = {};
        vm.questionData = {
            answer_choices: []
        };
        for (var i = 1 ; i < 6 ; i++){
                    newChoice = {
                        id: i,
                        choice: '',
                        explanation: '',
                        note: ''
                    };
                    vm.questionData.answer_choices.push(newChoice);
                }
        vm.getTemplate = function(choice) {
            if (choice.id === vm.selectedChoice.id) return 'edit';
            else return 'display';
        };

        // vm.addChoice = function() {
        //     var newChoice = {
        //         id: (vm.questionData.answer_choices.length + 1),
        //         choice: '',
        //         explanation: '',
        //         note: ''
        //     };
        //     vm.questionData.answer_choices.push(newChoice);
        //     vm.selectedChoice = angular.copy(newChoice);
        // };

        vm.questionData.types = ["Q", "C", "RC", "SC"];

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
                    $location.path("/questions");
                });
        };
    })
    .controller('questionEditController', function($routeParams, Question,$location) {
        var vm = this;
        vm.type = 'edit';
        vm.questionData = {
            answer_choices: []
        };
        vm.selectedChoice = {};
        Question.get($routeParams.question_id)
            .success(function(res) {
                vm.questionData = res.data;
                vm.getTemplate = function(choice) {
                    if (choice.id) return 'edit';
                    else return 'display';
                };
            });


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
                    // vm.message = data.message;
                    $location.path("/questions");
                });
        };
    })
    .controller('shitController', function(Question) {
        var vm = this;
        vm.linhtinh = "dkm";
        vm.numLimit = 20;
        vm.myString = "sdsadsdsdsaldkjslkdsaklds dsalkdjsakdsaj djasldj dsakljd dasjlkds jdasldjsl ";
        vm.readMore = function() {
            vm.numLimit = 300;
        };
    })
    .controller('PaginationQuestionCtrl', function(Question) {
        var vm = this;
        Question.all()
            .success(function(data) {
                vm.processing = false;
                vm.questions = data.questions;
                vm.viewby = 10;
                vm.totalItems = vm.questions.length;
                vm.currentPage = 4;
                vm.itemsPerPage = vm.viewby;
                vm.maxSize = 5; //Number of pager buttons to show

                vm.setPage = function(pageNo) {
                    vm.currentPage = pageNo;
                };

                vm.pageChanged = function() {
                    console.log('Page changed to: ' + vm.currentPage);
                };

                vm.setItemsPerPage = function(num) {
                    vm.itemsPerPage = num;
                    vm.currentPage = 1; //reset to first paghe
                };
                for (var i = 1; i < vm.questions.length; i++) {
                    vm.questions[i].index = i;
                    console.log(vm.questions[i].index);
                }
            });
    })
    .controller('PaginationDemoCtrl', function() {
        var vm = this;
        vm.data = [{
            "name": "Abraham",
            "id": "S7V 0W9"
        }, {
            "name": "Eleanor",
            "id": "K7K 9P4"
        }, {
            "name": "Martina",
            "id": "V0Z 5Q7"
        }, {
            "name": "Kelsie",
            "id": "R7N 7P2"
        }, {
            "name": "Hedy",
            "id": "B7E 7F2"
        }, {
            "name": "Hakeem",
            "id": "S5P 3P6"
        }];
        vm.viewby = 10;
        vm.totalItems = vm.data.length;
        vm.currentPage = 4;
        vm.itemsPerPage = vm.viewby;
        vm.maxSize = 5; //Number of pager buttons to show

        vm.setPage = function(pageNo) {
            vm.currentPage = pageNo;
        };

        vm.pageChanged = function() {
            console.log('Page changed to: ' + vm.currentPage);
        };

        vm.setItemsPerPage = function(num) {
            vm.itemsPerPage = num;
            vm.currentPage = 1; //reset to first paghe
        };
    });
