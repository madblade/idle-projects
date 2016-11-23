'use strict';

APP.Modules.Controls = function(app) {
    this.keys = {Z: 90, Q: 81, S: 83, D: 68, Alt: 18, Ctrl: 17, Tab: 9, Backspace: 8, Shift: 16, Home: 36, F11:122, Escape: 27, Spacebar:32};
    this.keysPressed = {Z:false, Q:false, S:false, D:false, Ctrl:false, Alt:false, Shift:false, Spacebar:false};
    this.lastEvent;
    this.gamePaused = false;

    // Raycaster
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    /* selecting several objects */
    this.squareSelector = {enabled:false, x1:0, y1:0, x2:0, y2:0,
        sort:function(){
            var temp;
            if (this.x1>this.x2){temp=this.x2; this.x2=this.x1; this.x1=temp;}
            if (this.y1>this.y2){temp=this.y2; this.y2=this.y1; this.y1=temp;}
        }
    };

    this.app = app;
};

/* Update controls in the rendering loop */
APP.Modules.Controls.prototype.updateControls = function() {
    if (this.squareSelector.enabled || this.app.meshesModule.masterSphere===null) return;
    if (this.keysPressed.Spacebar && (!this.gamePaused)) {
        this.gamePaused = true;
    } else if ((!this.keysPressed.Spacebar) && this.gamePaused) {
        this.gamePaused = false;
    }
    if (this.gamePaused) return;

    var nextX = 0, nextY = 0, nextZ = 0;
	if (this.keysPressed.Z) {{nextY+=this.app.meshesModule.masterSphere.capability;}}
	if (this.keysPressed.Q) {{nextX-=this.app.meshesModule.masterSphere.capability;}}
	if (this.keysPressed.S) {{nextY-=this.app.meshesModule.masterSphere.capability;}}
	if (this.keysPressed.D) {{nextX+=this.app.meshesModule.masterSphere.capability;}}

    nextX = nextX + this.app.meshesModule.masterSphere.position.x;
    nextY = nextY + this.app.meshesModule.masterSphere.position.y;

    if (nextX !== 0 || nextY !== 0) {
        this.app.meshesModule.masterSphere.setDirectionDonc(nextX, nextY);
        this.app.meshesModule.masterSphere.motionDonc();
    }

    /* update perspective */
    this.app.camera.position.x = nextX;
    this.app.camera.position.y = nextY - 75;//+ (2)*(masterSphere.position.z-camera.position.z);
    this.app.camera.lookAt(new THREE.Vector3(
        this.app.meshesModule.masterSphere.position.x,
        this.app.meshesModule.masterSphere.position.y+100,
        this.app.meshesModule.masterSphere.position.z)
    );
};

/****** OBJECT MANAGEMENT ******/
APP.Core.prototype.selectObject = function(obj) {
    if (obj === this.meshesModule.masterSphere) return;
    obj.setColor(0,1,0.5);
    this.meshesModule.selectedObjects.push(obj);
};

APP.Core.prototype.unSelectObjects = function() {
    for (var i=0; i<this.meshesModule.selectedObjects.length; ++i) {
        if (!(this.meshesModule.selectedObjects[i].owner === 0)){
            this.meshesModule.selectedObjects[i].setColor(0.8, 0, 0);
        } else {
            this.meshesModule.selectedObjects[i].setColor(0,0,0.8);
        }
    }
    this.meshesModule.selectedObjects = [];
};

APP.Core.prototype.unSelectObjectAt = function(i) {
    if (!(this.meshesModule.selectedObjects[i].owner === 0)){
        this.meshesModule.selectedObjects[i].setColor(0.8, 0, 0);
    } else {
        this.meshesModule.selectedObjects[i].setColor(0,0,0.8);
    }
    this.meshesModule.selectedObjects.splice(i, 1);
};

APP.Core.prototype.endFrameSelector = function() {
    var v = this.meshesModule.frameSelector.geometry.vertices;
    v[0].x = 0;
    v[0].y = 0;
    v[1].x = 0;
    v[1].y = 0;
    v[2].x = 0;
    v[2].y = 0;
    v[3].x = 0;
    v[3].y = 0;
    v[4].x = 0;
    v[4].y = 0;
    this.meshesModule.frameSelector.geometry.verticesNeedUpdate = true;
};

APP.Core.prototype.removeObject = function(object, index) {
    this.scene.remove(object);

    /* update index arrays */
    var numberOfObjects = this.meshesModule.objects.length;
    for (var j=0; j<numberOfObjects; ++j) {
        if (this.IAModule.objectsAxisX[j]>index)
            this.IAModule.objectsAxisX[j] --;

        if (this.IAModule.objectsAxisY[j]>index)
            this.IAModule.objectsAxisY[j] --;

        if (this.IAModule.objectsAxisZ[j]>index)
            this.IAModule.objectsAxisZ[j] --;

        if (this.meshesModule.objects[j].indexX > this.meshesModule.objects[index].indexX)
            this.meshesModule.objects[j].indexX --;

        if (this.meshesModule.objects[j].indexY > this.meshesModule.objects[index].indexY)
            this.meshesModule.objects[j].indexY --;

        /*if (objects[j].indexZ > objects[index].indexZ)
         objects[j].indexZ --;*/

        if (this.meshesModule.objects[j].index > index)
            this.meshesModule.objects[j].index --;
    }

    this.IAModule.objectsAxisX.splice(this.meshesModule.objects[index].indexX,1);
    this.IAModule.objectsAxisY.splice(this.meshesModule.objects[index].indexY,1);
    /*objectsAxisZ.splice(objects[index].indexZ,1);*/
    this.meshesModule.objects.splice(index, 1);
};