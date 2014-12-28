module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: ['dist/']
        },

        jshint: {
            files: ['Gruntfile.js', 'public/javascripts/*.js', 'spiders/*.js']
        },

        concat: {
            dist: {
                src: ['public/javascripts/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['clean', 'jshint', 'concat', 'uglify']);
};