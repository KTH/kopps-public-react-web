/**
 * semester: 20242 (Number) -> Autumn 2024
 */

type YearSemesterNumber = {
  year: number
  semesterNumber: number
}

export enum SemesterNumber {
  Spring = 1,
  Autumn = 2,
}

/**
 * Takes a yearSemesterNumber and returns a yearSemesterNumber representing the semester previous to the given semester
 *
 * @param {Object} yearSemesterNumber
 * @returns
 */
export const calcPreviousSemester = ({ year, semesterNumber }: YearSemesterNumber) => {
  if (semesterNumber === 2) {
    return {
      year,
      semesterNumber: SemesterNumber.Spring,
    }
  }

  return {
    year: year - 1,
    semesterNumber: SemesterNumber.Autumn,
  }
}

/**
 *
 * @param {number} semester
 * @returns
 */
export const parseSemesterIntoYearSemesterNumberArray = (semester: string | number) => {
  const yearSemesterNumberArrayStrings = semester.toString().match(/.{1,4}/g)

  return yearSemesterNumberArrayStrings.map(str => Number(str))
}

export const getPeriodCodeForDate = (date: Date) => {
  const JULY = 6
  const year = date.getFullYear()
  const month = date.getMonth()
  const semester = month < JULY ? SemesterNumber.Spring : SemesterNumber.Autumn
  return `${year}${semester}`
}

const parseLadokSemester = (semester: string) => {
  let match = undefined
  if (semester) {
    match = semester.match(/(HT|VT)(\d{4})/)
  }

  if (!match) throw new Error("Invalid semester format. Expected 'HTYYYY' or 'VTYYYY'.")

  const [, term, year] = match
  const semesterNumber = term === 'VT' ? SemesterNumber.Spring : SemesterNumber.Autumn

  return [Number(year), semesterNumber]
}

export const parseSemester = (semester: string) => {
  let match = undefined
  if (semester) {
    match = semester.match(/^(\d{4})([1|2])$/)
  }

  if (!match) throw new Error("Invalid semester format. Expected 'YYYYS' where S is 1 for VT or 2 for HT.")

  const [, year, parsedSemesterNumber] = match
  const semesterNumber =
    parsedSemesterNumber === SemesterNumber.Spring.toString() ? SemesterNumber.Spring : SemesterNumber.Autumn

  return [Number(year), semesterNumber]
}

export const parseSemesterIntoYearSemesterNumber = (semester: string | number): YearSemesterNumber => {
  const semesterString = semester.toString()
  const semesterRegex = /^([A-Za-z]{2}\d{4})$/
  const ladokFormat = semesterRegex.test(semesterString)
  if (ladokFormat) {
    const [year, semesterNumber] = parseLadokSemester(semesterString)
    return {
      year,
      semesterNumber,
    }
  } else {
    const [year, semesterNumber] = parseSemester(String(semester))
    return {
      year,
      semesterNumber,
    }
  }
}
