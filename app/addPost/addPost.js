/**
 * Created by robotic4 on 29/9/15.
 */

var addPostModule = angular.module('myApp.addPost',['ngRoute']);

addPostModule.config(['$routeProvider', function($routeProvider)
{
    $routeProvider

        .when('/addPost',
    {

        templateUrl:'addPost/addPost.html',

        controller:'addPostController'
    });
}]);

addPostModule.controller('addPostController',['$scope','$firebase','UserCommonProperties','$location', function($scope,$firebase,UserCommonProperties,$location)
{



$scope.post={};

    $scope.addPost = function()
    {
        console.log($scope.post);
        var firebaseObj = new Firebase("https://glaring-heat-1216.firebaseio.com/Articles");

        var fb = $firebase(firebaseObj);

        console.log(firebaseObj);
        console.log(fb);

        $scope.post.emaiId = UserCommonProperties.getUser();
//        $scope.post.priority = $scope.post.emaiId;
        $scope.post['.priority']= $scope.post.emaiId;

        console.log($scope.post);


        fb.$push($scope.post).then(function(ref)
        {
            console.log(ref);
            console.log('naveta');

            $location.path('/welcome')
        },function(error)
        {
            console.log('grover');
            console.log('Error:',error);
        });
    }
}]);
