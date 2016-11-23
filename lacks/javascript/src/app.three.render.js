'use strict';

/****** RENDERING FUNCTIONS ******/

APP.Core.prototype.render = function() {
	this.renderer.render(this.scene, this.camera);
};

APP.Core.prototype.animate = function() {
	requestAnimationFrame(this.animate.bind(this));

    this.controlsModule.updateControls();
    this.IAModule.updateBehaviours();

	this.stats.update();
	this.rendererStats.update(this.renderer);
	this.render();
};

APP.Core.prototype.onWindowResize = function() {
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.render();
};