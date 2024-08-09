import { useSearchParams } from 'react-router-dom'

const useUpdateURLSearchParameters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateURLSearchParameters = (paramName: string, paramValue: string[] | string) => {
    searchParams.delete(paramName)

    const appendValue = (value: string) => searchParams.append(paramName, value)

    if (paramValue && typeof paramValue === 'string') {
      appendValue(paramValue)
    } else if (Array.isArray(paramValue)) {
      paramValue.forEach(appendValue)
    }

    setSearchParams(searchParams)
  }

  return updateURLSearchParameters
}

export default useUpdateURLSearchParameters
