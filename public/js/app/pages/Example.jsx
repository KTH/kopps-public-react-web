import React from 'react'
import { Col, Row } from 'reactstrap'

import { useStore } from '../mobx'

const DUMMY = {
  subHeader: text => `Bacon Ipsum in ${text}`,
  firstParagraph:
    'Spicy jalapeno bacon ipsum dolor amet cow prosciutto fugiat voluptate magna officia short loin. Tenderloin capicola labore chicken ut, pig pancetta magna. Consequat in t-bone ipsum. Eu landjaeger leberkas strip steak hamburger. Esse spare ribs andouille, strip steak nostrud non kevin incididunt aliqua ut pork belly pig pork chop. Proident consequat elit, short ribs ut buffalo pig velit magna ball tip commodo. Excepteur pastrami eu, nulla occaecat burgdoggen ball tip cillum consectetur hamburger meatloaf bresaola meatball tempor pork.',
  secondParagraph:
    'Cillum cupim in, bresaola ribeye frankfurter ground round duis non flank burgdoggen ex. Kielbasa anim tempor, cow quis lorem ut pastrami sausage aliquip cupidatat. Aute sunt alcatra hamburger in salami ball tip beef enim in t-bone swine deserunt ipsum. Doner consectetur tri-tip, hamburger ham picanha consequat sed aliquip short loin capicola ad salami dolore voluptate. Et qui leberkas cupim nisi aute tri-tip pig minim kielbasa enim dolor ground round bacon jerky. Pork aliqua corned beef, aliquip ut strip steak ball tip exercitation irure swine',
}

function Header() {
  return (
    <header role="presentation" id="articleHeader">
      <h1 id="page-heading" aria-labelledby="page-heading">
        Example
      </h1>
    </header>
  )
}

function Content() {
  const { language } = useStore()
  return (
    <article className="article">
      <h2>{DUMMY.subHeader(language)}</h2>
      <p>{DUMMY.firstParagraph}</p>
      <p>{DUMMY.secondParagraph}</p>
    </article>
  )
}

function Footer() {
  return (
    <footer id="articleFooter" className="border-top mt-4 pt-1">
      <address>
        Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!
        <br />
        <a href="https://baconipsum.com/">Bacon Ipsum – A Meatier Lorem Ipsum Generator</a>
      </address>
    </footer>
  )
}

function Example() {
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col>
          <Content />
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer />
        </Col>
      </Row>
    </>
  )
}

export default Example
