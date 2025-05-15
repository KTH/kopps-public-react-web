// Be aware that this entire file, or most of it, is replicated in multiple apps, so changes here should probably be synced to the other apps.
// See https://confluence.sys.kth.se/confluence/x/6wYJDQ for more information.
import React from 'react'
import i18n from '../../../../i18n'
import { useStore } from '../mobx'

export const useLanguage = () => {
  const { language: lang } = useStore()

  const translation = React.useMemo(() => i18n.getLanguageByShortname(lang), [lang])

  const isEnglish = React.useMemo(() => lang === 'en', [lang])

  const languageIndex: 0 | 1 = React.useMemo(() => (isEnglish ? 0 : 1), [isEnglish])

  const t = (key: string) => {
    return i18n.message(key, lang)
  }

  const translate: (key: string) => string = React.useMemo(() => t, [lang])

  return {
    translation,
    isEnglish,
    languageIndex,
    languageShortname: lang,
    translate,
  }
}
