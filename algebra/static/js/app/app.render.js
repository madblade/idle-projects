'use strict';

/**
 * Render scene with camera pov
 */
APP.prototype.render = function () {
    this.renderer.render(this.scene, this.camera);
};

/**
 * Animate scene
 */
APP.prototype.animate = function () {
    requestAnimationFrame(this.animate.bind(this));

    this.render();
    this.controls.update();
    this.uniforms.update();
    this.updateKeys();


};

APP.prototype.updateKeys = function() {
    if (this.keysPressed.LHF) {
        this.moveEyeOf(0, 1);
    }

    if (this.keysPressed.LHB) {
        this.moveEyeOf(0, -1);
    }

    if (this.keysPressed.LHL) {
        this.moveEyeOf(-1, 0);
    }

    if (this.keysPressed.LHR) {
        this.moveEyeOf(1, 0);
    }
};

APP.prototype.moveEyeOf = function (deltaX, deltaY) {
    this.camera.position.x += deltaX;
    this.camera.position.y += deltaY;

    this.controls.target.x += deltaX;
    this.controls.target.y += deltaY;

    //this.light.position.x += deltaX;
    //this.light.position.y += deltaY;
};

APP.prototype.moveEyeAt = function (newX, newY) {
    this.camera.position.x = newX;
    this.camera.position.y = newY;

    this.controls.target.x = newX;
    this.controls.target.y = newY;

    //this.light.position.x = newX;
    //this.light.position.y = newY;
};