'use strict'

const gulp = require('gulp')

const globals = {
  dirname: __dirname
}

const { clean } = require('kth-node-build-commons').tasks(globals)

const { moveHandlebarPages } = require('kth-node-web-common/gulp')

gulp.task('moveHandlebarPages', moveHandlebarPages)

/* Put any additional helper tasks here */

/**
 *
 *  Public tasks used by developer:
 *
 */

gulp.task('clean', clean)

gulp.task('build', ['moveHandlebarPages'])
