#!/usr/bin/env node
'use strict';

module.exports = function (grunt) {
    var pkg = require("./package.json");

    grunt.initConfig({
        pkg: pkg,
        jshint: {
            // global options
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                nonew: true,
                plusplus: false,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                maxparams: 4,
                maxdepth: 4,
                trailing: true,
                maxlen: 120,
                browser: true,
                node: true,
                white: true,
            },
            client_logger: {
                expand: true,
                src: ['src/**/*.js', 'test/**/*.js', 'example/**/*.js'],
                options: {
                    node: false,
                    devel: true,
                    globals: {
                        Logger: true,
                        expect: true,
                        util: true,
                        it: true,
                        describe: true,
                        beforeEach: true,
                        afterEach: true
                    },
                    exported: ['Logger']
                }
            }
        },
        jasmine: {
            client_logger: {
                expand: true,
                keepRunner: true,
                src: 'src/**/*.js',
                options: {
                    specs: 'test/spec/**/*.js'
                }
            }
        },
    });

    // npm tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    /* DEFAULT */
    grunt.registerTask('default', ['jshint', 'test']);

    /* JSHINT */
    grunt.registerTask('lint', 'lint all', 'jshint');

    /* JASMINEBDD */
    grunt.registerTask('test', 'test all', 'jasmine');
};
