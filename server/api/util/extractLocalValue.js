const parseToBoolean = booleanStr => (booleanStr === 'true' ? true : false)

const filterValuesByDataType = (values, datatype) =>
  values.filter(element => element.Attributdefinition.Datatyp === datatype)

const findObjectWithCode = (values, code) => values.find(element => element.Attributdefinition.Kod === code)

const selectAttributeDefinitionsWithCode = code => element => element.Attributdefinition.Kod === code

const extractBoolean = (localValues, key) => {
  const localValuesWithDataType = filterValuesByDataType(localValues, 'boolean')
  const matchingLocalValue = localValuesWithDataType.find(element => element.Attributdefinition.Kod === key)

  return parseToBoolean(matchingLocalValue.Varden[0])
}

const extractString = (localValues, key) => {
  const localValuesWithDataType = filterValuesByDataType(localValues, 'string')
  const matchingLocalValue = localValuesWithDataType.find(element => element.Attributdefinition.Kod === key)

  if (!matchingLocalValue) return ''

  return matchingLocalValue.Varden[0]
}

const extractLocalValue = (localValues, key, dataType = 'boolean', singleValue = true) => {
  switch (dataType) {
    case 'boolean':
      return extractBoolean(localValues, key)
    case 'string':
      return extractString(localValues, key)

    default:
      break
  }
}

const extractFromGroupDataType = (localValues, { dataType, key, groupDataType = undefined, groupCode = undefined }) => {
  if (!groupDataType || !groupCode) return extractLocalValue(localValues, key, dataType)

  const localValuesWithGroupDataType = filterValuesByDataType(localValues, groupDataType)
  const matchingAttributeGroup = localValuesWithGroupDataType.find(selectAttributeDefinitionsWithCode(groupCode))
  return extractLocalValue(matchingAttributeGroup.GrupperadeVarden[0].Varden, key, dataType)
}

module.exports = {
  extractLocalValue,
  extractBoolean,
  extractString,
  extractFromGroupDataType,
}
