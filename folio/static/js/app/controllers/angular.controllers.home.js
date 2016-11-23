/** Data */

app.controller("home_controller", ['$scope', '$location', function($scope, $location) {

    $scope.redirect = function(url) {
        $location.url(url);
    };

    $scope.items = [
        {
            title: "HTML5/JS/WebGL gaming experiments",
            href: "dev",
            comment: ["Durant un moment, il ne se produisit rien. " +
            "Puis, au bout d'une seconde à peu près, il continua de ne rien se produire." +
            ""],
            image:"hot51"
        },
        {
            title: "Toutes sortes d'articles",
            href: "articles",
            comment:  [
                "En construction...",
                "Section articles."
            ],
            image: "college1"
        },
        {
            title: "Cinquième art",
            href: "lire",
            comment:  [
                "En construction...",
                "Découvertes littérature."
            ],
            image: "books8"
        },
        {
            title: "Septième art",
            href: "cine",
            comment:  [
                "En construction...",
                "Découvertes cinéma et animation."
            ],
            image:"comfortable6"
        },
        {
            title: "Dixième art",
            href: "jv",
            comment:  [
                "En construction...",
                "Découvertes jeu vidéo."
            ],
            image: "videogame10"
        },
        {
            title: "Reworking Elder Thoughts",
            href: "pelle",
            comment: [
                "En construction...",
                "Vieux trucs."
            ],
            image:"greece1"
        },
        {
            title: "Rain In All Familiar Places",
            href: "cerveau",
            comment:  [
                "En construction...",
                "Sciences."
            ],
            image:"compass"
        },
        {
            title: "His Dark Materials",
            href: "scribe",
            comment:  [
                "En construction...",
                "Essais."
            ],
            image:"write61"

        }
    ];

    $scope.$on('$viewContentLoaded', function(){
        activeView = "home";
        request = true;
        initParticles();
        setTimeout(calibrateHeights, 0);
    });
}]);

/** Display */

function calibrateHeights() {
    // Compute necessary height
    var header = document.getElementById("banner").getBoundingClientRect();
    var bannerHeight = Math.abs(header.top - header.bottom);
    var docHeight = window.innerHeight;
    var docWidth = window.innerWidth;
    var footer = document.getElementById("footer").getBoundingClientRect();
    var footerHeight = Math.abs(footer.top - footer.bottom);
    var restHeight = docHeight - bannerHeight - footerHeight;

    var elemHeight = 0;
    if (docWidth < 768) {
    } else if (docWidth < 992) {
        restHeight = restHeight - 10;
        elemHeight = restHeight / 4;
    } else if (docWidth < 1200) {
        restHeight = restHeight - 10;
        elemHeight = restHeight / 3;
    } else {
        restHeight = restHeight - 10;
        elemHeight = restHeight / 2;
    }

    // Calibrate height
    var elements = $('.home-list-item');
    if (elements.length === 0) {
        setTimeout(calibrateHeights, 10);
        return;
    }

    var height = 0;
    var i;
    for (i = 0; i < elements.length; i++)
        height = height > elements[i].clientHeight ? height : elements[i].clientHeight;

    if (elemHeight > height) height = elemHeight;

    for (i = 0; i < elements.length; i++) {
        elements[i].setAttribute("style", "height:"+ height+"px;");
    }

    $(".ng-section-picto").each(function() {
        $(this).attr("style",
            "position:absolute; " +
            "height:" + height/2 + "px;" +
            "top:" + height/3 + "px;" +
            "margin-left: auto;" +
            "margin-right: auto;" +
            "left:0;" +
            "right:0;" +
            "opacity:0.07;");
    });
}

function resetHeights() {
    var elements = $('.home-list-item');
    var i;
    for (i = 0; i < elements.length; i++)
        elements[i].removeAttribute("style");
}