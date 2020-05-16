module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // CONCAT
        // ------
        concat: {
            // OPTIONS
            options: {
                separator: "\n\n/**********************************************************/\n\n"
            },
            plugins: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/angular/angular.min.js',
                    'app/js/vendor/html2canvas.js',
                    'app/js/vendor/cookiechoices.js'
                ],
                dest: 'app/js/compiled/plugins.js'
            },
            // FRONTEND
            frontend: {
                src: [
                    'app/js/src/app.js',
                    'app/js/src/controllers.js'
                ],
                dest: 'app/js/compiled/frontend.js'
            },
            app: {
                src: [
                    'app/js/compiled/plugins.js',
                    'app/js/compiled/frontend.js'
                ],
                dest: 'app/js/compiled/script.js'
            }
        },

        // JSHINT
        // ------
        jshint: {

            // ALL
            all: [
                'app/js/src/app.js',
                'app/js/src/controllers.js'
            ]
        },

        // UGLIFY
        // ------
        uglify: {

            // OPTIONS
            options: {
                mangle: false
            },
            js: {
                files: {
                    'app/js/script.min.js': 'app/js/compiled/script.js'
                }
            }
        },

        // LESS
        // ----
        less: {
            production: {
                options: {
                    cleancss: true
                },
                files: {
                    "app/css/style.css": "app/less/style.less"
                }
            }
        },

        // WATCH
        // ------
        watch: {
            css: {
                files: ['app/less/*.less','app/less/themes/*.less'],
                tasks: ['less:production'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['app/js/src/app.js', 'app/js/src/controllers.js'],
                tasks: ['jshint:all','concat:frontend','concat:app','uglify:js'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // DEFAULT TASK(S)
    // ---------------
    grunt.registerTask('assets', [
        'jshint:all',
        'concat:frontend',
        'concat:app',
        'uglify:js',
        'less:production'
    ]);

    // START TASK(S)
    // -------------------------
    grunt.registerTask('plugins', [
        'concat:plugins'
    ]);
};
