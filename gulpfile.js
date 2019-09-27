'use strict'

const gulp = require('gulp')

const globals = {
  dirname: __dirname
}

const { moveHandlebarPages } = require('kth-node-web-common/gulp')
const { clean } = require('kth-node-build-commons').tasks(globals)

gulp.task('moveHandlebarPages', moveHandlebarPages)

/* Put any additional helper tasks here */

/**
 *
 *  Public tasks used by developer:
 *
 */

gulp.task('clean', clean)

gulp.task('build', gulp.series(gulp.parallel('moveHandlebarPages')))
