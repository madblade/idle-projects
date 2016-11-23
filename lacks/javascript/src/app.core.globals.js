'use strict';

APP.Core.prototype.declareVariables = function() {
    this.camera;
    this.scene;
    this.renderer;
    this.stats;
    this.rendererStats;

    // todo shader module
    this.uniforms = {};
    this.attributes = {colors: {type: 'c',value: []}};
};