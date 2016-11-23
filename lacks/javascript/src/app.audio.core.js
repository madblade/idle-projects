'use strict';

APP.Modules.Audio = function() {
    this.audioContext;
    this.music;
    this.victorySound;
    this.defeatSound;
    this.source = null;

    this.sounds = {
        all: [
            'aphex01',
            'aphex02'
        ]
    };
};

APP.Modules.Audio.Sound = function(name, buffer) {
    this.name = name;
    this.buffer = buffer;
    this.playing = false;

    this.play = function() {
        this.stopAllSounds();
        this.source = this.audioContext.createBufferSource();
        this.source.buffer = buffer;
        this.source.connect(this.audioContext.destination);
        this.playing = true;
        this.source.start();
    }.bind(this);
};

APP.Modules.Audio.prototype.stopAllSounds = function() {
    this.sounds.all.forEach(function(sound) {
        if (this.sounds[sound].source !== null && this.sounds[sound].playing) {
            this.sounds[sound].source.stop();
            this.sounds[sound].playing = false;
        }
    });
}

APP.Modules.Audio.prototype.initAudio = function() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();

        this.sounds.all.forEach(function(sound) {
            loadSound(sound, function (buffer) {
                this.sounds[sound] = new APP.Modules.Audio.Sound(sound, buffer);
            });
        });
    } catch(e) {
        $("#content").fadeOut(function() {
            $(this).html($("#contentNoAudio").html(),'fast').fadeIn('fast');
        });
    }
}