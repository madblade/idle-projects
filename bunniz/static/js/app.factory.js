'use strict';

APP.Core.prototype.getScene = function () {
    return this.scene === undefined ? new PIXI.Container() : this.scene;
};

APP.Core.prototype.getRenderer = function () {
    var jButton = $('#helper-button');
    var width = window.innerWidth;
    var height = window.innerHeight - jButton.height();
	return PIXI.autoDetectRenderer(width, height, {backgroundColor: 0x555560}, false);
};