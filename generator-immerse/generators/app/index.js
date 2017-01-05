'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('#immerse#') + ' generator!'
        ));

        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What would you like to call your app?',
                validate: function(message) {
                    return (message != undefined && message.length>0);
                }
            },
            {
                type: 'list',
                name: 'build',
                message: 'What build system would you like to use?',
                choices: ['Grunt', 'Gulp', 'Both']
            }
        ];

        this.prompt(prompts, function (props) {
            this.filters = {};

            // App name
            this.filters.name = props.name;

            // Build type
            if (props.build == 'Grunt') {
                this.filters.grunt = true;
            } else if (props.build == 'Gulp') {
                this.filters.gulp = true;
            } else if (props.build == 'Both') {
                this.filters.gulp = true;
                this.filters.grunt = true;
            }

            done();
        }.bind(this));
    },

    writing: {
        gulpfile: function() {
            if (this.filters.gulp) {
                this.fs.copy(
                    this.templatePath('gulpfile.babel.js'),
                    this.destinationPath('gulpfile.babel.js')
                );
            }
        },

        gruntfile: function() {
            if (this.filters.grunt) {
                this.fs.copy(
                    this.templatePath('gruntfile.babel.js'),
                    this.destinationPath('Gruntfile.js')
                );
            }
        },

        npm: function() {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                {filters: this.filters}
            );
        },

        bower: function() {
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
                {filters: this.filters}
            );
            this.fs.copy(
                this.templatePath('_bowerrc'),
                this.destinationPath('.bowerrc'),
                {filters: this.filters}
            );
        },

        babel: function() {
            this.fs.copy(
                this.templatePath('_babelrc'),
                this.destinationPath('.babelrc')
            );
        },

        git: function() {
            this.fs.copy(
                this.templatePath('_gitignore'),
                this.destinationPath('.gitignore')
            );

            this.fs.copy(
                this.templatePath('_gitattributes'),
                this.destinationPath('.gitattributes')
            );
        },

        editorConfig: function() {
            this.fs.copy(
                this.templatePath('_editorconfig'),
                this.destinationPath('.editorconfig')
            );
        },

        misc: function() {
            this.fs.copy(
                this.templatePath('robots.txt'),
                this.destinationPath('robots.txt')
            );
        },

        client: function() {
            // Files with yeoman parameters
            var files = [
                'client/index.html',

                'client/app/app.js',
                    'client/app/engine/connector/app.engine.connector.js',
                    'client/app/engine/graphics/app.engine.graphics.js',
                    'client/app/engine/ui/app.engine.ui.js',
                    'client/app/engine/sound/app.engine.sound.js',
                    'client/app/modules/app.modules.js',

                'client/test/app.module.name.spec.js',

                'client/style/app.css',

                'client/.jshintrc',

                'client/favicon.ico'
            ];
            files.forEach(function(file) {
                this.fs.copy(
                    this.templatePath(file),
                    this.destinationPath(file)
                );
            }.bind(this));
        },

        server: function() {
            // Files without yeoman parameters
            var files = [
                'server/server.js',
                'server/index.js',

                'server/config/routes.js',
                'server/config/local.env.js',
                'server/config/express.js',

                'server/config/environment/index.js',
                'server/config/environment/development.js',
                'server/config/environment/production.js',
                'server/config/environment/test.js',

                'server/app/index.js',
                    'server/app/engine/index.js',
                    'server/app/connector/index.js',

                'server/test/unit/app.pathto.spec.js',
                'server/test/integration/app.pathto.integration.js',

                'server/.jshintrc',
                'karma.conf.js',
                'mocha.conf.js'
            ];
            files.forEach(function(file){
                this.fs.copy(
                    this.templatePath(file),
                    this.destinationPath(file)
                );
            }.bind(this));
        }
    },

    install: function () {
        this.installDependencies();
    }
});
