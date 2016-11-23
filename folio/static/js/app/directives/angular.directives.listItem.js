app.directive('listItem', function() {
    return {
        restrict: 'E',
        scope: {
            item: '='
        },
        templateUrl: 'static/js/app/pages/listItem.html'
    };
});