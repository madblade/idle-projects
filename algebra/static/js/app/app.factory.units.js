'use strict';

APP.prototype.addMagma = function(position) {
    var visual = this.getChroneBody('magma', position);
    var move = this.getMove('magma');
    var coups = this.getCoups('magma');
    var memory = this.getMemory('magma');

    var see = this.getSee('magma');
    var watch = this.getWatch('magma');
    this.addUnit(position, visual, move, coups, see, watch, memory);
};

APP.prototype.addUnit = function(position, visual, move, coups, see, watch, memory) {
    this.scene.add(visual);

    var light = new THREE.PointLight( 0x0000ff );
    light.position.set(position.x, position.y, 20);
    this.scene.add(light);

    this.model.push(
        {
            visual:visual,
            light:light,

            move:move,
            coups:coups,

            see:see,
            watch:watch,

            memory:memory
        }
    );
};