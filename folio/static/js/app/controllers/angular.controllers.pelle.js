app.controller("pelle_controller", ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function(){
        activeView = "pelle";
        request = false;
        removeListeners();
        resize();
    });
}]);