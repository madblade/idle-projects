'use strict';

APP.Modules.Game = function (app) {
    this.app = app;

	this.activeKey = this.app.DirectionEnum.NOWHERE;
	this.maxI = app.numberOfUnitsOnX - 1;
	this.maxJ = app.numberOfUnitsOnY - 1;
	this.minI = 0;
	this.minJ = 0;
	this.boardSize = Math.floor((this.maxI+1-this.minI)*(this.maxJ+1-this.minJ));
	this.player = "blue";
    this.winner = "blue";

	this.units = [];
    this.unitsToDelete = [];

    this.state = this.app.StateEnum.WAITING;
};

APP.Modules.Game.prototype.run = function () {
	this.initBoard();

    this.updateObjectBoard();
    this.app.objectsModule.loadBoard();
    this.app.objectsModule.loadUnits(this.units);

    this.app.animationsModule.currentUnits = this.units;
};

APP.Modules.Game.prototype.updateObjectBoard = function() {
    this.app.objectsModule.board = {minI:this.minI, minJ:this.minJ, maxI:this.maxI, maxJ:this.maxJ};
};

APP.Modules.Game.prototype.initBoard = function() {
	var numberOfBluePawns = 0;
	var numberOfRedPawns = 0;
    var key = 0;

    for (var i=this.minI; i<this.maxI+1; ++i) { for (var j=this.minJ; j<this.maxJ+1; ++j) {

        // Randomly assign colors to pawns
        if ( (Math.random()>0.5 && numberOfBluePawns<this.boardSize/2) || numberOfRedPawns >= this.boardSize/2 ){
            numberOfBluePawns += 1;
            this.units.push({
                'key': key,
                'i':i,
                'j':j,
                'team':"blue",
                'direction':this.app.DirectionEnum.NOWHERE
            });
       } else {
            numberOfRedPawns += 1;
            this.units.push({
                'key':key,
                'i':i,
                'j':j,
                'team':"red",
                'direction':this.app.DirectionEnum.NOWHERE
            });
        }
        key += 1;
    }}
};

APP.Modules.Game.prototype.shrinkBoard = function() {
    var currentUnit;
    var minI = this.maxI;
    var minJ = this.maxJ;
    var maxI = this.minI;
    var maxJ = this.minJ;

    for (var unitId in this.units) {
        currentUnit = this.units[unitId];
        if (currentUnit.i < minI) minI = currentUnit.i;
        if (currentUnit.j < minJ) minJ = currentUnit.j;
        if (currentUnit.i > maxI) maxI = currentUnit.i;
        if (currentUnit.j > maxJ) maxJ = currentUnit.j;
    }

    this.maxI = maxI;
    this.maxJ = maxJ;
    this.minI = minI;
    this.minJ = minJ;
};

APP.Modules.Game.prototype.someoneHasWon = function() {
    if (this.units.length < 1) {
        console.log("WARN : no unit found on the board.");
    }

    // Search for different teams
    var firstUnitTeam = this.units[0].team;
    for (var unitId = 1; unitId < this.units.length; ++unitId) {
        if (this.units[unitId].team != firstUnitTeam) return false;
    }

    // Only one team found on the board
    this.winner = firstUnitTeam;
    return true;
};

APP.Modules.Game.prototype.getIJUnit = function(i, j) {
    var currentUnit;
    for (var unitId in this.units) {
        currentUnit = this.units[unitId];
        if (currentUnit.i == i && currentUnit.j == j) return currentUnit;
    }
};

APP.Modules.Game.prototype.isValidPosition = function(i, j) {
    if (i < this.minI) return false;

    if (j < this.minJ) return false;

    if (i > this.maxI) return false;

    if (j > this.maxJ) return false;

    // Here one can restrict where a pawn falls
    return true;
};

// Array copy
APP.Modules.Game.prototype.sendUnitsToDestroy = function() {
    var result = [], currentUnit;
    for (var unitId in this.unitsToDelete) {
        currentUnit = this.unitsToDelete[unitId];
        result.push({
            'key': currentUnit.key,
            'i':currentUnit.i,
            'j':currentUnit.j,
            'team':currentUnit.team,
            'direction':currentUnit.direction
        });
    }
    return result;
};

APP.Modules.Game.prototype.sendUnits = function() {
    var result = [], currentUnit;
    for (var unitId in this.units) {
        currentUnit = this.units[unitId];
        result.push({
            'key': currentUnit.key,
            'i':currentUnit.i,
            'j':currentUnit.j,
            'team':currentUnit.team,
            'direction':currentUnit.direction
        });
    }
    return result;
};

APP.Modules.Game.prototype.processInput = function() {
    var currentUnit, pusherUnit;
    var i, j;
    switch (this.activeKey) {
        case this.app.DirectionEnum.DOWN:
        case this.app.DirectionEnum.RIGHT:

            for (i=this.minI; i<this.maxI+1; ++i) {
                for (j=this.minJ; j<this.maxJ+1; ++j) {
                    currentUnit = this.getIJUnit(i, j);
                    if (currentUnit === undefined) continue;
                    if (currentUnit.team === this.player) {
                        currentUnit.direction = this.activeKey;
                    } else {
                        pusherUnit = this.activeKey == this.app.DirectionEnum.DOWN ? this.getIJUnit(i, j-1) : this.getIJUnit(i-1, j);
                        if (pusherUnit !== undefined && pusherUnit.direction == this.activeKey)
                            currentUnit.direction = this.activeKey;
                    }
                }
            }
            break;

        case this.app.DirectionEnum.UP:
        case this.app.DirectionEnum.LEFT:

            for (i=this.maxI; i>=this.minI; --i) {
                for (j=this.maxJ; j>=this.minJ; --j) {
                    currentUnit = this.getIJUnit(i, j);
                    if (currentUnit === undefined) continue;
                    if (currentUnit.team === this.player) {
                        currentUnit.direction = this.activeKey;
                    } else {
                        pusherUnit = this.activeKey == this.app.DirectionEnum.UP ? this.getIJUnit(i, j+1) : this.getIJUnit(i+1, j);
                        if (pusherUnit !== undefined && pusherUnit.direction == this.activeKey)
                            currentUnit.direction = this.activeKey;
                    }
                }
            }
            break;
    }
};

APP.Modules.Game.prototype.updateModel = function() {
    // Delete border units
    var currentUnit;
    var unitId;
    this.unitsToDelete = [];
    for (unitId=0; unitId< this.units.length; ++unitId) {
        currentUnit = this.units[unitId];
        switch (currentUnit.direction) {
            case this.app.DirectionEnum.LEFT:
                --currentUnit.i;
                break;
            case this.app.DirectionEnum.RIGHT:
                ++currentUnit.i;
                break;
            case this.app.DirectionEnum.UP:
                --currentUnit.j;
                break;
            case this.app.DirectionEnum.DOWN:
                ++currentUnit.j;
                break;
        }
        if (!this.isValidPosition(currentUnit.i, currentUnit.j)) this.unitsToDelete.push(currentUnit);
    }
    for (unitId = this.units.length-1; unitId>=0; --unitId) {
        for (var unitToDeleteId in this.unitsToDelete) {
            if (this.unitsToDelete[unitToDeleteId] == this.units[unitId]) {
                this.units.splice(unitId, 1);
                // Decrease number of units
                --this.boardSize;
            }
        }
    }

    // Reinitialize object directions
    for (unitId in this.units) {
        this.units[unitId].direction = this.app.DirectionEnum.NOWHERE;
    }

    // Reduce board
    this.shrinkBoard();
};

APP.Modules.Game.prototype.update = function() {

    switch (this.state) {
        case this.app.StateEnum.WAITING:
            break;

        case this.app.StateEnum.PROCESSING_INPUT:
            // Process user input
            this.processInput();

            // Give units to animator and trigger
            this.app.objectsModule.currentUnits = this.sendUnits(this.units);
            this.app.objectsModule.currentDirection = this.activeKey;
            // Compute min and max i and j of current player
            var limits = this.computeMinAndMaxIAndJ(this.player);
            this.app.animationsModule.triggerAnimation("move", limits);

            // Update model
            this.updateModel();

            // Give new game state to animator
            this.app.objectsModule.newUnits = this.sendUnits(this.units);
            this.app.objectsModule.currentUnitsToDestroy = this.sendUnitsToDestroy(this.unitsToDelete);
            this.updateObjectBoard();
            this.state = this.app.StateEnum.ANIMATING;
            break;

        case this.app.StateEnum.ANIMATING:
            break;

        case this.app.StateEnum.UPDATED_MODEL:
            // Check victory
            if (this.someoneHasWon()) {
                this.state = this.app.StateEnum.ENDED;
                this.app.objectsModule.declareVictory(this.winner);
                break;
            }

            // Switch players
            this.player = (this.player == "blue") ? "red" : "blue";
            this.app.objectsModule.updatePlayer(this.player);   // Calling visual

            this.state = this.app.StateEnum.WAITING;

            break;

        case this.app.StateEnum.ENDED:
            break;
    }
};

APP.Modules.Game.prototype.computeMinAndMaxIAndJ = function(player) {
    var minI = this.maxI;
    var minJ = this.maxJ;
    var maxI = this.minI;
    var maxJ = this.minJ;

    var currentUnit;
    for (var unitId in this.units) {
        currentUnit = this.units[unitId];
        if (currentUnit.team != player) {
            continue;
        }

        if (currentUnit.i < minI) minI = currentUnit.i;
        if (currentUnit.i > maxI) maxI = currentUnit.i;
        if (currentUnit.j < minJ) minJ = currentUnit.j;
        if (currentUnit.j > maxJ) maxJ = currentUnit.j;
    }

    return {maxI:maxI, minI:minI, maxJ:maxJ, minJ:minJ};
};