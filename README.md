# generator-kyper-library

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![npm downloads][npm-downloads-image]][npm-url]
[![license][license-image]][license-url]
[![code-style][code-style-image]][code-style-url]

> Starting place for ESNext libraries using Webpack

## Installation

First, install [Yeoman](http://yeoman.io) and generator-kyper-library using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-kyper-library
```

Then generate your new project:

```bash
yo kyper-library
```


### Tests

`npm run test` - run tests
`npm run test:cov` - run tests and generate coverage


### Travis
Visit [travis](travis-ci.org) to enable your gihub repo. Builds settings can be changed in `.travis.yml`

### Deployment

#### AWS S3

Selecting AWS S3 from the deploy options when running the generator adds deploy configs in `.travis.yml`.

1. Get your AWS Key and Secret from the AWS Console Credentials page
2. Set the following environment vars within the Travis-CI repo settings page:
  * `AWS_KEY` - Your AWS key
  * `AWS_SECRET` - Your AWS secret
  * `S3_BUCKET` - Your S3 Bucket

### Code Climate

Visit [code climate dashboard](https://codeclimate.com/dashboard) to enable codeclimate for your repo on Github. Coverage will be sent automatically by Travis.

Get the key from the settings->coverage page and place it in Travis environment variable as `CODE_CLIMATE`

## License

MIT © [Scott Prue](KyperTech.com)


[npm-image]: https://img.shields.io/npm/v/generator-kyper-library.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-kyper-library
[npm-downloads-image]: https://img.shields.io/npm/dm/generator-kyper-library.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/KyperTech/generator-kyper-library/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/KyperTech/generator-kyper-library
[daviddm-image]: https://img.shields.io/david/KyperTech/generator-kyper-library.svg?style=flat-square
[daviddm-url]: https://david-dm.org/KyperTech/generator-kyper-library
[climate-image]: https://img.shields.io/codeclimate/github/KyperTech/generator-kyper-library.svg?style=flat-square
[climate-url]: https://img.shields.io/codeclimate/github/KyperTech/generator-kyper-library.svg?style=flat-square
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/KyperTech/generator-kyper-library.svg?style=flat-square
[coverage-url]: https://img.shields.io/codeclimate/coverage/github/KyperTech/generator-kyper-library.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/generator-kyper-library.svg?style=flat-square
[license-url]: https://github.com/KyperTech/generator-kyper-library/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
