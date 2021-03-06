/* global describe before */
import path from 'path'
import helpers from 'yeoman-test'
import { checkForEachFile } from '../utils'

const projectFiles = [
  'package.json',
  '.gitignore',
  '.babelrc',
  'README.md',
  'config.json',
  '.npmignore',
  'src/index.js'
]

const testFiles = [
  'test/setup.js',
  'test/unit'
]

describe.skip('generator-react-firebase:app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../../generators/app'))
      .withPrompts({includeTravis: true, githubUser: 'someuser', codeClimate: true})
      .toPromise()
  )
  describe('project', () => checkForEachFile(projectFiles))
  describe('application', () => checkForEachFile(testFiles, 'test/'))
})
