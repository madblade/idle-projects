'use strict';

APP.prototype.getMove = function(type) {
    switch (type) {
        case 'magma':
            return function() {

            };

        default:
            return function() {};
    }
};

APP.prototype.getCoups = function(type) {
    switch (type) {
        case 'magma':
            return [
                function() { // Coup 1
                },
                function() { // Coup 2
                },
                function() { // Coup 3
                },
                function() { // Coup 4
                },
                function() { // Coup 5
                },
                function() { // Coup 6
                },
                function() { // Coup 7
                }
            ];
        default:
            return [];
    }
};

APP.prototype.getSee = function(type) {
    switch (type) {
        case 'magma':
            return function() {

            };
        default:
            return function(){};
    }
};

APP.prototype.getWatch = function(type) {
    switch (type) {
        case 'magma':
            return function() {

            };
        default:
            return function(){};
    }
};

APP.prototype.getMemory = function(type) {
    switch (type) {
        case 'magma':
            return [
                {}, // Slot 1: move
                {}, // Slot 2: coups
                {} // Slot 3: ?
            ];
            break;

        default:
            break;
    }
};