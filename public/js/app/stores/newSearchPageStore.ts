type SetPatternFunction = (this: SearchCoursesStore, textPattern: string) => void

interface SearchCoursesStore {
  textPattern: string
  setPattern: SetPatternFunction
}

const setPattern: SetPatternFunction = function (textPattern) {
  if (typeof textPattern === 'string') {
    const cleanTextPattern = textPattern.replace(/['"<>$]+/g, '').trim()
    this.textPattern = cleanTextPattern || ''
  }
}

function createNewSearchPageStore(): SearchCoursesStore {
  const searchCoursesStore: SearchCoursesStore = {
    textPattern: '',
    setPattern,
  }

  return searchCoursesStore
}

export default createNewSearchPageStore
