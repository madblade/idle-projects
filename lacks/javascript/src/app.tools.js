'use strict';

/* data loader */
/*function loadJSON(json, callback) {
	var xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', json, true);
    xObj.onreadystatechange = function () {
		if (xObj.readyState == 4 && xObj.status == "200") {
			callback(xObj.responseText);
		}
	};
    xObj.send(null);
}*/

/*function loadSound(name, callback) {
    var xObj = new XMLHttpRequest();
    xObj.open('GET', 'audio/' + name + '.mp3', true);
    xObj.responseType = 'arraybuffer';
    xObj.onreadystatechange = function () {
        if (xObj.readyState == 4 && xObj.status == "200") {
            audioContext.decodeAudioData(xObj.response, function(buffer) {
                callback(buffer);
            });
        }
    };
    xObj.send(null);
}*/

/* one axis */
/*function buildAxis(src, dst, colorHex, dashed) {
	var geom = new THREE.Geometry(), mat; 

	if (dashed) {
		mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
	} else {
		mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
	}

	geom.vertices.push(src.clone());
	geom.vertices.push(dst.clone());
	geom.computeLineDistances(); // otherwise, lines will not appear dashed

	return new THREE.Line( geom, mat, THREE.LinePieces );
}*/

/* 6 axis */
/*function buildAxes(length) {
	var axes = new THREE.Object3D();

	axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(length, 0, 0), 0xFF0000, false)); // +X
	axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true)); // -X
	axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(0, length, 0), 0x00FF00, false)); // +Y
	axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(0, -length, 0), 0x00FF00, true)); // -Y
	axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(0, 0, length), 0x0000FF, false)); // +Z
	axes.add(buildAxis(new THREE.Vector3(0,0,0), new THREE.Vector3(0, 0, -length), 0x0000FF, true)); // -Z

	return axes;
}*/

/* debugging */
/*function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}*/