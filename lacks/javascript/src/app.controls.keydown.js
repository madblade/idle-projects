'use strict';

/* Key pressed */
APP.Modules.Controls.prototype.onKeyDown = function(event) {
    if (event.keyCode != this.keys.F11) event.preventDefault();
    if (event.keyCode === this.keys.Escape) this.app.unSelectObjects();
    if (this.lastEvent != null && this.lastEvent.keyCode == event.keyCode) {
        this.lastEvent = event;
        return;
    }
    switch (event.keyCode) {
        case this.keys.Z:
            this.keysPressed.Z = true;
            break;
        case this.keys.Q:
            this.keysPressed.Q = true;
            break;
        case this.keys.S:
            this.keysPressed.S = true;
            break;
        case this.keys.D:
            this.keysPressed.D = true;
            break;
        case this.keys.Ctrl:
            this.keysPressed.Ctrl = true;
            break;
        case this.keys.Alt:
            /* prevent alt-tab bugs */
            this.keysPressed.Alt = true;
            this.keysPressed.Ctrl = false;
            this.keysPressed.Shift = false;
            this.keysPressed.Spacebar = false;
            this.keysPressed.Z = false;
            this.keysPressed.Q = false;
            this.keysPressed.S = false;
            this.keysPressed.D = false;
            break;
        case this.keys.Shift:
            this.keysPressed.Shift = true;
            break;
        case this.keys.Spacebar:
            this.keysPressed.Spacebar = true;
            break;
        default:return;
    }
    this.lastEvent = event;
};