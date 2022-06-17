function throwErrorIfNoBrowserConfig(browserConfig) {
  if (!browserConfig)
    throw new TypeError(
      `Error while generating menu or breadcrumbs: browserConfig is not defined, check if store was passed in or it was filled in on server-side`
    )
  if (!browserConfig.proxyPrefixPath)
    throw new TypeError('Error while generating meny or breadcrumbs: proxyPrefixPath is not defined in browserConfig')
}

export { throwErrorIfNoBrowserConfig }
