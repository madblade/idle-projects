'use strict';

/* Button pressed */
APP.Modules.Controls.prototype.onMouseDown = function(event) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.app.camera);

    if (event.button === THREE.MOUSE.RIGHT) {
        this.onRightMouseDown();
    } else if (event.button === THREE.MOUSE.LEFT) {
        this.onLeftMouseDown();
    } else if (event.button === THREE.MOUSE.MIDDLE) {
        this.onMiddleMouseDown();
    }
};

APP.Modules.Controls.prototype.onLeftMouseDown = function() {
    //if (keysPressed.Alt) return;
    var intersects = this.raycaster.intersectObjects(this.app.meshesModule.objects, true);

    /* nothing under the cursor */
    if (intersects.length === 0) {
        /* deselection */
        if (!this.keysPressed.Ctrl) {
            this.app.unSelectObjects();
        }
        /* starting a new selector */
        intersects = this.raycaster.intersectObjects([this.app.meshesModule.terrain]);
        if (intersects.length === 0) return;
        this.squareSelector.enabled = true;
        this.squareSelector.x1 = intersects[0].point.x;
        this.squareSelector.y1 = intersects[0].point.y;

        /* place the selector */
        this.app.meshesModule.frameSelector.position.x = this.squareSelector.x1;
        this.app.meshesModule.frameSelector.position.y = this.squareSelector.y1;
        return;
    }

    /* multi selection enabled (Ctrl) */
    if (this.keysPressed.Ctrl && this.app.meshesModule.selectedObjects.length>0) {
        if (intersects[0].object.owner !== this.app.meshesModule.selectedObjects[0].owner) return;
        var alreadySelected = false, j=0;
        for (var i=0; i<this.app.meshesModule.selectedObjects.length; ++i) {
            if (this.app.meshesModule.selectedObjects[i] === intersects[0].object) {
                alreadySelected = true;
                j=i;
                break;
            }
        }
        if (alreadySelected)
            this.app.unSelectObjectAt(j);
        else
            this.app.selectObject(intersects[0].object);
        return;
    }

    /* only one object under cursor */
    this.app.unSelectObjects();

    if (intersects.length > 0) {
        /* find corresponding object */
        this.app.selectObject(intersects[0].object.parent);
    }
};

/* moving objects */
APP.Modules.Controls.prototype.onRightMouseDown = function() {
    //if (keysPressed.Alt) return;
};

APP.Modules.Controls.prototype.onMiddleMouseDown = function() {
    //this.app.audioModule.sounds['aphex01'].play();
};