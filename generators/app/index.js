'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const _ = require('lodash')

module.exports = class extends Generator {
  initializing () {
    this.argument('name', { type: String, required: false })
    this.data = { }
    this.data.appName = this.name || path.basename(process.cwd()) || 'esnext-library'
    this.data.capitalAppName = _.capitalize(_.camelCase(this.data.appName))
    this.data.appPath = this.env.options.appPath
    this.data.version = '0.0.1'
  }

  prompting () {
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
      }
    ]

    return this.prompt(prompts).then((props) => {
      this.answers = props
      this.data = Object.assign({}, this.data, this.answers, { answers: this.answers })
      this.githubUser = this.answers.githubUser
    })
  }

  writing () {
    let filesList = [
      { src: '_package.json', dest: 'package.json' },
      { src: '_README.md', dest: 'README.md' },
      { src: 'babelrc', dest: '.babelrc' },
      { src: '_config.json', dest: 'config.json' },
      { src: 'gitignore', dest: '.gitignore' },
      { src: 'npmignore', dest: '.npmignore' },
      { src: 'webpack.config.js' },
      { src: 'src/_index.js', dest: 'src/index.js' },
      { src: 'bin/**', dest: 'bin' },
      { src: 'test/setup.js', dest: 'test/setup.js' },
      { src: 'test/unit/**', dest: 'test/unit' }
    ]

    if (this.answers.includeTravis) {
      filesList.push(
        { src: 'travis.yml', dest: '.travis.yml' },
        { src: 'istanbul.yml', dest: '.istanbul.yml' }
      )
    }

    if (this.answers.includeCodeclimate) {
      filesList.push({ src: 'codeclimate.yml', dest: '.codeclimate.yml' })
    }
    // Make folder before copying to avoid error
    filesList.forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.src || file),
        this.destinationPath(file.dest || file.src || file),
        this.data
      )
    )
  }

  install () {
    this.npmInstall()
  }

}
