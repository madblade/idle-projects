'use strict';

/* Button released */
APP.Modules.Controls.prototype.onMouseUp = function(event) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.app.camera);

    if (event.button === THREE.MOUSE.RIGHT) {
        this.onRightMouseUp();
    } else if (event.button === THREE.MOUSE.LEFT) {
        this.onLeftMouseUp();
    } else if (event.button === THREE.MOUSE.MIDDLE) {
        this.onMiddleMouseUp();
    }
};

APP.Modules.Controls.prototype.onLeftMouseUp = function() {
    if (!this.squareSelector.enabled) return;
    this.squareSelector.enabled = false;
    this.app.endFrameSelector();

    var intersects = this.raycaster.intersectObjects([this.app.meshesModule.terrain]);
    if (intersects.length <= 0) return;

    this.squareSelector.x2 = intersects[0].point.x;
    this.squareSelector.y2 = intersects[0].point.y;
    this.squareSelector.sort();

    for (var i=0; i<this.app.meshesModule.objects.length; ++i) {

        if (this.app.meshesModule.objects[i].position.x > this.squareSelector.x1 &&
            this.app.meshesModule.objects[i].position.y > this.squareSelector.y1)

            if (this.app.meshesModule.objects[i].position.x < this.squareSelector.x2 &&
                this.app.meshesModule.objects[i].position.y < this.squareSelector.y2) {

                if (this.app.meshesModule.objects[i].owner === 0)
                    this.app.selectObject(this.app.meshesModule.objects[i]);
            }
    }
};

APP.Modules.Controls.prototype.onRightMouseUp = function() {
    if (this.app.meshesModule.selectedObjects.length == 0) return;
    //if (keysPressed.Alt) return;

    var intersects = this.raycaster.intersectObjects(this.app.meshesModule.objects);
    var i;

    /* is that an enemy */
    if (intersects.length > 0 && !(intersects[0].object.owner === 0)) {
        for (i=0; i<this.app.meshesModule.selectedObjects.length; ++i) {
            if (this.app.meshesModule.selectedObjects[i].owner === 0) {
                this.app.meshesModule.selectedObjects[i].target = intersects[0].object;
                this.app.meshesModule.selectedObjects[i].attacks = true;
            }
        }
    /* don't attack */
    } else {
        for (i=0; i<this.app.meshesModule.selectedObjects.length; ++i) {
            if (this.app.meshesModule.selectedObjects[i].owner === 0) {
                this.app.meshesModule.selectedObjects[i].target = null;
                this.app.meshesModule.selectedObjects[i].attacks = false;
            }
        }
    }

    /* go somewhere */
    intersects = this.raycaster.intersectObjects([this.app.meshesModule.terrain]);
    if (intersects.length <= 0) return;

    for (i=0; i<this.app.meshesModule.selectedObjects.length; ++i) {
        if (!(this.app.meshesModule.selectedObjects[i].owner === 0)) continue;
        this.app.meshesModule.selectedObjects[i].destination.x = intersects[0].point.x;
        this.app.meshesModule.selectedObjects[i].destination.y = intersects[0].point.y;
        this.app.meshesModule.selectedObjects[i].needsToMove = true;
    }
};

APP.Modules.Controls.prototype.onMiddleMouseUp = function() {
    //this.app.audioModule.sounds['aphex02'].play();
};