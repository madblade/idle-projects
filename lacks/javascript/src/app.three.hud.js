'use strict';
/* see http://workshop.chromeexperiments.com/examples/gui/#8--Custom-Placement */

function bigMessage(result) {
    $("#content").fadeOut(function() {
        $(this).html($("#content"+result).html(),'fast').fadeIn('fast');
    });
}