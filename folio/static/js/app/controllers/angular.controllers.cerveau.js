app.controller("cerveau_controller", ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function(){
        activeView = "cerveau";
        request = false;
        removeListeners();
        resize();
    });
}]);