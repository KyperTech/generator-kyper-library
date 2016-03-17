'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')
var path = require('path')
var _ = require('lodash')

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', { type: String, required: false })
    this.appName = this.name || path.basename(process.cwd()) || 'esnext-library'
    this.capitalAppName = _.capitalize(_.camelCase(this.appName))
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
      this.githubUser = this.answers.githubUser
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
      { src: 'src/_index.js', dest: 'src/index.js' },
      { src: 'bin/**', dest: 'bin' },
      { src: 'test/setup.js', dest: 'test/setup.js' },
      { src: 'test/unit/_index.spec.js', dest: 'test/unit/index.spec.js' }
    ]
    // console.log('this.answers', this.answers)
    // TODO: Make this work
    if (this.answers && this.answers.includeDocs) {
      filesList.concat([
        { src: 'gitbook/_book.json', dest: 'book.json' },
        { src: 'gitbook/contents.md', dest: 'docs/README.md' },
        { src: 'gitbook/contents.md', dest: 'docs/api/README.md' }
      ])
    }
    // Make folder before copying to avoid error
    this.copyFiles(filesList)
  },

  install: function () {
    this.npmInstall()
  },
  /**
   * @param {Array|Object} filesArray
   */
  copyFiles: function (filesArray) {
    if (!filesArray) return
    filesArray.forEach(file => {
      var src = ''
      var destination = ''
      if (!file.src) {
        if (!_.isString(file)) throw new Error('Invalid source for file copy.')
        src = file
      }
      if (_.isObject(file)) {
        src = file.src
        destination = file.dest || file.src // Make destination source if not provided
      }
      if (src.charAt(0) === '_' || src.indexOf('_') !== -1) { // template if filename starts with _
        // Copy with templating
        this.template(src, destination, this.templateContext)
      } else {
        // Normal copy
        this.fs.copy(
          this.templatePath(src),
          this.destinationPath(destination)
        )
      }
    })
  }
})
