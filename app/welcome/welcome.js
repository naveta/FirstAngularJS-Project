/**
 * Created by robotic4 on 28/9/15.
 */


var welcomeModuele = angular.module('myApp.welcome',['ngRoute']);

welcomeModuele.config(['$routeProvider',function($routeProvider,UserCommonProperties)
{
    $routeProvider

        .when('/welcome',
    {
            templateUrl:'welcome/welcome.html',
            controller:'welcomeController'
    });
}]);

welcomeModuele.controller('welcomeController',['$scope','UserCommonProperties','$firebase',function($scope,UserCommonProperties,$firebase)
{
        console.log('inside welcome controller');

        $scope.username = UserCommonProperties.getUser();

        var firebaseObj = new Firebase("https://glaring-heat-1216.firebaseio.com/Articles");

        var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

        $scope.articles = sync.$asArray();

        $scope.editPost = function(articleToUpdate)
        {
            $scope.postToUpdate = angular.copy(articleToUpdate);

            console.log($scope.postToUpdate.post);

            $('#editModal').modal();
        }


        $scope.publishUpdatedPost = function()
        {
            console.log('this is' + $scope.postToUpdate.$id);

            var fb = new Firebase("https://glaring-heat-1216.firebaseio.com/Articles/"+$scope.postToUpdate.$id);

            var article = $firebase(fb);

            article.$update({

                title:$scope.postToUpdate.title,
                post: $scope.postToUpdate.post,
                emailId : $scope.postToUpdate.emaiId


            }).then(function(ref)
            {
                $('#editModal').modal('hide');
            }, function(error)
            {
                console.log('Error:',error);
            });
        }


        $scope.confirmDelete = function(articleToDelete)
        {
            $scope.postToDelete = articleToDelete;

            $('#deleteModal').modal();

        }

        $scope.deletePost = function()
        {
            var fb = new Firebase("https://glaring-heat-1216.firebaseio.com/Articles/"+$scope.postToDelete.$id);

            var article = $firebase(fb);

            article.$remove().then(function(ref)
            {
                $('#deleteModal').modal('hide');
            },function(error)
            {
               console.log('unable to delete this post oz of error' + error);
            });
        }


}]);
