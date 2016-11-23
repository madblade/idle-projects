'use strict';

/* Key released */
APP.Modules.Controls.prototype.onKeyUp = function(event) {
    if (this.lastEvent != null && this.lastEvent.keyCode == event.keyCode) {
        this.lastEvent = null;
    }
    switch (event.keyCode) {
        case this.keys.Z:
            this.keysPressed.Z = false;
            break;
        case this.keys.Q:
            this.keysPressed.Q = false;
            break;
        case this.keys.S:
            this.keysPressed.S = false;
            break;
        case this.keys.D:
            this.keysPressed.D = false;
            break;
        case this.keys.Ctrl:
            this.keysPressed.Ctrl = false;
            break;
        case this.keys.Alt:
            this.keysPressed.Alt = false;
            break;
        case this.keys.Shift:
            this.keysPressed.Shift = false;
            break;
        case this.keys.Spacebar:
            this.keysPressed.Spacebar = false;
            break;
        default:break;
    }
};