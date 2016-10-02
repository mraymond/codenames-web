module.exports = function(grunt) { 
  grunt.initConfig({
    // Production Tasks
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      prod: {
        files: {
          'public/js/app.js': ['app/init.js','app/controllers/**.js','app/services/**.js','app/factories/**.js','app/directives/**.js'],
          'public/js/vendor.js': ['vendor/js/**/*.js'],
        }
      }
    },

    // Dev Tasks
    concat: {
      app: {
        src: ['app/init.js','app/controllers/**.js','app/services/**.js','app/factories/**.js','app/directives/**.js'],
        dest: 'public/js/app.js',
      },
      vendor: {
        src: ['vendor/js/**/*.js'],
        dest: 'public/js/vendor.js',
      },
      vendorCSS: {
        src: ['vendor/css/**/*.css'],
        dest: 'public/styles/vendor.css',
      },
    },
    jsbeautifier: {
      files: ['app/**/*.js'],
      options: {
        js: {
          braceStyle: "collapse",
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0
        }
      }
    },

    // Shared Tasks

    watch: {
      js: {
        files: ['app/**/*.js'],
        tasks: ['jsbeautifier', 'concat'],
        options: {
          livereload: true,
        }
      },
      templates: {
        files: ['app/index.html', 'app/templates/**/*.html'],
        tasks: ['copy'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['app/assets/scss/*.css'],
        tasks: ['copy:css'],
        options: {
          livereload: true,
        }
      }
    },
    copy: {
      index: {
        src: 'app/index.html',           // copy all files and subfolders
        dest: 'public/index.html',    // destination folder
      },
      templates: {
        expand: true,
        cwd: 'app/',
        src: 'templates/*',           // copy all files and subfolders
        dest: 'public/',    // destination folder
      },
      css: {
        expand: true,
        cwd: 'app/assets/scss',
        src: '*.css',           // copy all files and subfolders
        dest: 'public/styles/',    // destination folder
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['jsbeautifier', 'concat', 'copy']);
  grunt.registerTask('prod', ['uglify:prod', 'copy']); 
};