app.controller("lire_controller", ['$scope', function($scope) {
    $scope.$on('$viewContentLoaded', function(){
        activeView = "lire";
        request = false;
        removeListeners();
        resize();
    });
}]);