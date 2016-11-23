'use strict';

/* Mouse wheel */
APP.Modules.Controls.prototype.onMouseWheel = function(event) {
    if (this.squareSelector.enabled || this.gamePaused) {return;}
    event.preventDefault();
    event.stopPropagation();

    var delta = 0;
    if (event.wheelDelta !== undefined) { /* WebKit, Opera, Explorer 9 */
        delta = event.wheelDelta;
    } else if ( event.detail !== undefined ) { /* Firefox */
        delta = - event.detail;
    }

    //cameraSpeed = (delta<0) ? cameraSpeed*1.1 : cameraSpeed/1.1;
    this.app.camera.position.z -= delta;
    if (this.app.camera.position.z <= 100) this.app.camera.position.z = 100;
};

/* Mouse move */
APP.Modules.Controls.prototype.onMouseMove = function(event) {
    if (!this.squareSelector.enabled) return;
    event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.app.camera);

    var intersects = this.raycaster.intersectObjects([this.app.meshesModule.terrain]);
    var x = intersects[0].point.x,
        y = intersects[0].point.y;

    /* drawing selector */
    var v = this.app.meshesModule.frameSelector.geometry.vertices;
    v[0].x = 0;
    v[0].y = 0;
    v[1].x = x-this.squareSelector.x1;
    v[1].y = 0;
    v[2].x = x-this.squareSelector.x1;
    v[2].y = y-this.squareSelector.y1;
    v[3].x = 0;
    v[3].y = y-this.squareSelector.y1;
    v[4].x = 0;
    v[4].y = 0;
    this.app.meshesModule.frameSelector.geometry.verticesNeedUpdate = true;
};