function coursesFromKopps(lang) {
  const courses = {
    sv: [
      {
        code: 'FAF3115',
        title: 'Betong och andra cementbaserade material',
        info: '',
        credits: '7,5',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Forskarnivå',
        state: 'ESTABLISHED',
      },
      {
        code: 'AF2101',
        title: 'Betongbyggnad',
        info:
          '<p>Huvudsakligt inneh&#229;ll:</p><ul><li>Armerade betongbalkar och pelare</li><li>Plattor av betong</li><li>Sp&#228;nnbetong</li><li>P&#229;gjutningar</li><li>Laborationsprovning</li></ul>',
        credits: '7,5',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Avancerad nivå',
        state: 'ESTABLISHED',
      },
      {
        code: 'AF2102',
        title: 'Betongbyggnad, fortsättningskurs',
        info:
          '<p>Stomsystem av betong</p><p>Bruksgr&#228;nstillst&#229;nd och deformationer</p><p>Grova betongkonstruktioner</p><p>Betongmaterial</p><p>Fiberbetong</p><p>Sprutbetong</p><p>Finit elementmodellering av betongkonstruktioner</p>',
        credits: '7,5',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Avancerad nivå',
        state: 'ESTABLISHED',
      },
      {
        code: 'AF1005',
        title: 'Byggkonstruktionslära, grundkurs',
        info:
          '<p>Kursen ger en djup f&#246;rst&#229;else f&#246;r verkningss&#228;ttet hos olika typer av konstruktioner samt grunderna i dimensioneringsprocessen.</p>',
        credits: '7,5',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Grundnivå',
        state: 'ESTABLISHED',
      },
      {
        code: 'F1C5031',
        title: 'Dimensioneringsmetoder för armerade betongkonstruktioner',
        info: '',
        credits: '7,5',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Forskarnivå',
        state: 'CANCELLED',
        last_examination_semester: '20222',
      },
      {
        code: 'AF213X',
        title: 'Examensarbete inom betongbyggnad, avancerad nivå',
        info: '',
        credits: '30,0',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Avancerad nivå',
        state: 'ESTABLISHED',
      },
    ],
    en: [
      {
        code: 'FAF3115',
        title: 'Concrete and Other Cement Based Materials',
        info: '',
        credits: '7.5',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'Third cycle',
        state: 'ESTABLISHED',
      },
      {
        code: 'AF2101',
        title: 'Concrete Structures',
        info:
          '<ul><li>Reinforced concrete beams and columns</li><li>Concrete slabs</li><li>Pre-stressed concrete</li><li>Bonded concrete overlays</li><li>Laboratory testing</li></ul>',
        credits: '7.5',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'Second cycle',
        state: 'ESTABLISHED',
      },
      {
        code: 'AF2102',
        title: 'Concrete Structures, Advanced Course',
        info:
          '<p>Concrete frame systems.</p><p>Serviceability state and deformations</p><p>Massive concrete structures</p><p>Concrete materials</p><p>Fiber reinforced concrete</p><p>Shotcrete (sprayed concrete)</p><p>Finite element modelling of concrete structures</p>',
        credits: '7.5',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'Second cycle',
        state: 'ESTABLISHED',
      },
      {
        code: 'AF1005',
        title: 'Structural Engineering, Basic Course',
        info:
          '<p>The course gives a deep understanding of the mode of action of different types of structures and basic knowledge about the process of structural design.</p>',
        credits: '7.5',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'First cycle',
        state: 'ESTABLISHED',
      },
      {
        code: 'F1C5031',
        title: 'Design Methods for Reinforced Concrete Structures',
        info: '',
        credits: '7.5',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'Third cycle',
        state: 'CANCELLED',
        last_examination_semester: '20222',
      },
      {
        code: 'AF212X',
        title: 'Degree Project in Concrete Structures, Second Cycle',
        info: '',
        credits: '30.0',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'Second cycle',
        state: 'ESTABLISHED',
      },
    ],
  }
  return courses[lang]
}

function expectedThirdCycleCourseList(lang) {
  const courses = {
    sv: [
      {
        code: 'FAF3115',
        title: 'Betong och andra cementbaserade material',
        info: '',
        credits: '7,5',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Forskarnivå',
        state: 'ESTABLISHED',
      },
      {
        code: 'F1C5031',
        title: 'Dimensioneringsmetoder för armerade betongkonstruktioner',
        info: '',
        credits: '7,5',
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        level: 'Forskarnivå',
        state: 'CANCELLED',
        last_examination_semester: '20222',
      },
    ],
    en: [
      {
        code: 'FAF3115',
        title: 'Concrete and Other Cement Based Materials',
        info: '',
        credits: '7.5',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'Third cycle',
        state: 'ESTABLISHED',
      },
      {
        code: 'F1C5031',
        title: 'Design Methods for Reinforced Concrete Structures',
        info: '',
        credits: '7.5',
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        level: 'Third cycle',
        state: 'CANCELLED',
        last_examination_semester: '20222',
      },
    ],
  }
  return courses[lang]
}

module.exports = {
  coursesFromKopps,
  expectedThirdCycleCourseList,
}
