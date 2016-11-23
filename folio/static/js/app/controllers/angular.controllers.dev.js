app.controller("dev_controller", ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function(){
        activeView = "dev";
        request = false;
        removeListeners();
        resize();
    });
}]);