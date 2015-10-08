/**
 * Created by robotic4 on 7/10/15.
 */


var createEmployee = angular.module('myApp.createEmployee',['ngRoute']);

createEmployee.config(['$routeProvider',function($routeProvider)
{
    $routeProvider.when('/create',
    {
        templateUrl:'createEmployee/createEmployee.html',

       controller :'createEmployeeController'
    });
}]);

createEmployee.controller('createEmployeeController',['$scope','$http',function($scope,$http)
{
    console.log('inside create employee controller');

    $scope.user = {};

    $scope.createEmployee = function()
    {
        console.log($scope.user);
        $http({

            method:'post',
            url:'http://localhost:8080/create',
            data : $scope.user,
            headers : {'Content-Type': 'application/json'}

        }).then(function(response)
        {
            $scope.regStatus = true;

            if(response.statusText=="OK")
            {

                $scope.message = "user create successfully";
            }

            else{


                $scope.message = response.statusText;
            }


        },function(error)
        {
            $scope.regStatus = true;

            console.log('error is ' + error);

            $scope.message = error.statusText;
        });
    }
}]);