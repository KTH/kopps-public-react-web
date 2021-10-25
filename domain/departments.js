function localeCompareDepartments(language) {
  return function compareDepartments(a, b) {
    return a.name.localeCompare(b.name, language)
  }
}

module.exports = { localeCompareDepartments }
