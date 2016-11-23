function resize() {
    switch (activeView) {
        case "home" :
            resizeHome();
            break;

        case "pelle" :
        case "cerveau":
        case "dev":
        case "cine":
        case "jv":
        case "lire":
        case "scribe":
            resizePelle();
            break;

        default:
            break;
    }
}

function resizeHome() {
    resetHeights();
    document.getElementById("canvas-particles").appendChild(canvas);
    canvas = document.getElementById("particlesJS-canvas");
    context = canvas.getContext("2d");

    var header = document.getElementById("banner").getBoundingClientRect();
    var x = Math.abs(header.right - header.left);
    var y = Math.abs(header.top - header.bottom);

    canvas.width = x;
    canvas.height = y;
    makeHighRes(canvas);

    calibrateHeights();
}

function resizePelle() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    $("#pelle")[0].setAttribute("style", "height:" + h + "px;");

    var cross = $("#cross");
    var crossRect = cross[0].getBoundingClientRect();
    var x = Math.abs(crossRect.right - crossRect.left);
    var y = Math.abs(crossRect.top - crossRect.bottom);

    cross[0].setAttribute("style", "position:absolute; top:" + (h-y)/2 + "px; left:" + (w-x)/2 + "px;");
}