'use strict';

/* Terrain */
APP.Modules.Meshes.prototype.buildTerrain = function() {
    var geometry = new THREE.Geometry();

    var texture = THREE.ImageUtils.loadTexture("resources/textures/green.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    var material = new THREE.MeshBasicMaterial({map:texture});

    geometry.vertices.push(
        new THREE.Vector3(-10000,-10000, 0),
        new THREE.Vector3( 10000,-10000, 0),
        new THREE.Vector3( 10000, 10000, 0),
        new THREE.Vector3(-10000, 10000, 0)
    );
    geometry.faces.push(
        new THREE.Face3(0,1,2),
        new THREE.Face3(0,2,3)
    );

    // UV Mapping
    var geoUV = [
        new THREE.Vector2(0,0),
        new THREE.Vector2(1,0),
        new THREE.Vector2(1,1),
        new THREE.Vector2(0,1)
    ];
    geometry.faceVertexUvs[0] = [];
    geometry.faceVertexUvs[0][0] = [geoUV[0], geoUV[1], geoUV[2]];
    geometry.faceVertexUvs[0][1] = [geoUV[0], geoUV[2], geoUV[3]];

    // Colors
    var light = new THREE.AmbientLight(0xffffff);
    this.app.scene.add(light);

    this.terrain = new THREE.Mesh(geometry, material);
    this.app.scene.add(this.terrain);
};

/* Agents */
APP.Modules.Meshes.prototype.addObjects = function() {
    var sphereGeometry = new THREE.BoxGeometry(this.sphereRadius, 16, 16);
    var sphereMaterial;
    var sphere;
    var color;

    /* MINE */
    var i=0;
    var fer=5;
    var pack=10;
    Object.keys(this.app.typoModule.textItems).forEach(function (name) {
        if (name != 'traceur') {
            // body
            color = (i<fer) ? new THREE.Color(0.8,0.8,0.8) : new THREE.Color(0.2,0.2,0.2);
            sphereMaterial = new THREE.MeshBasicMaterial({color: color});

            sphere = new this.Sphere(this.app,
                i * 20 + (window.innerWidth - this.nbMine * 20) / 2 + 10 * Math.random(),
                10 * Math.random(),
                10 + Math.random(),
                sphereGeometry, sphereMaterial, 1, 150, i,
                100, // HP
                name // textName
            );

            sphere.fireRadius = 5;
            sphere.hasText = true;
            sphere.text = name;
            this.app.scene.add(sphere);
            this.objects.push(sphere);

            ++i;
        }
    }.bind(this));

    /* MASTER */
    sphereMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0.8,0,0.8)});
    this.masterSphere = new this.Sphere(this.app,
        window.innerWidth/2+10*Math.random(),
        100+10*Math.random(),
        10+Math.random(),
        sphereGeometry, sphereMaterial, 1, 150, /*0,//*/this.nbMine-1,
        200000, // HP
        'traceur'
    );
    this.masterSphere.fireRadius = 5;
    this.app.scene.add(this.masterSphere);
    this.objects.push(this.masterSphere);

    /* THEIRS */
    for (i=0; i<this.nbEnemies; i++) {
        sphereMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color(0.8,0,0)});
        sphere = new this.Sphere(this.app,
            (window.innerWidth-Math.sqrt(this.nbEnemies)*20)/2+Math.floor(i/Math.sqrt(this.nbEnemies))*20+10*Math.random(),
            window.innerHeight/3+(i%Math.floor(Math.sqrt(this.nbEnemies)))*20+10*Math.random(),
            10+Math.random(),
            sphereGeometry, sphereMaterial, 1, 100, i+this.nbMine,
            10, // HP
            null
        );
        sphere.fireRadius = 5;
        this.app.scene.add(sphere);
        this.objects.push(sphere);
    }
};

APP.Modules.Meshes.prototype.addSelector = function() {
    var material = new THREE.LineBasicMaterial({color: new THREE.Color(1,1,1)});
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(0,0,1),
        new THREE.Vector3(0,0,1)
    );
    this.frameSelector = new THREE.Line(geometry, material);
    this.app.scene.add(this.frameSelector);
};
