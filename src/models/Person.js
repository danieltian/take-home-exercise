// Person object to represent either a team member or an applicant.
class Person {
  constructor(options = {}) {
    this.attributes = options.attributes || {}
    this.name = options.name || ''
    // There is no unique key in the sample data, so we'll just use the name plus a somewhat random string (good enough
    // for this exercise). We can't use the attributes in the key because the key needs to be immutable and the
    // attributes can be changed in the UI.
    this.key = `${this.name}:${Math.random()}`
    // Copy all the properties from options over to this object, which is good enough for this exercise.
    Object.assign(this, options)
  }
}

export default Person
