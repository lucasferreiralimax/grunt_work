module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['dist']
      },
    },
    babel: {
      options: {
        sourceMap: false,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      }
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
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.html'],
          dest: 'dist',
          ext: '.html'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'babel', 'pug', 'stylus', 'includeSource']);

};
