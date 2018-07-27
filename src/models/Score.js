import BetterMath from '../lib/BetterMath'

// Score object to hold the cumulative score, player name, and breakdown of each attribute and its individual score.
class Score {
  constructor(options = {}) {
    this.name = options.name || ''
    this.breakdown = options.breakdown || {}
    this.maxValuePerAttribute = options.maxValuePerAttribute || 10
    Object.assign(this, options)
  }

  // Calculate the score from the breakdown.
  get score() {
    let keys = Object.keys(this.breakdown)
    let total = keys.reduce((sum, key) => sum + this.breakdown[key], 0)
    // Maximum possible value.
    let max = keys.length * this.maxValuePerAttribute
    // Calculate the score based on a logarithmic scale rather than a linear one so that the score increases quickly and
    // and tapers off towards the end.
    let scaledScore = BetterMath.log10(total) / BetterMath.log10(max)

    return BetterMath.clamp(scaledScore, 0, 1)
  }

  get key() {
    this.key = `${this.name}:${Math.random()}`
  }

  setBreakdown(name, value) {
    this.breakdown[name] = BetterMath.clamp(value, 0, this.maxValuePerAttribute)
  }
}

export default Score
