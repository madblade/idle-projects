'use strict';

/**
 * Render scene with camera pov
 */
APP.Core.prototype.render = function () {
    this.renderer.render(this.scene);
};

/**
 * Animate scene
 */
APP.Core.prototype.animate = function () {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.gameModule.update();
    this.animationsModule.animate();

    // Debug
    //for (var i=0; i<10000; ++i) for (var j = 0; j<10000; ++j) {}
};