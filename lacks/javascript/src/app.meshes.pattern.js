'use strict';

APP.Modules.Meshes.prototype.Sphere = function(app, x, y, z, geometry, material, speed, range, index, life, textName) {
    THREE.Object3D.call(this);

    this.app = app;

    function addOffsetToVertices(object, x,y,z) {
        object.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(x,y,z))
    }

    var headGeometry = new      THREE.BoxGeometry(4, 4, 4),
        armGeomerty = new       THREE.BoxGeometry(4, 4, 4),
        forearmGeomerty = new   THREE.BoxGeometry(4, 4, 4),
        handGeomerty = new      THREE.BoxGeometry(4, 4, 4),
        thighGeomerty = new     THREE.BoxGeometry(4, 4, 4),
        legGeomerty = new       THREE.BoxGeometry(4, 4, 4),
        footGeomerty = new      THREE.BoxGeometry(4, 4, 4/*, 0, Math.PI * 2, 0, Math.PI / 2*/); // half sphere

    var armOffsetX = 9,
        legOffsetX = 4;

    /* Aspect */
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
    this.scale.x = 0.5;
    this.scale.y = 0.5;
    this.scale.z = 0.5;

    // head
    this.head = new THREE.Mesh(headGeometry, material);
    this.head.position.x = 0;
    this.head.position.y = 0;
    this.head.position.z = 50;
    this.head.scale.x = 1.5;
    this.head.scale.y = 1.5;
    this.head.scale.z = 1.5;

    // body
    this.body = new THREE.Mesh(geometry, material);
    this.body.position.x = 0;
    this.body.position.y = 0;
    this.body.position.z = 35;
    this.body.scale.x = 1.3;
    this.body.scale.y = 0.5;
    this.body.scale.z = 1.3;

    // arms
    this.arms = {
        left : new THREE.Mesh(armGeomerty, material),
        right : new THREE.Mesh(armGeomerty, material)
    };
    this.arms.left.position.x = -armOffsetX;
    this.arms.left.position.z = 42;
    this.arms.right.position.x = armOffsetX;
    this.arms.right.position.z = 42;
    this.arms.left.scale.z = 2.3;
    this.arms.left.scale.y = 1.2;
    this.arms.right.scale.z = 2.3;
    this.arms.left.scale.y = 1.2;
    //addOffsetToVertices(this.arms.right, 0, 0, 50);
    addOffsetToVertices(this.arms.left, 0, 0, -0.69); // common geometries

    // forearms
    this.forearms = {
        left : new THREE.Mesh(forearmGeomerty, material),
        right : new THREE.Mesh(forearmGeomerty, material)
    };
    this.forearms.left.position.x = -armOffsetX;
    this.forearms.left.position.y = -1;
    this.forearms.left.position.z = 30;
    this.forearms.right.position.x = armOffsetX;
    this.forearms.right.position.y = 1;
    this.forearms.right.position.z = 30;
    this.forearms.left.scale.z = 2;
    this.forearms.right.scale.z = 2;
    addOffsetToVertices(this.forearms.left, 0, 0, -0.69); // common geometries

    // hands
    this.hands = {
        left : new THREE.Mesh(handGeomerty, material),
        right : new THREE.Mesh(handGeomerty, material)
    };
    this.hands.left.position.x = -armOffsetX;
    this.hands.left.position.z = 25;
    this.hands.right.position.x = armOffsetX;
    this.hands.right.position.z = 25;
    this.hands.left.scale.x = 0.5;
    this.hands.right.scale.x = 0.5;
    addOffsetToVertices(this.hands.left, 0, 0, -5.75);

    // thighs
    this.thighs = {
        left : new THREE.Mesh(thighGeomerty, material),
        right : new THREE.Mesh(thighGeomerty, material)
    };
    this.thighs.left.position.x = -legOffsetX;
    this.thighs.left.position.z = 20;
    this.thighs.right.position.x = legOffsetX;
    this.thighs.right.position.z = 20;
    this.thighs.left.scale.x = 1.7;
    this.thighs.left.scale.y = 1.7;
    this.thighs.left.scale.z = 2.8;
    this.thighs.right.scale.x = 1.7;
    this.thighs.right.scale.y = 1.7;
    this.thighs.right.scale.z = 2.8;
    addOffsetToVertices(this.thighs.left, 0, 0, -2.3);

    // legs
    this.legs = {
        left : new THREE.Mesh(legGeomerty, material),
        right : new THREE.Mesh(legGeomerty, material)
    };
    this.legs.left.position.x = -legOffsetX;
    this.legs.left.position.z = 2;
    this.legs.right.position.x = legOffsetX;
    this.legs.right.position.z = 2;
    this.legs.left.scale.x = 1.5;
    this.legs.left.scale.y = 1.3;
    this.legs.left.scale.z = 2.2;
    this.legs.right.scale.x = 1.5;
    this.legs.right.scale.y = 1.3;
    this.legs.right.scale.z = 2.2;
    addOffsetToVertices(this.legs.left, 0, 0, -3.68);

    // feet
    this.feet = {
        left: new THREE.Mesh(footGeomerty, material),
        right: new THREE.Mesh(footGeomerty, material)
    };
    this.feet.left.position.x = -legOffsetX;
    this.feet.left.position.z = 0;
    this.feet.right.position.x = legOffsetX;
    this.feet.right.position.z = 0;
    this.feet.left.scale.x  = 1.3;
    this.feet.right.scale.x = 1.3;
    this.feet.left.scale.y = 2.3;
    this.feet.right.scale.y = 2.3;

    if (textName !== null && textName !== undefined) {
        this.add(this.app.typoModule.createText(this.app.typoModule.textItems[textName], (index<5) ? new THREE.Color(0.8,0.8,0.8) : new THREE.Color(0.2,0.2,0.2)));
    }

    this.head.parent = this;
    this.body.parent = this;
    this.arms.left.parent = this;
    this.arms.right.parent = this;
    this.forearms.left.parent = this;
    this.forearms.right.parent = this;
    this.hands.left.parent = this;
    this.hands.right.parent = this;
    this.thighs.left.parent = this;
    this.thighs.right.parent = this;
    this.legs.left.parent = this;
    this.legs.right.parent = this;
    this.feet.left.parent = this;
    this.feet.right.parent = this;

    // add parts to mesh
    this.add(this.head);
    this.add(this.body);
    this.add(this.arms.left);
    this.add(this.arms.right);
    this.add(this.forearms.left);
    this.add(this.forearms.right);
    this.add(this.hands.left);
    this.add(this.hands.right);

    this.add(this.thighs.left);
    this.add(this.thighs.right);
    this.add(this.legs.left);
    this.add(this.legs.right);
    this.add(this.feet.left);
    this.add(this.feet.right);

    // movement
    this.direction = {xDonc:0,yDonc:0,zDonc:0};
    this.stepDonc = 0;

    /* Collisions */
    this.indexX = -1;
    this.indexY = -1;
    //this.indexZ = -1;

    /* RP, IA */
    this.text = null;
    this.capability = speed;
    this.range = range;

    /* init at the beginning */
    this.index = index;
    this.owner = (index < this.app.meshesModule.nbMine) ? 0 : 1;  // todo change this

    this.life = life;
    this.destination = {x:0, y:0, z:10};
    this.needsToMove = false;
    this.attacks = false;
    this.firing = false;
    this.target = null;
    this.heat = 0;
};

APP.Modules.Meshes.prototype.Sphere.prototype = new THREE.Object3D();

APP.Modules.Meshes.prototype.Sphere.prototype.setColor = function(r,g,b) {
    this.head.material.color.setRGB(r,g,b);
    this.body.material.color.setRGB(r,g,b);
    this.arms.left.material.color.setRGB(r,g,b);
    this.arms.right.material.color.setRGB(r,g,b);
    this.forearms.left.material.color.setRGB(r,g,b);
    this.forearms.right.material.color.setRGB(r,g,b);
    this.hands.left.material.color.setRGB(r,g,b);
    this.hands.right.material.color.setRGB(r,g,b);

    this.thighs.left.material.color.setRGB(r,g,b);
    this.thighs.right.material.color.setRGB(r,g,b);
    this.legs.left.material.color.setRGB(r,g,b);
    this.legs.right.material.color.setRGB(r,g,b);
    this.feet.left.material.color.setRGB(r,g,b);
    this.feet.right.material.color.setRGB(r,g,b);
};

APP.Modules.Meshes.prototype.Sphere.prototype.moveDonc = function(increaseX, increaseY) {
    this.position.x += increaseX;
    this.position.y += increaseY;
    this.stepDonc += 1/8;
    var stepPlusHPi = this.stepDonc+Math.PI/2;

    this.arms.left.rotation.x = (Math.cos(stepPlusHPi));
    this.arms.right.rotation.x = (Math.sin(this.stepDonc));

    this.forearms.left.position.setY(Math.cos(stepPlusHPi)*8);
    this.forearms.left.position.z = 39+2.3*(this.arms.left.geometry.vertices[5].z+this.arms.left.geometry.vertices[6].z)/2;
    this.forearms.left.rotation.x = (Math.cos(stepPlusHPi-0.5));
    this.forearms.right.position.setY(Math.sin(this.stepDonc)*8);
    this.forearms.right.position.z = 39+2.3*(this.arms.right.geometry.vertices[5].z+this.arms.right.geometry.vertices[6].z)/2;
    this.forearms.right.rotation.x = (Math.sin(this.stepDonc-0.5));

    this.hands.left.position.setY(Math.cos(stepPlusHPi) * 8);
    this.hands.left.position.z = 42 + 2*this.forearms.left.geometry.vertices[4].z;
    this.hands.left.rotation.x = (Math.cos(stepPlusHPi-0.5));
    this.hands.right.position.setY(Math.sin(this.stepDonc) * 8);
    this.hands.right.position.z = 42 + 2*this.forearms.right.geometry.vertices[4].z;
    this.hands.right.rotation.x = (Math.sin(this.stepDonc-0.5));

    this.thighs.left.rotation.x = (Math.sin(this.stepDonc));
    this.thighs.right.rotation.x = (Math.cos(stepPlusHPi));

    this.legs.left.position.setY(Math.sin(this.stepDonc)*8);
    this.legs.left.position.z = 16+2.3*(this.thighs.right.geometry.vertices[5].z);
    this.legs.left.rotation.x = (Math.sin(this.stepDonc-0.5));
    this.legs.right.position.setY(Math.cos(stepPlusHPi)*8);
    this.legs.right.position.z = 16+2.3*(this.thighs.left.geometry.vertices[5].z);
    this.legs.right.rotation.x = (Math.cos(stepPlusHPi-0.5));

    this.feet.left.position.y =  2.6*this.legs.left.position.y;
    this.feet.right.position.y = 2.6*this.legs.right.position.y;
};

APP.Modules.Meshes.prototype.Sphere.prototype.setDirectionDonc = function(xN,yN/*,zN*/) {
    var deltaX = xN-this.position.x;
    var deltaY = yN-this.position.y;
    this.direction.x = deltaX;
    this.direction.y = deltaY;
};

APP.Modules.Meshes.prototype.Sphere.prototype.motionDonc = function() {
    if (this.direction.x !== 0 || this.direction.y !== 0) {
        this.rotateDonc();
        var increases = this.collideDonc();
        if (increases != null) {
            this.moveDonc(increases[0], increases[1]);
            this.app.IAModule.updateObjectAxis(this.index);
        }
    }
};

APP.Modules.Meshes.prototype.Sphere.prototype.rotateDonc = function() {
    var angle = Math.atan2(this.direction.y, this.direction.x)-Math.PI/2;
    var delta = angle - this.rotation.z;

    if (Math.abs(delta) > Math.PI) {
        if (delta > 0) {
            this.rotation.z += 2*Math.PI;
        } else {
            this.rotation.z -= 2*Math.PI;
        }
        delta = angle - this.rotation.z;
    }

    if (delta != 0) {
        this.rotation.z += delta / 4;
    }
};

APP.Modules.Meshes.prototype.Sphere.prototype.collideDonc = function() {
    var iterator = new this.app.IAModule.ObjectsIterator(this.app, this.index,this.app.meshesModule.sphereRadius+this.capability);
    var you;
    var px = this.position.x, py = this.position.y;
    var pxI, pyI;

    function mathSquare(n) {
        return n*n;
    }

    /* forecasting */
    var alpha = this.capability/Math.sqrt(mathSquare(this.direction.x)+mathSquare(this.direction.y));
    var increaseX = this.direction.x * (this.direction.y === 0 ? this.capability : alpha);
    var increaseY = this.direction.y * (this.direction.x === 0 ? this.capability : alpha);
    var pxT = px + increaseX;
    var pyT = py + increaseY;

    /* COLLISION DETECTOR */
    while ((you = iterator.next()) != null) { // level O(n) =D
        pxI = you.position.x;
        pyI = you.position.y;

        /* colliding */
        if (mathSquare(pxT-pxI)+mathSquare(pyT-pyI)<mathSquare(this.app.meshesModule.sphereRadius)) {
            this.heat = 5;  // wrath increases as colliding occurs
            return null;
        }
    }

    this.heat = 0;  // through success, peace
    return [increaseX, increaseY];
};
