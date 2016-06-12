'use strict'
const yeoman = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const _ = require('lodash')

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.argument('name', { type: String, required: false })
    this.appName = this.name || path.basename(process.cwd()) || 'esnext-library'
    this.capitalAppName = _.capitalize(_.camelCase(this.appName))
    this.appPath = this.env.options.appPath
    this.version = '0.0.1'
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('kyper-library') + ' generator!'
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
        name: 'includeTravis',
        message: 'Would to include config for Travis CI?',
        default: true
      },
      {
        type: 'confirm',
        name: 'codeClimate',
        message: 'Would to include config for CodeClimate?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeDocs',
        message: 'Would you like to include documentation through Gitbook?',
        default: false
      }
    ]

    return this.prompt(prompts).then(function (props) {
      this.answers = props
      this.githubUser = this.answers.githubUser
    }.bind(this))
  },

  writing: function () {
    let filesList = [
      { src: '_package.json', dest: 'package.json' },
      { src: '_README.md', dest: 'README.md' },
      { src: 'babelrc', dest: '.babelrc' },
      { src: '_config.json', dest: 'config.json' },
      { src: 'gitignore', dest: '.gitignore' },
      { src: 'npmignore', dest: '.npmignore' },
      { src: 'webpack-base.config.js' },
      { src: 'webpack-development.config.js' },
      { src: 'webpack-production.config.js' },
      { src: 'src/_index.js', dest: 'src/index.js' },
      { src: 'bin/**', dest: 'bin' },
      { src: 'test/setup.js', dest: 'test/setup.js' },
      { src: 'test/unit/**', dest: 'test/unit' }
    ]
    if (this.answers.includeDocs) {
      filesList.concat([
        { src: 'gitbook/_book.json', dest: 'book.json' },
        { src: 'gitbook/contents.md', dest: 'docs/README.md' },
        { src: 'gitbook/contents.md', dest: 'docs/api/README.md' }
      ])
    }

    if (this.answers.includeTravis) {
      filesList.concat([
        { src: 'travis.yml', dest: '.travis.yml' },
        { src: 'istanbul.yml', dest: '.istanbul.yml' }
      ])
    }

    if (this.answers.includeCodeclimate) {
      filesList.concat([
        { src: 'codeclimate.yml', dest: '.codeclimate.yml' }
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
    filesArray.forEach(file =>
      this.template(file.src || file, file.dest || file.src || file, this.templateContext)
    )
  }
})
