'use strict';

APP.Core.prototype.onWindowResize = function () {
    this.renderer.resize(window.innerWidth, window.innerHeight - $('#helper-button').height());

    //resize pawns
    var maxI = this.objectsModule.board.maxI;
    var maxJ = this.objectsModule.board.maxJ;
    var minI = this.objectsModule.board.minI;
    var minJ = this.objectsModule.board.minJ;
    var nbPawnMax = Math.max(maxI-minI, maxJ-minJ);
    this.pawnWidth = (1./(nbPawnMax+2))*(Math.min(this.renderer.width, this.renderer.height));
    this.pawnHeight = this.pawnWidth;

    var width = this.numberOfUnitsOnX*this.pawnWidth;
    var height = this.numberOfUnitsOnY*this.pawnHeight;
    this.graphicsX = Math.abs(this.renderer.width - width)/2;
    this.graphicsY = Math.abs(this.renderer.height - height)/2;

    this.objectsModule.graphicBoard.x = this.graphicsX;
    this.objectsModule.graphicBoard.y = this.graphicsY;
    this.objectsModule.pawns.x = this.pawnWidth/2 + this.graphicsX;
    this.objectsModule.pawns.y = this.pawnWidth/2 + this.graphicsY;
    this.objectsModule.reloadBoard();
    this.objectsModule.reloadUnits();

    this.objectsModule.updatePawnPositions();
    this.objectsModule.shrinkBoard();
};

APP.Core.prototype.handlerMouseDown = function (event) {
};

APP.Core.prototype.handlerMouseMove = function () {
};

APP.Core.prototype.handlerMouseUp = function (event) {
    event.preventDefault();
};

APP.Core.prototype.handlerKeyUp = function (event) {
    event.preventDefault();

    if (this.gameModule === undefined || this.gameModule.state != this.StateEnum.WAITING)
        return;

    switch (event.which) {
        case this.keyEnum.DOWN :
        case this.keyEnum.S :
            this.gameModule.activeKey = this.DirectionEnum.DOWN;
            break;
        case this.keyEnum.RIGHT :
        case this.keyEnum.D:
            this.gameModule.activeKey = this.DirectionEnum.RIGHT;
            break;
        case this.keyEnum.UP:
        case this.keyEnum.Z:
        case this.keyEnum.W:
            this.gameModule.activeKey = this.DirectionEnum.UP;
            break;
        case this.keyEnum.LEFT:
        case this.keyEnum.Q:
        case this.keyEnum.A:
            this.gameModule.activeKey = this.DirectionEnum.LEFT;
            break;
        default:
            return;
    }

    this.gameModule.state = this.StateEnum.PROCESSING_INPUT;
};

APP.Core.prototype.handlerKeyDown = function (event) {
    event.preventDefault();
};