'use strict';

/** Graphic object factories */
APP.prototype.getTerrain = function() {
    var terrainGeometry = new THREE.PlaneBufferGeometry(200, 200, 64, 64);

    var darkMaterial = this.materials.water();
    var wireframeMaterial = this.materials.water();
    wireframeMaterial.wireframe = true;
    wireframeMaterial.uniforms.uColor.value = new THREE.Color(.4,.2,.1);

    var terrain = THREE.SceneUtils.createMultiMaterialObject(terrainGeometry, [darkMaterial, wireframeMaterial]);
    this.registerMaterial(darkMaterial);
    this.registerMaterial(wireframeMaterial);

    return terrain;
};

APP.prototype.getChroneBody = function(structure, position) {
    var result;
    switch (structure) {
        case 'magma':
            result = this.getMagma(position);
            break;
        case 'monoide':
            break;
        default:
            result = this.getCube();
            break;
    }

    result.position.x = position.x;
    result.position.y = position.y;
    result.position.z = position.z;
    return result;
};

APP.prototype.getMagma = function() {

    var magmaGeometry = new THREE.SphereGeometry(2, 50, 50);
    var magmaMaterial = this.materials.magma();

    var magma = new THREE.Mesh(magmaGeometry, magmaMaterial);
    this.registerMaterial(magma.material);

    return magma;
};

APP.prototype.getCube = function(width, height, depth, numberOfSubdivisions) {
    var cubeGeom = new THREE.BoxGeometry(width, height, depth,
        numberOfSubdivisions, numberOfSubdivisions, numberOfSubdivisions);
    var cubeMat = new THREE.MeshPhongMaterial({color: 0xff0000, wireframe: true});

    for (var i = 0; i<cubeGeom.vertices.length; ++i) {
        cubeGeom.vertices[i].x += width*Math.random()/10;
        cubeGeom.vertices[i].y += height*Math.random()/10;
        cubeGeom.vertices[i].z += depth*Math.random()/10;
    }

    var cube = new THREE.Mesh(cubeGeom, cubeMat);
    cube.position.z = 2;

    return cube;
};