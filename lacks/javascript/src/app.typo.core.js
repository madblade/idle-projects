'use strict';

APP.Modules.Typo = function(app) {
    this.textItems = {
        traceur: "Ω",
        prince: "π",
        scribe: ")",
        troubadour: "¿´", // pb
        protecteur: "Δ",
        géomaître: "¬",
        pilier: ">",

        autoursier: "^",
        fleuron: "´,",
        éclaireur: ")-",
        fauconier: "ˇּ", // pb
        ailier_1: "∞", // pb
        ailier_2: "∞", // pb
        aéromaître: "χ",
        soigneuse: "(.)",
        sourcière: "<>",
        braconneur: "∫", // pb
        artisan_métal: "◊", // pb
        feleuse: "~",
        artisan_bois: "∂", // pb
        croc_1: "≈", // pb
        croc_2: "√", // pb
        croc_3: "]]"
    };

    this.app = app;
};

APP.Modules.Typo.prototype.createText = function(chars, color) {
    var text3d = new THREE.TextGeometry(chars, {
        size: 8,
        height: 2,
        curveSegments: 4,
        font: "droid serif"
    });

    text3d.computeBoundingBox();

    var textMaterial = new THREE.MeshBasicMaterial({color: color, overdraw: 0.5});
    var text = new THREE.Mesh(text3d, textMaterial);

    text.position.x = -5;
    text.position.y = 0;
    text.position.z = 60;

    text.scale.x = 1;
    text.scale.y = 1;
    text.scale.z = 1;

    text.rotation.x = Math.PI/2;
    text.rotation.y = Math.PI*2;

    return text;
};