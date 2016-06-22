angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'app/views/pages/home.html'
    })

    // login page
    .when('/login', {
        templateUrl: 'app/views/pages/login.html',
        controller: 'mainController',
        controllerAs: 'login'
    })

    // show all users
    .when('/users', {
        templateUrl: 'app/views/pages/users/all.html',
        controller: 'userController',
        controllerAs: 'user'
    })

    // form to create a new user
    // same view as edit page
    .when('/users/create', {
        templateUrl: 'app/views/pages/users/single.html',
        controller: 'userCreateController',
        controllerAs: 'user'
    })

    // page to edit a user
    .when('/users/:user_id', {
            templateUrl: 'app/views/pages/users/single.html',
            controller: 'userEditController',
            controllerAs: 'user'
        })
        .when('/questions', {
            templateUrl: 'app/components/questions/views/all.html',
            controller: 'questionController',
            controllerAs: 'question'
        })
        .when('/questions/create', {
            templateUrl: 'app/components/questions/views/single.html',
            controller: 'questionCreateController',
            controllerAs: 'question'
        })

        .when('/questions/:question_id', {
            templateUrl: 'app/components/questions/views/single.html',
            controller: 'questionEditController',
            controllerAs: 'question'
        })

        .when('/questionpacks',{
            templateUrl: 'app/components/questionpacks/views/all.html',
            controller: 'questionpackController',
            controllerAs: 'questionpack'
        })

        .when('/questionpacks/create',{
            templateUrl: 'app/components/questionpacks/views/single.html',
            controller: 'questionpackCreateController',
            controllerAs: 'questionpack'
        })

        .when('/questionpacks/:question_pack_id', {
            templateUrl: 'app/components/questionpacks/views/single.html',
            controller: 'questionpackEditController',
            controllerAs: 'questionpack'
        })

    $locationProvider.html5Mode(true);

});
