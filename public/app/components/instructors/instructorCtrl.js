angular.module('instructorCtrl', ['instructorService'])
  .controller('instructorController', function(Instructor){
    var vm = this;
    vm.processing = true;
    Instructor.all()
      .success(function(data) {        // when all the users come back, remove the processing variable
        vm.processing = false;
        // bind the users that come back to vm.users
        vm.instructors= data;
      });
        // function to delete a user
    vm.deleteInstructor = deleteInstructor;
    function deleteInstructor(id) {
      vm.processing = true;
      // accepts the user id as a parameter
      Instructor.delete(id)
        .success(function(data) {
          // get all users to update the table
          // you can also set up your api
          // to return the list of users with the delete call
          Instructor.all()
            .success(function(data) {
              vm.processing = false;
              vm.instructors = data;
            });
        });
    }

    // inline editing
    vm.selected = {};
    vm.getTemplate = getTemplate;
    vm.editInstructor = editInstructor;
    vm.reset = reset;
    vm.saveInstructor = saveInstructor;

    function editInstructor(people) {
      vm.selected = angular.copy(people);
    }
    function getTemplate(person) {
     if (person._id === vm.selected._id){
      console.log("edit");
      return 'edit';
     }
     else return 'display';
    }
    function reset() {
      vm.selected = {};
    }
    function saveInstructor(_id) {
      vm.processing = true;
      vm.message = '';
      console.log(vm.selected);
      vm.instructors._id = angular.copy(vm.selected);
      console.log(vm.instructors._id);
      console.log(_id);
      //call the userService function to update
      Instructor.update(_id, vm.selected)
      .success(function(data) {
        vm.processing = false;
        Instructor.all()
          .success(function(data) {        // when all the users come back, remove the processing variable
            vm.processing = false;
            // bind the users that come back to vm.users
            vm.instructors= data;
          });
      });
      vm.reset();
    }
  })
  //controller applied to user create page
  .controller('instructorCreateController', function(Instructor) {
    var vm = this;
    // variable to hide/show elements of the view
    // differentiates between create or edit pages
    vm.type = 'create';
    //function to create a user
    vm.saveUInstructor= function() {
      vm.processing = true;
      //clear the message
      vm.message = '';
      //use the create function in the userService
      Instructor.create(vm.instructorData)
        .success(function(data) {
          vm.processing = false;
          //clear the form
          vm.instructorData = {};
          vm.message = data.message;
        });
    };
  })
  //controller applied to user edit page
  .controller('instructorEditController', function($routeParams,Instructor) {
    var vm = this;
    //variable to hide/show elements of the view
    // differentiates between create or edit pages
    vm.type = 'edit';
    //get the user data for the user you want to edit
    // $routeParams is the way we grab data from the URL
    Instructor.get($routeParams.instructor_id)
      .success(function(data) {
        vm.InstructorData = data;
      });
    // function to save the user
    vm.saveInstructor = function() {
      vm.processing = true;
      vm.message = '';
      //call the userService function to update
      Instructor.update($routeParams.instructor_id, vm.instructorData)
      .success(function(data) {
        vm.processing = false;
        //clear the form
        vm.instructorData = {};
        //bind the message from our API to vm.message
        vm.message = data.message;
      });
    };
  });
