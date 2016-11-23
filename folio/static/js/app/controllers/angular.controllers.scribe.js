app.controller("scribe_controller", ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function(){
        activeView = "scribe";
        request = false;
        removeListeners();
        resize();
    });
}]);