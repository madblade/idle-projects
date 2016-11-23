app.controller("jv_controller", ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function(){
        activeView = "jv";
        request = false;
        removeListeners();
        resize();
    });
}]);