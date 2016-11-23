'use strict';

APP.Modules.Animations = function (app) {
    this.app = app;

    this.isAnimating = false;

    this.animationKind = "move";
    this.numberOfSteps = 50;
    this.animationStep = -1;

    this.limits = {
        minI : 0,
        minJ : 0,
        maxI : this.app.numberOfUnitsOnX-1,
        maxJ : this.app.numberOfUnitsOnY-1
    }
};

APP.Modules.Animations.prototype.run = function () {
};

APP.Modules.Animations.prototype.triggerAnimation = function(animationKind, limits) {
    this.isAnimating = true;

    this.animationKind = animationKind;

    var board = this.app.objectsModule.board;

    if (this.animationKind == "move") {
        this.limits = limits;

        switch (this.app.objectsModule.currentDirection) {
            case this.app.DirectionEnum.DOWN:
            case this.app.DirectionEnum.UP:
                this.numberOfSteps = /*10+5*(board.maxJ-board.minJ)*/20;
                break;

            case this.app.DirectionEnum.RIGHT:
            case this.app.DirectionEnum.LEFT:
                this.numberOfSteps = /*10+5*(board.maxI-board.minI)*/20;
                break;
        }

    } else if (this.animationKind == "destroy") {
        this.numberOfSteps = 20;
    }

    this.numberOfSteps = 50;
    if (this.isAnimating) this.animationStep = this.numberOfSteps;
};

APP.Modules.Animations.prototype.animate = function() {
    if (!this.isAnimating) return;

    switch (this.animationKind) {
        case "move":
            this.doAnimate(this.app.objectsModule.pawns, this.animationStep);
        break;
        case "destroy":
            this.doAnimateDestruction(this.app.objectsModule.pawns, this.animationStep);
        break;
    }

    --this.animationStep;

    this.checkAnimationStep();
};

APP.Modules.Animations.prototype.checkAnimationStep = function() {
    if (this.animationStep > 0) return;

    this.isAnimating = false;

    if (this.animationKind == "move") {
        this.triggerAnimation("destroy");

    } else if (this.animationKind == "destroy") {
        this.app.objectsModule.deletePawns();
        this.app.objectsModule.updatePawnPositions();
        this.app.objectsModule.shrinkBoard();
        this.app.gameModule.state = this.app.StateEnum.UPDATED_MODEL;
    }
};

//TODO modular animations
APP.Modules.Animations.prototype.doAnimate = function(pawns, animationStep) {
    var currentUnit, currentPawn;
    var units = this.app.objectsModule.currentUnits;
    var numberOfSteps = this.numberOfSteps;

    var numberOfStepsForMe = 0;

    var progressOnBoard = numberOfSteps - animationStep; // From n to 0.
    var animationProgress;

    var pawnWidth = this.app.pawnWidth;
    var pawnHeight = this.app.pawnHeight;

    var boardMinI = this.app.objectsModule.board.minI;
    var boardMinJ = this.app.objectsModule.board.minJ;
    var boardMaxI = this.app.objectsModule.board.maxI+1;
    var boardMaxJ = this.app.objectsModule.board.maxJ+1;

    var boardDimI = boardMaxI - boardMinI + 1;
    var boardDimJ = boardMaxJ - boardMinJ + 1;

    var minI = this.limits.minI;
    var minJ = this.limits.minJ;
    var maxI = this.limits.maxI;
    var maxJ = this.limits.maxJ;
    animationStep-=1;

    for (var unitId in units) {
        currentUnit = units[unitId];
        currentPawn = this.app.objectsModule.findPawnByKey(currentUnit.key, pawns);
        var ci = currentUnit.i;
        var cj = currentUnit.j;

        if (currentPawn === undefined) {
            console.log("WARN : APP.Modules.Animations.doAnimate invalid pawn");
            continue;
        }

        var iAmWalking;
        switch (currentUnit.direction) {
            case this.app.DirectionEnum.UP:

                // How many steps I can take, a subdivision of the board size
                numberOfStepsForMe = Math.floor(numberOfSteps/boardDimJ); // According to BOARD!

                // Am I walking?
                iAmWalking =
                    animationStep/numberOfSteps < (1+cj)/boardDimJ
                    &&
                    (1+cj)/boardDimJ <= (animationStep+numberOfStepsForMe)/numberOfSteps;
                if (!iAmWalking) break;

                // Go up (towards -y)
                currentPawn.y -= pawnHeight/numberOfStepsForMe;
                if (animationStep%2==0) {
                    currentPawn = PIXI.Sprite.fromImage('static/assets/bunny-dead.png');
                    console.log("ayayaya");
                }
                break;

            case this.app.DirectionEnum.DOWN:

                // How many steps I can take
                numberOfStepsForMe = Math.floor(numberOfSteps/(boardDimJ));

                iAmWalking =
                    animationStep/numberOfSteps < (boardMaxJ-cj)/boardDimJ
                    &&
                    (boardMaxJ-cj)/boardDimJ <= (animationStep+numberOfStepsForMe)/numberOfSteps;
                if (!iAmWalking) break;

                // Go down (towards +y)
                currentPawn.y += pawnHeight/numberOfStepsForMe;
                break;

            case this.app.DirectionEnum.LEFT:

                // How many steps I can take
                numberOfStepsForMe = Math.floor(numberOfSteps/(boardDimI));

                iAmWalking =
                    (animationStep/numberOfSteps) < (1+ci)/boardDimI
                    &&
                    (1+ci)/boardDimI <= ((animationStep+numberOfStepsForMe)/numberOfSteps);
                if (!iAmWalking) break;

                // Go left (towards -x)
                currentPawn.x -= pawnWidth/numberOfStepsForMe;
                //currentPawn.y = pawnHeight * cj +
                    /* Define bouncing (Wall-E) */
                   // .5*pawnHeight*Math.sin(Math.PI*(animationStep%numberOfStepsForMe)/numberOfStepsForMe+Math.PI);
                break;

            case this.app.DirectionEnum.RIGHT:

                // How many steps I can take
                numberOfStepsForMe = Math.floor(numberOfSteps/(boardDimI));

                iAmWalking =
                    (animationStep/numberOfSteps) < (boardMaxI-ci)/boardDimI
                    &&
                    (boardMaxI-ci)/boardDimI <= ((animationStep+numberOfStepsForMe)/numberOfSteps);
                if (!iAmWalking) break;

                // Go right (towards +x)
                currentPawn.x += pawnWidth/numberOfStepsForMe;
                //currentPawn.y = pawnHeight * cj + .5*pawnHeight*Math.sin(Math.PI*(animationStep%numberOfStepsForMe)/numberOfStepsForMe+Math.PI);
                break;

            case this.app.DirectionEnum.NOWHERE:
                break;

            default :
                console.log("WARN : APP.Modules.Animations.animate invalid direction");
                break;
        }
    }
};

APP.Modules.Animations.prototype.doAnimateDestruction = function(pawns, progress) {
    var currentUnit, currentPawn;
    var units = this.app.objectsModule.currentUnitsToDestroy;

    for (var unitId in units) {
        currentUnit = units[unitId];
        currentPawn = this.app.objectsModule.findPawnByKey(currentUnit.key, pawns);

        if (currentPawn === undefined) {
            console.log("WARN : APP.Modules.Animations.doAnimateDestruction invalid pawn");
            continue;
        }

        currentPawn.rotation = Math.PI * progress/this.numberOfSteps;
        currentPawn.width/=1.05;
        currentPawn.height/=1.05;
    }
};