function setCourseListLadok(courseListLadok) {
  this.courseListLadok = courseListLadok
}

function createAppendix3Store() {
  const appendix3Store = {
    courseListLadok: {},
    setCourseListLadok,
  }
  return appendix3Store
}

export default createAppendix3Store
