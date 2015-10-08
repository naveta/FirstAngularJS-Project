/**
 * Created by robotic4 on 28/9/15.
 */


var mainModule = angular.module('myApp',['ngRoute','myApp.home','myApp.register','myApp.welcome','myApp.addPost','myApp.springApiRequest','myApp.getEmployees','myApp.createEmployee']);

mainModule.config(['$routeProvider',function($routeProvider)
{

    $routeProvider.otherwise({
        redirectTo:'/home'
    });

}]);