/**
 * Created by robotic4 on 5/10/15.
 */

var springApiRequest = angular.module('myApp.springApiRequest',['ngRoute']);

springApiRequest.config(['$routeProvider',function($routeProvider)
{
    $routeProvider.when('/greeting',
        {
            templateUrl:'springApiRequest/springApiRequest.html',
            controller:'springApiDemoController'
        });

}]);

springApiRequest.controller('springApiDemoController',['$scope','$http',function($scope,$http)
{
    console.log('inside spring api demo controller');

    $scope.getSpringDemoApi = function()

    {
        $http.get('http://localhost:8080/greeting').then(function(response)
        {
            $scope.greeting = response.data;

            console.log($scope.greeting.content);
        },function(error)
        {
            console.log("error in getting spring API is " + error);
        });
    }

    $scope.getSpringDemoApiWithUserName = function()
    {
        var username = document.getElementById('username').value;
        $http.get('http://localhost:8080/greeting?name='+username).then(function(response)
        {
            $scope.greeting = response.data;

        },function(error)
        {
            console.log('error is ' + error);
        });
    }



}]);


