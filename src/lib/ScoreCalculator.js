import BetterMath from './BetterMath'

const COEFFICIENT = 9
const COEFFICIENT_ATTRIBUTE_MODIFIER = 9
const MAX_VALUE = 10

let ScoreCalculator = {
  getModifier(value) {
    return (-value / COEFFICIENT) + 1.5 + (1 / COEFFICIENT)
  },

  getModifier2(value) {
    return (value / COEFFICIENT_ATTRIBUTE_MODIFIER) + 1 - (1 / COEFFICIENT_ATTRIBUTE_MODIFIER)
  },

  getAttributeScore(valueToCheck, valueToGetScoreFor) {
    return BetterMath.clamp(this.getModifier(valueToCheck) * valueToGetScoreFor, 0, MAX_VALUE)
  },

  getScaledAttribute(value) {
    let modifier = this.getModifier2(value)
    return modifier * value
  },

  getScore(average, person) {
    let scoreObject = {
      score: 0,
      breakdown: {}
    }

    Object.keys(average).forEach((key) => {
      let value = this.getAttributeScore(average[key], person.attributes[key])
      scoreObject.breakdown[key] = value
      scoreObject.score = scoreObject.score + value
    })

    return scoreObject
  },

  getScores(team, applicants) {
    // Get the sum of all the team members' attributes.
    let teamSum = team.reduce((sum, member) => {
      Object.keys(member.attributes).forEach((key) => {
        let value = this.getScaledAttribute(member.attributes[key])
        // If the key doesn't exist, set it to the current value, otherwise add it to the existing value.
        sum[key] = sum[key] ? sum[key] + value : value
      })

      return sum
    }, {})

    // Get the average value of the team members' attributes, clamped to a max of 10.
    let teamAverage = Object.keys(teamSum).reduce((average, key) => {
      average[key] = BetterMath.clamp(teamSum[key] / team.length, 0, MAX_VALUE)
      return average
    }, {})

    console.log('team average', teamAverage)

    let scores = applicants.map((applicant) => {
      let scoreObject = this.getScore(teamAverage, applicant)

      return {
        name: applicant.name,
        score: scoreObject.score,
        breakdown: scoreObject.breakdown
      }
    })

    return scores
  }
}

export default ScoreCalculator
