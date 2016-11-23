var scrollPosition = 0;
var activeView = "home";

// Event listeners
function mouseScroll(event) {

    var e = event.originalEvent, rolled;
    if ('wheelDelta' in e)
        rolled = - e.wheelDelta;
    else // Firefox
        rolled = 40 * e.detail;

    window.scrollBy(0, rolled);

    var st = $(window).scrollTop();
    if (st != scrollPosition) {
        scrollPosition = st;

        //rolled > 0
        if (st != 0) {
            $("footer").animate({height:'hide'});
        } else {
            $("footer").animate({height:'show'});

        }
    }

    //TODO solve overlapping footer
    //TODO fix no autoscroll on ng-view
    //TODO css based animation
    //TODO make icons
}

$(window).on('DOMMouseScroll', mouseScroll);
$(window).on('mousewheel', mouseScroll);
window.addEventListener("resize", resize, !1);