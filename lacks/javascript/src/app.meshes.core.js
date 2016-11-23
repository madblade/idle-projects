'use strict';

APP.Modules.Meshes = function(app) {
    this.terrain;
    this.objects = [];

    this.selectedObjects = [];
    this.masterSphere;

    this.nbEnemies = 10*10; // must be a perfect square
    this.nbMine = 23;
    this.sphereRadius = 10;

    this.app = app;
};