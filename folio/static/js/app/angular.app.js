var app = angular.module("application", ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl:'static/js/app/pages/home.html',
            controller: 'home_controller'
        })

        .when('/articles', {
            templateUrl:'static/js/app/pages/articles.html',
            controller: 'articles_controller'
        })

        .when('/dev', {
            templateUrl:'static/js/app/pages/dev.html',
            controller: 'dev_controller'
        })

        .when('/pelle', {
            templateUrl:'static/js/app/pages/pelle.html',
            controller: 'pelle_controller'
        })

        .when('/cerveau', {
            templateUrl:'static/js/app/pages/cerveau.html',
            controller: 'cerveau_controller'
        })

        .when('/lire', {
            templateUrl:'static/js/app/pages/lire.html',
            controller: 'lire_controller'
        })

        .when('/cine', {
            templateUrl:'static/js/app/pages/cine.html',
            controller: 'cine_controller'
        })

        .when('/jv', {
            templateUrl:'static/js/app/pages/jv.html',
            controller: 'jv_controller'
        })

        .when('/scribe', {
            templateUrl:'static/js/app/pages/jv.html',
            controller: 'jv_controller'
        });
});