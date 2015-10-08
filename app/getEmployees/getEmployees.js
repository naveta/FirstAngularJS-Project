/**
 * Created by robotic4 on 7/10/15.
 */

var getEmployees = angular.module('myApp.getEmployees',['ngRoute']);

getEmployees.config(['$routeProvider',function($routeProvider)
{
    $routeProvider.when('/emps',
        {
            templateUrl:'getEmployees/getEmployees.html',

            controller:'getEmployeesController'
        });
}]);


getEmployees.controller('getEmployeesController',['$scope','$http',function($scope,$http)
{
    console.log('inside get employees controller');

    $scope.getUserList = function()
    {
        $http.get('http://localhost:8080/emps').then(function(response)
        {
            $scope.users = response.data;
        },function(error)
        {
            console.log('error is ' + error);
        });
    }
}]);