'use strict';

APP.Modules.Objects = function (app) {
    this.app = app;

    this.currentUnits = [];
    this.currentUnitsToDestroy = [];
    this.newUnits = [];

    this.currentDirection = this.app.DirectionEnum.NOWHERE;

    this.pawns = undefined;
    this.redColor = 0xffbad2;
    this.blueColor = 0x40e0d0;
};

APP.Modules.Objects.prototype.run = function () {
	this.pawns = new PIXI.Container();
    this.graphicBoard = new PIXI.Container();

    this.app.scene.addChild(this.graphicBoard);
	this.app.scene.addChild(this.pawns);

    this.pawns.x = 20 + this.app.graphicsX;
    this.pawns.y = 20 + this.app.graphicsY;

    this.board = {
        minI:0,
        maxI:0,
        minJ: 0,
        maxJ: 0
    };
};

APP.Modules.Objects.prototype.reloadBoard = function () {
    this.graphicBoard.x = this.app.graphicsX;
    this.graphicBoard.y = this.app.graphicsY;

    for (var childId in this.graphicBoard.children) {
        var currentCell = this.graphicBoard.getChildAt(childId);
        if (currentCell === undefined)
            console.log("WARN");
        var off = this.app.pawnWidth;
        currentCell.x = currentCell.i*off;
        currentCell.y = currentCell.j*off;
        currentCell.width = off;
        currentCell.height = off;
    }
};

APP.Modules.Objects.prototype.loadBoard = function () {
    this.graphicBoard.x = this.app.graphicsX;
    this.graphicBoard.y = this.app.graphicsY;
    var board = this.board;
    for (var i = board.minI; i<=board.maxI; ++i) {
        for (var j = board.minJ; j<=board.maxJ; ++j) {

            //TODO detect holes
            var currentCell = PIXI.Sprite.fromImage('static/assets/board.png');
            currentCell.i = i;
            currentCell.j = j;
            var off = this.app.pawnWidth;
            currentCell.x = i*off;
            currentCell.y = j*off;
            currentCell.width = off;
            currentCell.height = off;
            this.graphicBoard.addChild(currentCell);
        }
    }
};

APP.Modules.Objects.prototype.reloadUnits = function () {
    for (var unitId in this.units) {
        var currentUnit = this.units[unitId];
        var currentPawn = this.findPawnByKey(currentUnit.key, this.pawns);
        if (currentPawn === undefined)
            console.log("WARN");

        // Graphic
        currentPawn.x = currentUnit.i * this.app.pawnWidth;
        currentPawn.y = currentUnit.j * this.app.pawnHeight;
        currentPawn.width = this.app.pawnWidth*0.6;
        currentPawn.height = this.app.pawnHeight*0.6*1.5;
    }
};

APP.Modules.Objects.prototype.loadUnits = function (units) {
    this.units = units;
	for (var unitId in units) {
        var currentUnit = units[unitId];
		var currentPawn = PIXI.Sprite.fromImage('static/assets/bunny.png');

        // Model
        currentPawn.key = currentUnit.key;

        // Graphic
		currentPawn.x = currentUnit.i * this.app.pawnWidth;
		currentPawn.y = currentUnit.j * this.app.pawnHeight;
        currentPawn.width = this.app.pawnWidth*0.6;
        currentPawn.height = this.app.pawnHeight*0.6*1.5;
		currentPawn.tint = currentUnit.team == "blue" ? this.blueColor : this.redColor;
        currentPawn.anchor.set(0.5,0.5);

        // Add to pawn objects
		this.pawns.addChild(currentPawn);
	}
};

APP.Modules.Objects.prototype.findPawnByKey = function (key, pawns) {
    var currentPawn;
    for (var pawnId in pawns.children) {
        currentPawn = pawns.getChildAt(pawnId);
        if (currentPawn.key == key) {
            return currentPawn;
        }
    }
    console.log("WARN: APP.Modules.Objects.prototype.findPawnByKey pawn not found");
};

APP.Modules.Objects.prototype.shrinkBoard = function () {
    //TODO detect holes
    var currentCell;

    for (var cellId=this.graphicBoard.children.length-1; cellId >= 0; --cellId) {
        currentCell = this.graphicBoard.getChildAt(cellId);
        if (currentCell === undefined) continue;
        if (!this.existsCell(currentCell.i, currentCell.j)) {
            this.graphicBoard.removeChild(currentCell);
        }
    }
};

APP.Modules.Objects.prototype.existsCell = function(i, j) {
    if (i < this.board.minI) return false;

    if (j < this.board.minJ) return false;

    if (i > this.board.maxI) return false;

    if (j > this.board.maxJ) return false;

    // Here one can restrict where a pawn falls
    return true;
};

APP.Modules.Objects.prototype.updatePawnPositions = function () {
    var units = (this.newUnits[0] == undefined) ? this.units : this.newUnits;
    var currentUnit;
    var currentPawn;
    for (var unitId=0; unitId<units.length; ++unitId) {
        currentUnit = units[unitId];
        currentPawn = this.findPawnByKey(currentUnit.key, this.pawns);
        if (currentPawn === undefined) continue;
        currentPawn.x = currentUnit.i * this.app.pawnWidth;
        currentPawn.y = currentUnit.j * this.app.pawnHeight;
    }
};

APP.Modules.Objects.prototype.deletePawns = function() {
    var unitsToDelete = this.currentUnitsToDestroy;
    var currentUnit, currentPawn;
    var pawns = this.pawns.children;
    var length = pawns.length;
    for (var pawnId = length-1; pawnId >= 0; --pawnId) {
        currentPawn = this.pawns.getChildAt(pawnId);

        for (var unitId in unitsToDelete) {
            currentUnit = unitsToDelete[unitId];
            if (currentUnit.key == currentPawn.key) {
                this.pawns.removeChildAt(pawnId);
            }
        }
    }
};

APP.Modules.Objects.prototype.updatePlayer = function(player) {

    if (player == "blue") {
        $("#helper-button").css(
            'background-color', '#555560'
        );
        this.app.renderer.backgroundColor = 0x555560;
    } else {
        $("#helper-button").css(
            'background-color', '#605555'
        );
        this.app.renderer.backgroundColor = 0x605555;
    }
};

APP.Modules.Objects.prototype.declareVictory = function(team) {
    $("#winner-team").text(team);
    $("#modal-victory").modal('toggle');
};