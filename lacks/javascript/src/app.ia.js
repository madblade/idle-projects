'use strict';

APP.Modules.IA = function(app) {
    /* collision */
    this.objectsAxisX = [];
    this.objectsAxisY = [];
    this.objectsAxisZ = [];

    this.app = app;
};

APP.Modules.IA.prototype.updateBehaviours = function() {
    for (var i=0; i<this.app.meshesModule.objects.length; ++i) {  // level O(n)
        if (this.app.meshesModule.objects[i] === this.app.meshesModule.masterSphere) continue;

        if (this.app.meshesModule.objects[i].owner !== 0) {
            if (Math.random() > 0.9) { // huge performance improvement
                this.scan(i);
            }
        } else if(!this.app.meshesModule.objects[i].needsToMove) {
            this.scan(i);
        }

        if (this.app.meshesModule.objects[i].needsToMove)
            this.behave(i);

        if (this.app.meshesModule.objects[i].target != null && this.app.meshesModule.objects[i].firing)
            this.fight(i);
    }
};

APP.Modules.IA.prototype.scan = function(i) {
    var me = this.app.meshesModule.objects[i],
        you;

    function mathSquare(n) {
        return n*n;
    }

    var distanceToEnemy;
    var distanceMin = Infinity;
    var indexMin = -1;

    var detectionRange2 = 20*mathSquare(me.range);

    var iterator = new this.app.IAModule.ObjectsIterator(this.app, i, me.range);
    while ((you=iterator.next()) != null) {  // level O(n) =D
        if (you.owner === me.owner) {
            continue;
        }

        var deltaX2 = mathSquare(me.position.x-you.position.x),
            deltaY2 = mathSquare(me.position.y-you.position.y);
        distanceToEnemy = deltaX2+deltaY2;
        if (distanceToEnemy<detectionRange2) {
            if (distanceToEnemy < distanceMin) {
                distanceMin = distanceToEnemy;
                indexMin = you.index;
            }
        }
    }
    iterator = null;

    /* attack nearest enemy */
    if (indexMin !== -1) {
        this.attack(me, this.app.meshesModule.objects[indexMin]);
    }
};

APP.Modules.IA.prototype.behave = function(i) {
    var me = this.app.meshesModule.objects[i];

    function mathSquare(n) {
        return n*n;
    }

    var px = me.position.x,
        py = me.position.y,
        //pz = object.position.z,
        dx = (me.attacks ? me.target.position.x : me.destination.x),
        dy = (me.attacks ? me.target.position.y : me.destination.y);
        //dz = (object.attacks ? object.target.position.x : object.destination.z);

    var deltaX2 = mathSquare(px-dx);
    var deltaY2 = mathSquare(py-dy);
    //var deltaZ2 = mathSquare(pz-dz);
    var r2 = mathSquare(me.range);
    var c2 = mathSquare(me.capability);

    if (me.attacks && deltaX2+deltaY2<r2) {
        /* stop and open fire */
        me.needsToMove = false;
        me.firing = true;
        return;
    } else {
        /* stop firing */
        me.firing = false;
    }

    /*
    var pxT, pyT, pxI, pyI;

    var iterator = new ObjectsIterator(i,sphereRadius+me.capability);
    var you;

    if (me.heat === 5) {
        pxT = px + Math.random() * me.capability;
        pyT = py + Math.random() * me.capability;
    } else {
        pxT = (px<dx) ? px+me.capability : px-me.capability;
        pyT = (py<dy) ? py+me.capability : py-me.capability;
    }

    while ((you = iterator.next()) != null) {
        pxI = you.position.x;
        pyI = you.position.y;

        if (mathSquare(pxT-pxI)+mathSquare(pyT-pyI)<sphereRadius*sphereRadius) {
            me.heat = 5;
            return;
        }
    }*/

    //me.heat = 0;

    if (deltaX2+deltaY2 > c2) {
        if (me.heat === 5) {
            me.setDirectionDonc(px+Math.random(), py+Math.random());
        } else {
            me.setDirectionDonc(dx,dy);
        }

        me.motionDonc();
        this.updateObjectAxis(i);
    } else {
        me.needsToMove = false;
    }
};

APP.Modules.IA.prototype.attack = function(me, him) {
    me.attacks = true;
    me.target = him;
    me.destination.x = me.position.x;
    me.destination.y = me.position.y;
    me.needsToMove = true;
};

APP.Modules.IA.prototype.fight = function(i) {
    var object = this.app.meshesModule.objects[i];

    if (Math.random()>0.5) { /* successful blow */

        object.target.life -= 1;

        if (object.target.life === 0) {
            object.firing = false;

            if (object.target.owner === 0) this.app.meshesModule.nbMine --;
            else this.app.meshesModule.nbEnemies --;

            if (this.app.meshesModule.nbEnemies === 0) {
                bigMessage(1);
            }
            if (this.app.meshesModule.nbMine === 0) {
                bigMessage(2);
            }

            this.app.removeObject(object.target, object.target.index);

            if (this.app.meshesModule.masterSphere !== null && this.app.meshesModule.masterSphere.life === 0) this.app.meshesModule.masterSphere = null;
        }

        if (object.target === null || object.target.life < 0) {
            object.firing = false;
            object.target = null;
        }
    }
};

APP.Modules.IA.prototype.updateObjectAxis = function(i) {
    var object = this.app.meshesModule.objects[i];
    var length = this.app.meshesModule.objects.length;
    var x = object.position.x,
        y = object.position.y;
        //z = object.position.z;
    var iXl = object.indexX-1, iXr = object.indexX+1,
        iYl = object.indexY-1, iYr = object.indexY+1;
        //iZl = object.indexZ-1, iZr = object.indexZ+1;

    /* resort left X */
    while ((iXl > -1) && (this.app.meshesModule.objects[this.objectsAxisX[iXl]].position.x > x)) {
        this.swap(this.objectsAxisX,iXl,iXl+1);
        --iXl;
    }
    /* resort right X */
    while ((iXr < length) && (this.app.meshesModule.objects[this.objectsAxisX[iXr]].position.x < x)) {
        this.swap(this.objectsAxisX,iXr,iXr-1);
        ++iXr;
    }

    /* resort left Y */
    while ((iYl > -1) && (this.app.meshesModule.objects[this.objectsAxisY[iYl]].position.y > y)) {
        this.swap(this.objectsAxisY,iYl,iYl+1);
        --iYl;
    }
    /* resort right Y */
    while ((iYr < length) && (this.app.meshesModule.objects[this.objectsAxisY[iYr]].position.y < y)) {
        this.swap(this.objectsAxisY,iYr,iYr-1);
        ++iYr;
    }

    /* resort left Z */
    /*while ((iZl > -1) && (objects[objectsAxisY[iZl]].position.z > z)) {
        swap(objectsAxisZ,iZl,iZl+1);
        console.log("swap Z-");
        --iZl;
    }*/
    /* resort right Y */
    /*while ((iZr < length) && (objects[objectsAxisY[iZr]].position.z < z)) {
        swap(objectsAxisZ,iZr,iZr-1);
        console.log("swap Z+");
        ++iZr;
    }*/
};

APP.Modules.IA.prototype.swap = function(axisArray, i, j) {
    axisArray.swap(i,j);
    if (axisArray === this.objectsAxisX) {
        this.app.meshesModule.objects[axisArray[i]].indexX = i;
        this.app.meshesModule.objects[axisArray[j]].indexX = j;
    } else if (axisArray === this.objectsAxisY) {
        this.app.meshesModule.objects[axisArray[i]].indexY = i;
        this.app.meshesModule.objects[axisArray[j]].indexY = j;
    } else if (axisArray === this.objectsAxisZ) {
        this.app.meshesModule.objects[axisArray[i]].indexZ = i;
        this.app.meshesModule.objects[axisArray[j]].indexZ = j;
    }
};

APP.Modules.IA.prototype.initCollisions = function() {
    /* init objects order on every axis */
    for (var i=0; i<this.app.meshesModule.objects.length; ++i) {
        this.objectsAxisX[i] = i;
        this.objectsAxisY[i] = i;
        this.objectsAxisZ[i] = i;
    }
    this.objectsAxisX.sort(function (a,b) {
        if (this.app.meshesModule.objects[a].position.x < this.app.meshesModule.objects[b].position.x) return -1;
        else if (this.app.meshesModule.objects[a].position.x > this.app.meshesModule.objects[b].position.x) return 1;
        else return 0;
    }.bind(this));
    this.objectsAxisY.sort(function (a,b) {
        if (this.app.meshesModule.objects[a].position.y < this.app.meshesModule.objects[b].position.y) return -1;
        else if (this.app.meshesModule.objects[a].position.y > this.app.meshesModule.objects[b].position.y) return 1;
        else return 0;
    }.bind(this));
    this.objectsAxisZ.sort(function (a,b) {
        if (this.app.meshesModule.objects[a].position.z < this.app.meshesModule.objects[b].position.z) return -1;
        else if (this.app.meshesModule.objects[a].position.z > this.app.meshesModule.objects[b].position.z) return 1;
        else return 0;
    }.bind(this));

    /* init object indexes on every axis */
    var numberOfObjects = this.app.meshesModule.objects.length;
    for (i=0; i<numberOfObjects; ++i) {
        this.app.meshesModule.objects[this.objectsAxisX[i]].indexX = i;
        this.app.meshesModule.objects[this.objectsAxisY[i]].indexY = i;
        this.app.meshesModule.objects[this.objectsAxisZ[i]].indexZ = i;
    }
};

/*** MATH ***/
Array.prototype.swap = function (x,y) {
    var t = this[x];
    this[x] = this[y];
    this[y] = t;
    return this;
};

/* Collision detection iterator */
APP.Modules.IA.prototype.ObjectsIterator = function(app, objectIndex, threshold) {
    var objects = app.meshesModule.objects;
    var objectsAxisX = app.IAModule.objectsAxisX;
    var objectsAxisY = app.IAModule.objectsAxisY;
    //var objectAxisZ = app.IAModule.objectsAxisZ;

    this.object = objects[objectIndex];
    this.x = this.object.position.x;
    this.y = this.object.position.y;
    this.z = this.object.position.z;

    this.iX = this.object.indexX;
    this.iY = this.object.indexY;
    //this.iZ = this.object.indexZ;

    this.onX = true;
    this.onY = false;
    //this.onZ = false;

    this.threshold = threshold;
    this.nbObjects = objects.length;
    //this.objectIndex = objectIndex;

    this.step = 0;
    this.toRight = true;
    this.next = function() {
        var max = this.nbObjects;
        var t = this.threshold;
        this.step += 1;
        /* search on X AXIS */
        if (this.onX && this.toRight) {
            if ((this.iX+this.step<max) && Math.abs(objects[objectsAxisX[this.iX+this.step]].position.x-this.x)<=t){
                return objects[objectsAxisX[this.iX+this.step]];
            } else {
                this.toRight = false;
                this.step = 0;
                return this.next();
            }
        }
        if (this.onX && !this.toRight) {
            if ((this.iX-this.step>-1) && Math.abs(objects[objectsAxisX[this.iX-this.step]].position.x-this.x)<=t){
                return objects[objectsAxisX[this.iX-this.step]];
            } else {
                this.toRight = true;
                this.onX = false;
                this.onY = true;
                this.step = 0;
                return this.next();
            }
        }

        /* search on Y AXIS */
        if (this.onY && this.toRight) {
            if ((this.iY+this.step<max) && Math.abs(objects[objectsAxisY[this.iY+this.step]].position.y-this.y)<=t){
                return objects[objectsAxisY[this.iY+this.step]];
            } else {
                this.toRight = false;
                this.step = 0;
                return this.next();
            }
        }
        if (this.onY && !this.toRight) {
            if ((this.iY-this.step>-1) && Math.abs(objects[objectsAxisY[this.iY-this.step]].position.y-this.y)<=t){
                return objects[objectsAxisY[this.iY-this.step]];
            } else {
                this.toRight = true;
                this.onY = false;
                this.step = 0;
                /*this.onZ = true;
                 this.step = 0;
                 return this.next();*/
                return null;
            }
        }

        /* Z AXIS */
        /*if (this.onZ && this.toRight) {
         }
         if (this.onZ && !this.toRight) {
         }*/
    }
};
