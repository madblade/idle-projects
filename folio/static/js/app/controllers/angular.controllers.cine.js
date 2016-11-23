app.controller("cine_controller", ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function(){
        activeView = "cine";
        request = false;
        removeListeners();
        resize();
    });
}]);