'use strict';

/**
 * App core object
 * @constructor
 */
var APP = APP || {};

APP = function () {
    if (!Detector.webgl) Detector.addGetWebGLMessage();

    this.scene = this.getScene();
    this.model = this.getModel();

    // Detect language
    this.detectLanguage();

    // Set up renderer
    this.renderer = this.getRenderer();
    this.container = document.getElementById('container');
    this.container.appendChild(this.renderer.domElement);

    // Set up camera
    this.camera = this.getCamera();

    // Set up controls
    this.controls = this.getControls();

    // Set up audio
    this.audioContext = new AudioContext();
    this.audioLib =
        ["sine",1.0000,0.2690,0.0000,0.2420,0.0000,0.4780,62.0000,242.0000,971.0000,-0.8320,0.0000,0.9960,13.9271,-0.0322,-0.2680,0.0000,0.0000,0.5000,-0.0460,0.0000,-0.5600,-0.3800,1.0000,-0.0420,0.0000,0.0000,0.0000];

    // Set up mouse
    this.mouse = {x:0, y:0};
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    // Set up events
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
    window.addEventListener('mousedown', this.handlerMouseDown.bind(this), false);
    window.addEventListener('mousemove', this.handlerMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.handlerMouseUp.bind(this), false);
    window.addEventListener('keyup', this.handlerKeyUp.bind(this), false);
    window.addEventListener('keydown', this.handlerKeyDown.bind(this), false);

    // Set up shader uniforms
    this.uniforms = this.getUniforms();

    // Load shaders
    var shaders = ['magma', 'water'];
    this.loadShaders(shaders);
};

// Called when shaders are done loading.
APP.prototype.launchApplication = function() {
    this.run();
    this.animate();
};

APP.prototype.run = function () {

    this.scene.add(this.getTerrain());

    this.addMagma(new THREE.Vector3(10, 10, 5));
};