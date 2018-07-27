import BetterMath from '../lib/BetterMath'

class Score {
  constructor(options = {}) {
    this.name = options.name || ''
    this.breakdown = options.breakdown || {}
    this.maxValuePerAttribute = options.maxValuePerAttribute || 10
    Object.assign(this, options)
    // We'll use the name and a somewhat random string for the key.
    this.key = `${this.name}:${Math.random()}`
  }

  get score() {
    let keys = Object.keys(this.breakdown)
    let totalScore = keys.reduce((sum, key) => sum + this.breakdown[key], 0)
    let maxScore = keys.length * this.maxValuePerAttribute
    // Calculate the score based on a logarithmic scale rather than a linear one so that the score increases quickly and
    // and tapers off towards the end.
    let scaledScore = BetterMath.log10(totalScore) / BetterMath.log10(maxScore)

    return scaledScore
  }

  setBreakdown(name, value) {
    this.breakdown[name] = value
  }
}

export default Score
