'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var _ = require('lodash')

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', { type: String, required: false })
    this.appName = this.name || path.basename(process.cwd()) || 'esnext-library'
    this.capitalAppName = _.capatalize(this.appName)
    this.appPath = this.env.options.appPath
    this.version = '0.0.1'
  },

  prompting: function () {
    var done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the' + chalk.red('kyper-library') + ' generator!'
    ))

    var prompts = [
      {
        type: 'input',
        name: 'githubUser',
        message: 'Github Username',
        default: 'kypertech'
      },
      {
        type: 'confirm',
        name: 'includeDocs',
        message: 'Would you like to include documentation through Gitbook?',
        default: false
      }
    ]

    this.prompt(prompts, function (props) {
      this.answers = props
      done()
    }.bind(this))
  },

  writing: function () {
    let filesList = [
      { src: '_package.json', dest: 'package.json' },
      { src: '_README.md', dest: 'README.md' },
      { src: 'babelrc', dest: '.babelrc' },
      { src: 'codeclimate.yml', dest: '.codeclimate.yml' },
      { src: 'config.json' },
      { src: 'gitignore', dest: '.gitignore' },
      { src: 'npmignore', dest: '.npmignore' },
      { src: 'travis.yml', dest: '.travis.yml' },
      { src: 'webpack-base.config.js' },
      { src: 'webpack-development.config.js' },
      { src: 'webpack-production.config.js' },
      { src: 'bin/**', dest: 'bin ' },
      { src: 'test/**', dest: 'test ' }
    ]
    if (this.answers && this.answers.includeDocs) filesList.push({ src: 'gitbook/**', dest: 'gitbook' })
    this.copyFiles(filesList)
  },

  install: function () {
    this.npmInstall()
  },
  /**
   * @param {Array|Object} filesArray
   */
  copyFiles: function (filesArray) {
    console.log('files array:', filesArray)
    if (!filesArray) return
    filesArray.forEach(function (file) {
      var src = ''
      var destination = ''
      if (!file.src) {
        if (_.isString(file)) {
          src = file
        } else {
          console.error('Invalid source for file copying.')
          throw new Error('Invalid source for file copy.')
        }
      }
      if (_.isObject(file)) {
        src = file.src
        destination = file.dest || file.src // Make destination source if not provided
      }
      if (src.charAt(0) === '_') { // template if filename starts with _
        // Copy with templating
        this.template(src, destination, this.templateContext)
      } else {
        //Normal copy
        this.fs.copy(
          this.templatePath(src),
          this.destinationPath(destination)
        )
      }
    })
  },
})
