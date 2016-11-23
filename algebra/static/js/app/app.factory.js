'use strict';

/** Rendering objects factories */
APP.prototype.getScene = function () {
    return new THREE.Scene();
};

APP.prototype.getRenderer = function () {
    var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
};

APP.prototype.getCamera = function () {
    var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.set(0, -30, 50);
    return camera;
};

APP.prototype.getControls = function () {
    var controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.noKeys = true;
    controls.target = new THREE.Vector3(0, 0, 0);
    //controls.Pan = true;
    //controls.noRotate = true;
    return controls;
};

/** Shader oriented methods */
APP.prototype.getUniforms = function() {
    return {
        time: 0,
        cycleLength: 100000,
        registeredMaterials: [],
        update: function() {
            this.time = (this.time + .01) % this.cycleLength;
            for (var materialId in this.registeredMaterials) {
                this.registeredMaterials[materialId].uniforms.uTime.value = this.time;
            }
        }
    };
};

APP.prototype.registerMaterial = function(material) {
    this.uniforms.registeredMaterials.push(material);
};

/** Model object factories */
APP.prototype.getModel = function() {
    return [];
};