// Person object to represent either a team member or an applicant and their stats.
class Person {
  constructor(options = {}) {
    Object.assign(this, options)
  }

  // There is no unique key in the sample data, so we'll generate something that's somewhat unique. This will only be
  // used by Vue to optimize re-renders.
  get key() {
    return this.name
  }
}

export default Person
