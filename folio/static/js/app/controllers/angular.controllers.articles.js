app.controller("articles_controller", ['$scope', function($scope) {
    $scope.items = [
        {
            title: "Articles",
            text: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus." +
            " Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. " +
            "Cras elementum ultrices diam. Maecenas ligula massa, varius a, " +
            "semper congue, euismod non, mi.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus." +
            " Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. " +
            "Cras elementum ultrices diam. Maecenas ligula massa, varius a, " +
            "semper congue, euismod non, mi"
            ]
        },

        {
            title: "2048",
            text: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus." +
            " Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. " +
            "Cras elementum ultrices diam. Maecenas ligula massa, varius a, " +
            "semper congue, euismod non, mi."]
        },

        {
            title: "Algebra",
            text: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus." +
            " Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. " +
            "Cras elementum ultrices diam. Maecenas ligula massa, varius a, " +
            "semper congue, euismod non, mi."
            ]
        }
    ];

    $scope.$on('$viewContentLoaded', function(){
        request = false;
        removeListeners();
    });
}]);