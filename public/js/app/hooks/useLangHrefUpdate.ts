import { useRef, useEffect } from 'react'
import { stringifyUrlParams } from '../../../../domain/searchParams'
import { CourseSearchParams } from '../pages/types/searchPageTypes'
import { useStore } from '../mobx'
import { isEnglishCode, LanguageCode } from '../util/languageUtil'

export const useLangHrefUpdate = (courseSearchParams?: CourseSearchParams) => {
  const { language } = useStore()
  const langRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    if (!langRef.current) {
      langRef.current = document.querySelector('.kth-menu-item.language')
    }

    if (langRef.current && !courseSearchParams)
      langRef.current.href = `?l=${isEnglishCode(language) ? LanguageCode.Swedish : LanguageCode.English}`

    if (langRef.current && courseSearchParams) {
      const filteredSearchParams = Object.fromEntries(
        Object.entries(courseSearchParams).filter(([key, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0
          }
          return value !== '' && value !== null && value !== undefined
        })
      )

      const queryParams = stringifyUrlParams({
        ...filteredSearchParams,
        l: isEnglishCode(language) ? LanguageCode.Swedish : LanguageCode.English,
      })

      langRef.current.href = `?${queryParams}`
    }
  }, [courseSearchParams, language])

  return langRef
}
