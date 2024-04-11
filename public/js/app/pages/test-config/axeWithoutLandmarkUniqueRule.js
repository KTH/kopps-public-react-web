import { configureAxe } from 'jest-axe'

const axe = configureAxe({
  // workaround for mobile and desktop <nav> have same title,
  // this violates "landmark-unique", but this should be ok one
  // of them always have display:none
  rules: { 'landmark-unique': { enabled: false } },
})

export { axe }
