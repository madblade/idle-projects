'use strict';

APP.prototype.onWindowResize = function () {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
};

APP.prototype.handlerMouseDown = function (event) {
    event.preventDefault();

    // Raycast
    switch (event.keyCode) {

    }


    //TODO AUDIO
    return;

    //console.log("sourcing");
    var buffer	= WebAudiox.getBufferFromJsfx(this.audioContext, this.audioLib);
    var source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    //source.loop = true;
    source.connect(this.audioContext.destination);
    source.start(0);
    //console.log("sourced");
};

APP.prototype.handlerMouseMove = function (event) {
    this.mouse.x = ( event.clientX - this.windowHalfX );
    this.mouse.y = ( event.clientY - this.windowHalfY );
};

APP.prototype.handlerMouseUp = function (event) {
    event.preventDefault();
};

APP.prototype.handlerKeyUp = function (event) {
    event.preventDefault();

    switch (event.keyCode) {
        case this.leftHandKeyEnum.UP:
            this.keysPressed.LHF = false;
            break;
        case this.leftHandKeyEnum.DOWN:
            this.keysPressed.LHB = false;
            break;
        case this.leftHandKeyEnum.LEFT:
            this.keysPressed.LHL = false;
            break;
        case this.leftHandKeyEnum.RIGHT:
            this.keysPressed.LHR = false;
            break;

        case this.keyEnum.LEFT:
            this.keysPressed.RHL = false;
            break;
        case this.keyEnum.RIGHT:
            this.keysPressed.RHR = false;
            break;
        case this.keyEnum.UP:
            this.keysPressed.RHU = false;
            break;
        case this.keyEnum.DOWN:
            this.keysPressed.RHD = false;
            break;
    }
};

APP.prototype.handlerKeyDown = function (event) {
    event.preventDefault();

    switch (event.keyCode) {
        case this.leftHandKeyEnum.UP:
            this.keysPressed.LHF = true;
            break;
        case this.leftHandKeyEnum.DOWN:
            this.keysPressed.LHB = true;
            break;
        case this.leftHandKeyEnum.LEFT:
            this.keysPressed.LHL = true;
            break;
        case this.leftHandKeyEnum.RIGHT:
            this.keysPressed.LHR = true;
            break;

        case this.keyEnum.LEFT:
            this.keysPressed.RHL = true;
            break;
        case this.keyEnum.RIGHT:
            this.keysPressed.RHR = true;
            break;
        case this.keyEnum.UP:
            this.keysPressed.RHU = true;
            break;
        case this.keyEnum.DOWN:
            this.keysPressed.RHD = true;
            break;
    }
};

APP.prototype.keyEnum = {
    Z: 90,
    S: 83,
    Q: 81,
    D: 68,
    A: 65,
    E: 69,
    W: 87,

    LEFT: 37,
    RIGHT: 39,

    UP: 38,
    DOWN: 40,

    IN: 33,
    OUT: 34
};

APP.prototype.leftHandKeyEnum = {
    UP: 0,
    DOWN: 0,
    LEFT: 0,
    RIGHT: 0
};

APP.prototype.keysPressed = {
    LHF: false,
    LHB: false,
    LHL: false,
    LHR: false,

    RHU: false,
    RHD: false,
    RHL: false,
    RHR: false
};

APP.prototype.detectLanguage = function() {
    this.language = window.navigator.userLanguage || window.navigator.language;

    //TODO find a way to make this work in FIREFOX
    this.language = "fr";

    if (this.language == undefined || this.language != "fr") {
        this.leftHandKeyEnum.UP = this.keyEnum.W;
        this.leftHandKeyEnum.DOWN = this.keyEnum.S;
        this.leftHandKeyEnum.LEFT =this.keyEnum.A;
        this.leftHandKeyEnum.RIGHT = this.keyEnum.D;
    } else {
        this.leftHandKeyEnum.UP = this.keyEnum.Z;
        this.leftHandKeyEnum.DOWN = this.keyEnum.S;
        this.leftHandKeyEnum.LEFT =this.keyEnum.Q;
        this.leftHandKeyEnum.RIGHT = this.keyEnum.D;
    }
};