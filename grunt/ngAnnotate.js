module.exports = {
  options: {
    // Tells if ngAnnotate should add annotations (true by default).
    add: true,

    // Tells if ngAnnotate should remove annotations (false by default).
    remove: false,

    // If provided, only strings matched by the regexp are interpreted as module
    // names. You can provide both a regular expression and a string representing
    // one. See README of ng-annotate for further details:
    // https://npmjs.org/package/ng-annotate
    // regexp: regexp,

    // Switches the quote type for strings in the annotations array to single
    // ones; e.g. '$scope' instead of "$scope" (false by default).
    singleQuotes: true

    // If ngAnnotate supports a new option that is not directly supported via
    // this grunt task yet, you can pass it here. These options gets merged
    // with the above specific to ngAnnotate. Options passed here have lower
    // precedence to the direct ones described above.
    // ngAnnotateOptions: {}
  },
  dist: {
    cwd: '.',
    src: 'src/angular-wait.js',
    dest: 'dist/angular-wait.js'
  }
};