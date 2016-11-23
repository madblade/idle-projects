'use strict';

/**
 * App core object
 * @constructor
 */
var APP = APP || {
        'Core': {},
        'Modules': {}
    };

APP.Core = function () {
    this.scene = this.getScene();

    // Set up number of pawns
    this.numberOfUnitsOnX = 6;
    this.numberOfUnitsOnY = 6;
    this.pawnSize = 25;

    // Set up renderer
    var container = document.getElementById('scene');
    this.renderer = this.getRenderer();
    container.appendChild(this.renderer.view);

    // Set up graphics
    this.pawnWidth = this.pawnSize*1.5;
    this.pawnHeight = this.pawnSize*1.5;
    var width = this.numberOfUnitsOnX*this.pawnWidth;
    var height = this.numberOfUnitsOnY*this.pawnHeight;
    this.graphicsX = (this.renderer.width - width)/2;
    this.graphicsY = (this.renderer.height - height)/2;

    // Set up events
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    window.addEventListener('mousedown', this.handlerMouseDown.bind(this), false);
    window.addEventListener('mousemove', this.handlerMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.handlerMouseUp.bind(this), false);
    window.addEventListener('keyup', this.handlerKeyUp.bind(this), false);
    window.addEventListener('keydown', this.handlerKeyDown.bind(this), false);

    // Run game
    this.run();

    // Animate
    this.animate();

    this.onWindowResize();
};

APP.Core.prototype.run = function () {

    // Init modules=
    this.gameModule = new APP.Modules.Game(this);
    this.objectsModule = new APP.Modules.Objects(this);
    this.animationsModule = new APP.Modules.Animations(this);

    // Run modules
    this.objectsModule.run();
    this.animationsModule.run();
    this.gameModule.run();
};

APP.Core.prototype.keyEnum = {
    Z: 90,
    S: 83,
    Q: 81,
    D: 68,
    A: 65,
    W: 87,

    LEFT: 37,
    RIGHT: 39,

    UP: 38,
    DOWN: 40
};

APP.Core.prototype.DirectionEnum = {
    DOWN:0,
    LEFT:1,
    UP:2,
    RIGHT:3,
    NOWHERE:4
};

APP.Core.prototype.StateEnum = {
    WAITING: 0,
    PROCESSING_INPUT: 1,
    ANIMATING: 2,
    UPDATING_MODEL: 3,
    UPDATED_MODEL: 4,
    ENDED: 5
};