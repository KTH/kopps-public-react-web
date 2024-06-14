const { extractLocalValue, extractBoolean, extractString, extractFromGroupDataType } = require('../extractLocalValue')

const attributeValues = [
  {
    Attributdefinition: {
      Datatyp: 'boolean',
      Kod: 'utbildning.attribut.studieavgiftsbelagd',
      Uid: '10001001-1200-0100-0050-d2f7971e4592',
    },
    Varden: ['true'],
  },
  {
    Attributdefinition: {
      Datatyp: 'string',
      Kod: 'utbildning.attribut.naganting.annat',
      Uid: '10001001-1200-0100-0050-ksldfkaölksdf',
    },
    Varden: ['Någonting annat'],
  },
  {
    Attributdefinition: {
      Datatyp: 'boolean',
      Kod: 'utbildning.attribut.visas.pa.en.sokandewebben',
      Uid: '10001001-1200-0100-0067-d2f7971e4592',
    },
    Varden: ['false'],
  },
  {
    Attributdefinition: {
      Datatyp: 'boolean',
      Kod: 'utbildning.attribut.visas.pa.sv.sokandewebben',
      Uid: '10001001-1200-0100-0066-d2f7971e4592',
    },
    Varden: ['true'],
  },
  {
    Attributdefinition: {
      Datatyp: 'boolean',
      Kod: 'har_aktivitetstillfalle',
    },
    Varden: ['false'],
  },
  {
    Attributdefinition: {
      Datatyp: 'boolean',
      Kod: 'har_registrering',
    },
    Varden: ['false'],
  },
  {
    Attributdefinition: {
      Datatyp: 'boolean',
      Kod: 'installt',
    },
    Varden: ['false'],
  },
  {
    Attributdefinition: {
      Datatyp: 'attributgrupp.grunddata',
      Kod: 'utbildningstyp',
    },
    GrupperadeVarden: [
      {
        Varden: [
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.id',
            },
            Varden: ['52'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.kod',
            },
            Varden: ['2007KTF'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.svensk.benamning',
            },
            Varden: ['Kurstillfälle'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.engelsk.benamning',
            },
            Varden: ['Course instance'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.grundtyp',
            },
            Varden: ['KURS'],
          },
          {
            Attributdefinition: {
              Datatyp: 'boolean',
              Kod: 'utbildningstyp.avser.tillfalle',
            },
            Varden: ['true'],
          },
          {
            Attributdefinition: {
              Datatyp: 'integer',
              Kod: 'utbildningstyp.sorteringsordning',
            },
            Varden: ['1'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.id',
            },
            Varden: ['1'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.kod',
            },
            Varden: ['HÖ07'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.svensk.benamning',
            },
            Varden: ['Högskoleutbildning, 2007 års studieordning'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.engelsk.benamning',
            },
            Varden: ['Higher education, study regulation of 2007'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.utbildningsform.id',
            },
            Varden: ['1'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.utbildningsform.kod',
            },
            Varden: ['HÖ'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.utbildningsform.svensk.benamning',
            },
            Varden: ['Högskoleutbildning'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.utbildningsform.engelsk.benamning',
            },
            Varden: ['Higher education'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.enhet.id',
            },
            Varden: ['2'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.enhet.kod',
            },
            Varden: ['HP'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.enhet.svensk.benamning',
            },
            Varden: ['Högskolepoäng'],
          },
          {
            Attributdefinition: {
              Datatyp: 'string',
              Kod: 'utbildningstyp.studieordning.enhet.engelsk.benamning',
            },
            Varden: ['Credits'],
          },
          {
            Attributdefinition: {
              Datatyp: 'integer',
              Kod: 'utbildningstyp.studieordning.enhet.helarsekvivalent',
            },
            Varden: ['60'],
          },
        ],
      },
    ],
  },
]

describe('extractBoolean', () => {
  it('extracts boolean values', () => {
    expect(extractBoolean(attributeValues, 'har_registrering')).toStrictEqual(false)
    expect(extractBoolean(attributeValues, 'utbildning.attribut.visas.pa.sv.sokandewebben')).toStrictEqual(true)
  })
})
describe('extractString', () => {
  it('extracts string values', () => {
    expect(extractString(attributeValues, 'utbildning.attribut.naganting.annat')).toStrictEqual('Någonting annat')
  })
})

describe('extractLovalValue', () => {
  it('extracts dataType from GrupperadeVarden', () => {
    expect(
      extractFromGroupDataType(attributeValues, {
        key: 'utbildningstyp.studieordning.enhet.kod',
        groupCode: 'utbildningstyp',
        groupDataType: 'attributgrupp.grunddata',
        dataType: 'string',
      })
    ).toStrictEqual('HP')
  })

  it('extracts boolean withouth groupDataType', () => {
    expect(
      extractFromGroupDataType(attributeValues, {
        key: 'har_registrering',
        dataType: 'boolean',
      })
    ).toStrictEqual(false)
  })

  it.todo('multiple values')
  it.todo('if no value was found')
})
