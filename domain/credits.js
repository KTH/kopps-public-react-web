function formatCredits(language, credits) {
  const creditsStr = typeof credits === 'number' ? credits.toString() : credits
  if (language === 'sv') {
    return creditsStr.includes('.') ? creditsStr.replace('.', ',') : `${creditsStr},0`
  }
  return creditsStr.includes('.') ? creditsStr : `${creditsStr}.0`
}

module.exports = { formatCredits }
