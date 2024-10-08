/* eslint no-use-before-define: ["error", "nofunc"] */

module.exports = { getServerSideFunctions }

const ENSURE_THAT_BUILDDEV_RECEIVES_UPDATED_SSR_PACKAGES = true

/**
 * @returns {object}
 * @throws e.g. if "build-dev" is still preparing client-packages
 */
function getServerSideFunctions() {
  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    // eslint-disable-next-line import/no-unresolved,global-require
    const parcelBuildForSSR = require('../../dist/ssr-app').default
    return parcelBuildForSSR
  }

  try {
    if (ENSURE_THAT_BUILDDEV_RECEIVES_UPDATED_SSR_PACKAGES && process.env.HAS_PRUNED_DEV_DEPEND !== 'true') {
      const decache = require('decache')

      // IMPORTANT! DON'T USE node-webs: delete require.cache[require.resolve('../../dist/ssr-app')]
      // because 'it deletes the reference to the loaded module, NOT the loaded data itself. The module is not garbage collected, it LEAKS memory.
      if (decache) decache(require.resolve('../../dist/ssr-app'))
    }

    // @ts-ignore
    // eslint-disable-next-line import/no-unresolved,global-require
    const parcelBuildDevForSSR = require('../../dist/ssr-app').default
    return parcelBuildDevForSSR
  } catch (error) {
    if (error.message.includes('../../dist/ssr-app')) {
      throw new Error(`Server-side rendering: Too early access to client app - still preparing "./dist"`)
    }
    throw error
  }
}
