module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['dist']
      },
    },
    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.pug', '!**/[_]*.pug'],
          dest: 'dist',
          ext: '.html'
        }]
      }
    },
    stylus: {
      compile: {
        options: {
          compress: false
        },
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.styl', '!**/[_]*.styl'],
          dest: 'dist',
          ext: '.css'
        }]
      }
    },
    includeSource: {
      options: {
        basePath: 'dist',
        baseUrl: '/',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
          }
        }
      },
      myTarget: {
        files: {
          'dist/index.html': 'dist/index.html'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'pug', 'stylus', 'includeSource']);

};
