/**
 * Created by robotic4 on 28/9/15.
 */

var homeModule = angular.module('myApp.home',['ngRoute','firebase']);

homeModule.config(['$routeProvider',function($routeProvider)
{
    $routeProvider

    .when('/home',
    {
        templateUrl:'home/home.html',
        controller: 'homeController'

    });

}]);

homeModule.controller('homeController',['$scope','$firebaseAuth','$location','UserCommonProperties',function($scope,$firebaseAuth,$location,UserCommonProperties)
{
   console.log('hello');

    var firebaseObj = new Firebase("https://glaring-heat-1216.firebaseio.com");

    var loginObj = $firebaseAuth(firebaseObj);

    console.log('loginObj created');

    $scope.SignIn = function(event)
    {
        var userName = $scope.user.email;

        var password =   $scope.user.password;

        loginObj.$authWithPassword(
            {
                email : userName,

                password : password
            })

            .then(function(user) {
                //Success callback
                console.log('Authentication successful');

                UserCommonProperties.setUser(user.password.email);

                $location.path('/welcome');
            }, function(error) {
                //Failure callback
                console.log('Authentication failure');
                console.log('error');
            });
    }



}]);

homeModule.service('UserCommonProperties',function()
{
    var user = '';

    return {

        getUser:function()
        {
            return user;
        },

        setUser:function(value)
        {
            user = value;
        }
    };
});
