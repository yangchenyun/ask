module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: ['test/**/*.js']
    },
    lint: {
      files: ['bin/**/*.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    },
    jsvalidate: {
      files: ['./grunt.js', './bin/*', './lib/*.js', 'test/*.js'],
    },
    // jsbeautifier: {
    //   files: ['./grunt.js', './bin/*', './lib/*.js', 'test/*.js'],
    //   options: {
    //     "indent_size": 2,
    //     "indent_char": " ",
    //     "indent_level": 0,
    //     "indent_with_tabs": false,
    //     "preserve_newlines": true,
    //     "max_preserve_newlines": 10,
    //     "jslint_happy": false,
    //     "brace_style": "collapse",
    //     "keep_array_indentation": false,
    //     "keep_function_indentation": false,
    //     "space_before_conditional": true,
    //     "eval_code": false,
    //     "indent_case": false,
    //     "unescape_strings": false
    //   }
    // }

  });

  //
  grunt.loadNpmTasks('grunt-jsvalidate');
  //grunt.loadNpmTasks('grunt-jsbeautifier');

  // Default task.                        u
  grunt.registerTask('default', 'jsvalidate');

};
