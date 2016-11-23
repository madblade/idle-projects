'use strict';

var APP = APP || {
    'Core': {},
    'Modules': {}
};

APP.Core = function() {
    this.detectBrowser();
    this.declareVariables();
    this.run();
};

APP.Core.prototype.detectBrowser = function() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isChrome = !!window.chrome && !isOpera;
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    if (!isChrome) {
        $("#content").fadeOut(function() {
            $(this).html($("#contentFirefox").html(),'fast').fadeIn('fast');
        });
    }
};