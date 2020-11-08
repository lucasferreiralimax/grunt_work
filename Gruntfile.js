module.exports = function(grunt) {

  var pugFiles = [{
    expand: true,
    cwd: 'src',
    src: ['**/*.pug', '!**/[_]*.pug'],
    dest: 'dist',
    ext: '.html'
  }];

  var stylusFiles = [{
    expand: true,
    cwd: 'src',
    src: ['**/*.styl', '!**/[_]*.styl'],
    dest: 'dist',
    ext: '.css'
  }];

  var imagesFiles = [{
    expand: true,
    cwd: 'src/assets',
    src: ['**/*.{png,jpg,gif,svg}'],
    dest: 'dist/assets'
  }];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['dist']
      },
    },
    watch: {
      build: {
        options: {
          livereload: true
        },
        files: ['src/**/*.js', 'src/**/*.pug', 'src/**/*.styl', '**/*.{png,jpg,gif,svg}'],
        tasks: ['clean', 'babel', 'pug', 'stylus', 'image', 'includeSource']
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'dist',
          hostname: '*',
          open: true,
          livereload: true
        }
      }
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
    uglify: {
      myTarget: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['**/*.js'],
          dest: 'dist',
          ext: '.js'
        }]
      }
    },
    pug: {
      dev: {
        options: {
          pretty: true
        },
        files: pugFiles
      },
      prod: {
        options: {
          pretty: false
        },
        files: pugFiles
      }
    },
    stylus: {
      dev: {
        options: {
          compress: false
        },
        files: stylusFiles
      },
      prod: {
        options: {
          compress: true
        },
        files: stylusFiles
      }
    },
    image: {
      static: {
        options: {
          optipng: false,
          pngquant: true,
          zopflipng: true,
          jpegRecompress: false,
          mozjpeg: true,
          gifsicle: true,
          svgo: true
        }
      },
      dynamic: {
        files: imagesFiles
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.registerTask('prod', ['clean', 'babel', 'uglify', 'pug:prod', 'stylus:prod', 'image', 'includeSource']);
  grunt.registerTask('default', ['clean', 'babel', 'pug:dev', 'stylus:dev', 'image', 'includeSource', 'connect', 'watch']);

};
