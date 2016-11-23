'use strict';

APP.prototype.loadShaders = function (shaderList) {
    var deferred = [];
    this.shaders = [];

    for (var i = 0; i < shaderList.length; ++i) {
        var name = shaderList[i];
        this.shaders[name] = {};

        (function (name) {

            // Load vertex shader
            deferred.push(
                $.get('static/shaders/' + name + '.vsh', function (data) {
                    this.shaders[name]['vertex'] = data;
                }.bind(this))
            );

            // Load fragment shader
            deferred.push(
                $.get('static/shaders/' + name + '.fsh', function (data) {
                    this.shaders[name]['fragment'] = data;
                }.bind(this))
            );
        }.bind(this))(name);
    }

    // Load materials
    $.when.apply(null, deferred).then(function () {
        this.materials = this.loadMaterials();
        this.launchApplication();
    }.bind(this));
};

APP.prototype.loadMaterials = function () {
    return {
        // Magma
        magma: function() {
           return new THREE.ShaderMaterial({
               uniforms: {
                   uTime: {type: 'f', value:0.0}
               },
               attributes: {
               },
               transparent: false,
               vertexShader: this.shaders['magma']['vertex'],
               fragmentShader: this.shaders['magma']['fragment']
           });
        }.bind(this),

        water: function() {
            var phongShader = THREE.ShaderLib['phong'];
            var uniforms = THREE.UniformsUtils.clone(phongShader.uniforms);

            uniforms.uTime = {type: 'f', value:0.0};
            uniforms.uColor = {type: 'c', value:new THREE.Color(0, 0, 0)};
            uniforms.shininess.value=1.0;

            return new THREE.ShaderMaterial({
                uniforms: uniforms,
                //attributes: {},
                transparent: true,
                vertexShader: this.shaders['water']['vertex'],
                fragmentShader: this.shaders['water']['fragment'],
                lights:true
            });
        }.bind(this),

        // Empty shader
        default: function () {
            return new THREE.ShaderMaterial({
                uniforms: {},
                attributes: {},
                transparent: false,
                vertexShader: undefined,
                fragmentShader: undefined
            });
        }.bind(this)
    };
};