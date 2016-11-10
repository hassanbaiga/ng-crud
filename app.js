var mainApp = angular.module('mainApp', ['ngRoute', 'ngAnimate', 'firebase']);



mainApp.run(function() {
  auth.onAuthStateChanged(function (user) {
          if (!user) {
            $location.path('#/login');
            $location.replace();
          }
      });
});


var config = {
    apiKey: "AIzaSyAXlm6VCJh0F-bYbvi_Mzv8_8i2BMhC9fU",
    authDomain: "helloworld-b6658.firebaseapp.com",
    databaseURL: "https://helloworld-b6658.firebaseio.com",
    storageBucket: "helloworld-b6658.appspot.com",
};
firebase.initializeApp(config);
const auth = firebase.auth();

mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller : 'HomeController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'TableController'
        })
        .when('/register', {
            templateUrl: 'views/register.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);

// mainApp.directive('randomUser',[function(){
//   // return{
//   //   restrict: 'E'
//   // };
// }]);

mainApp.controller('HomeController',['$scope','$http','$firebase','$location', function($scope, $http, $firebase, $location){
  auth.onAuthStateChanged(function (user) {
          if (user) {
            $location.path('#/home');
            $location.replace();
          } else {
              console.log("nope ! not Logged In");
          }
      });
}]);

mainApp.controller('LoginController', ['$scope', '$http', '$firebase', '$location', function($scope, $http, $firebase, $location) {
  auth.onAuthStateChanged(function (user) {
          if (user) {
            // alert('this');
            $location.path('/');
            $location.replace();
          } else {
              console.log("nope ! not Logged In");
          }
      });

    $scope.login = function() {
        const email = $scope.login.email;
        const password = $scope.login.password;

        auth.signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        }).then(function(){
          $location.path('#/home');
          $location.replace();
        });
    }
}]);

mainApp.controller('TableController', ['$scope', '$http', function($scope, $http) {

    $scope.removeUser = function(user) {
        var removedUser = $scope.users.indexOf(user);
        $scope.users.splice(removedUser, 1);
    }



    $scope.addUser = function() {
        $scope.users.push({
            firstname: $scope.newuser.firstname,
            lastname: $scope.newuser.lastname,
            email: $scope.newuser.email,
            active: true,
            thumb: "https://api.adorable.io/avatars/50/" + $scope.newuser.email
        });
        $scope.newuser.firstname = "";
        $scope.newuser.lastname = "";
        $scope.newuser.email = "";
    }

    $http.get('directory.json').success(function(data) {
        $scope.users = data;
    });


    // $scope.users = [
    //   {
    //     firstname : "John",
    //     lastname : "Doe",
    //     email : "john@example.com",
    //     active : true,
    //     thumb : "https://api.adorable.io/avatars/50/john@example.com"
    //   },
    //   {
    //     firstname : "Mary",
    //     lastname : "Moe",
    //     email : "mary@example.com",
    //     active:true,
    //     thumb : "https://api.adorable.io/avatars/50/mary@example.com"
    //   },
    //   {
    //     firstname : "July",
    //     lastname : "Dooley",
    //     email : "july@example.com",
    //     active:true,
    //     thumb : "https://api.adorable.io/avatars/50/july@example.com"
    //   }
    // ];
    // console.log(angular.toJson($scope.users));

}]);
