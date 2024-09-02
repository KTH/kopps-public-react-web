type Programmes = [string, Admission][]

interface Programme {
  programmeCode: string
  title: string
  titleOtherLanguage: string
}

interface Admission {
  first: Programme[]
  second: Programme[]
}

export const filterProgrammeSyllabuses = (searchInput: string, programmes: Programmes) => {
  const pattern = searchInput.toLowerCase()

  const matchesPattern = (programme: Programme) => {
    const { title, titleOtherLanguage, programmeCode } = programme
    return (
      title.toLowerCase().includes(pattern) ||
      titleOtherLanguage.toLowerCase().includes(pattern) ||
      programmeCode.toLowerCase().includes(pattern) ||
      `${title.toLowerCase()} ${programmeCode.toLowerCase()}`.includes(pattern) ||
      `${titleOtherLanguage.toLowerCase()} ${programmeCode.toLowerCase()}`.includes(pattern)
    )
  }

  const filtered = programmes.reduce<Array<[string, Admission]>>(
    (accumulator, [programmeType, admission]: [string, Admission]) => {
      const { first, second } = admission

      const filteredCurrentProgrammes = first.filter(matchesPattern)
      const filteredObsoleteProgrammes = second.filter(matchesPattern)

      if (filteredCurrentProgrammes.length > 0 || filteredObsoleteProgrammes.length > 0) {
        accumulator.push([programmeType, { first: filteredCurrentProgrammes, second: filteredObsoleteProgrammes }])
      }

      return accumulator
    },
    []
  )
  return filtered
}
