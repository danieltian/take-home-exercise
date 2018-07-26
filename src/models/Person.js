// Person object to represent either a team member or an applicant and their stats.
class Person {
  constructor(options = {}) {
    options.attributes = options.attributes || {}
    this.name = options.name
    Object.assign(this, options.attributes)
  }

  // There is no unique key in the sample data, so we'll generate something that's somewhat unique. This will only be
  // used by Vue to optimize re-renders.
  get key() {
    return `${this.name}:${this.intelligence}:${this.strength}:${this.endurance}:${this.spicyFoodTolerance}`
  }
}

export default Person
