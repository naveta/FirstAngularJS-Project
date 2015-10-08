/**
 * Created by robotic4 on 28/9/15.
 */

var registerModule = angular.module('myApp.register',['ngRoute','firebase']);

registerModule.config(['$routeProvider', function($routeProvider)
{
    $routeProvider

        .when('/register',{

            templateUrl:'register/register.html',
            controller:'registerController'
        });

}]);


registerModule.controller('registerController',['$scope','$firebaseAuth','$location', function($scope,$firebaseAuth,$location)
{

    var firebaseObj = new Firebase("https://glaring-heat-1216.firebaseio.com");
    var auth = $firebaseAuth(firebaseObj);

    $scope.signUp = function()
    {


        if(!$scope.registrationForm.$invalid)
        {
            console.log('registration controller');

            var email = $scope.user.email;
            var password = $scope.user.password;

            if(email && password)
            {
                auth.$createUser(email, password)
                    .then(function()
                    {
                        console.log('user created successfully');

                        $location.path('/home');
                    }, function(error)
                    {
                        console.log(error);

                        $scope.regError = true;
                        $scope.regErrorMessage = error.message;
                    });


            }

        }

    };

}]);