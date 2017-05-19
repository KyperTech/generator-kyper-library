'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const _ = require('lodash')
const commandExists = require('command-exists')

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
      },
      {
        type: 'confirm',
        name: 'includeDocs',
        message: 'Include Docs Generation through Gitbook?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useYarn',
        message: 'Use Yarn?',
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
      { src: 'CONTRIBUTING.md', dest: 'CONTRIBUTING.md' },
      { src: 'LICENSE', dest: 'LICENSE' },
      { src: 'babelrc', dest: '.babelrc' },
      { src: 'eslintrc', dest: '.eslintrc' },
      { src: 'gitignore', dest: '.gitignore' },
      { src: 'npmignore', dest: '.npmignore' },
      { src: '_webpack.config.js', dest: 'webpack.config.js' },
      { src: 'src/_index.js', dest: 'src/index.js' },
      { src: 'tests/setup.js', dest: 'tests/setup.js' },
      { src: 'tests/unit/**', dest: 'tests/unit' }
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

    if (this.answers.includeCodecov) {
      filesList.push({ src: 'codecov.yml', dest: '.codecov.yml' })
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
    return commandExists('yarn')
      .then(() => {
        if (!this.answers.useYarn) {
          console.log(chalk.yellow('Opted out of yarn even though it is available')) // eslint-disable-line no-console
          return this.npmInstall()
        }
        console.log(chalk.blue('Using Yarn!')) // eslint-disable-line no-console
        return this.yarnInstall()
      })
      .catch(() => {
        this.npmInstall()
      })
  }

}
