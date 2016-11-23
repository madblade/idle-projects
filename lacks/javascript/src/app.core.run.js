'use strict';

APP.Core.prototype.run = function() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0xffffff, 0.000035 );

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000000);
    this.camera.position.set(window.innerWidth/2,window.innerHeight/2,1000);

    // Modules
    this.meshesModule = new APP.Modules.Meshes(this);
    this.typoModule = new APP.Modules.Typo(this);
    this.IAModule = new APP.Modules.IA(this);
    this.controlsModule = new APP.Modules.Controls(this);

    // 3D Audio
    //this.audioModule = new APP.Modules.Audio();
    //this.audioModule.initAudio();

    // Stats
    this.addStats();

    // Running
    this.meshesModule.buildTerrain(this.scene);
    this.meshesModule.addObjects(this.scene);
    this.meshesModule.addSelector(this.scene);
    this.IAModule.initCollisions();

    // Listeners for controls
    this.addListeners();

    this.animate();
};

APP.Core.prototype.addListeners = function() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false );
    window.addEventListener('mousedown', this.controlsModule.onMouseDown.bind(this.controlsModule), false);
    window.addEventListener('mouseup', this.controlsModule.onMouseUp.bind(this.controlsModule), false);
    window.addEventListener('keydown', this.controlsModule.onKeyDown.bind(this.controlsModule), false);
    window.addEventListener('keyup', this.controlsModule.onKeyUp.bind(this.controlsModule), false);
    window.addEventListener('mousewheel', this.controlsModule.onMouseWheel.bind(this.controlsModule), false);
    window.addEventListener('DOMMouseScroll', this.controlsModule.onMouseWheel.bind(this.controlsModule), false); // firefox
    window.addEventListener('mousemove', this.controlsModule.onMouseMove.bind(this.controlsModule), false);

    // Remove context menu
    window.addEventListener('contextmenu', function (event) {event.preventDefault();}, false);
};

APP.Core.prototype.addStats = function() {
    var container = document.getElementById('container');

    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left	= '0px';
    this.stats.domElement.style.top	= '155px';
    container.appendChild(this.stats.domElement );

    this.rendererStats = new THREEx.RendererStats();
    this.rendererStats.domElement.style.position	= 'absolute';
    this.rendererStats.domElement.style.left	= '0px';
    this.rendererStats.domElement.style.top	= '0px';
    container.appendChild(this.rendererStats.domElement);
};