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
    vm.deleteInstructor = function(id) {
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
    };


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
      Instructor.update($routeParams.instructor_id,vm.instructorData)
        .success(function(data) {
          vm.processing = false;
          //clear the form
          vm.instructorData={};
          //bind the message from our API to vm.message
          vm.message = data.message;
        });
    };
  });
