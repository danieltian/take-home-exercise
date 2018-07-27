import BetterMath from './BetterMath'
import Score from '../models/Score'

// How quickly the modifier will increase based on the attribute value. Smaller numbers mean a faster increase. Starts
// at 1.0x for a value of 1 and increases from there.
const COEFFICIENT_ATTRIBUTE_SCALE = 9
const MAX_ATTRIBUTE_VALUE = 10

const ATTRIBUTE_MIN = 1
const ATTRIBUTE_MAX = 10
const ATTRIBUTE_MIN_MULTIPLIER = 1
const ATTRIBUTE_MAX_MULTIPLIER = 2
const ATTRIBUTE_SLOPE = (ATTRIBUTE_MAX_MULTIPLIER - ATTRIBUTE_MIN_MULTIPLIER) / (ATTRIBUTE_MAX - ATTRIBUTE_MIN)

const SCORE_MIN = 1
const SCORE_MAX = 10
const SCORE_MIN_MULTIPLIER = 0.1
const SCORE_MAX_MULTIPLIER = 2
const SCORE_SLOPE = (SCORE_MIN_MULTIPLIER - SCORE_MAX_MULTIPLIER) / (SCORE_MAX - SCORE_MIN)

let ScoreCalculator = {
  getAttributeScore(valueToCheck, valueToGetScoreFor) {
    let multiplier = (valueToCheck * SCORE_SLOPE) + SCORE_MAX_MULTIPLIER - SCORE_SLOPE
    return valueToGetScoreFor * multiplier
  },

  /**
   * Gets the attribute value scaled based on its value.
   * @param {*} value - value to get scaled value for
   * @returns {Number} scaled attribute value
   */
  getScaledAttribute(value) {
    let modifier = (value * ATTRIBUTE_SLOPE) + ATTRIBUTE_MIN_MULTIPLIER - ATTRIBUTE_SLOPE
    console.log('attribute modifier', modifier, 'value', value)
    // The modifier starts at 1.0x for a value of 1 and increases based on the coefficient.
    return modifier * value
  },

  /**
   * Get the score for a person based on a collection of attributes to compare against.
   * @param {Object} attributes - attributes to compare the person against
   * @param {Object} person - person to get the score for
   */
  getScore(attributes, person) {
    let score = new Score({ name: person.name })

    // For each attribute for the person, get the score for that particular attribute as well as the cumulative score.
    Object.keys(attributes).forEach((key) => {
      let value = this.getAttributeScore(attributes[key], person.attributes[key])
      score.setBreakdown(key, value)
    })

    return score
  },

  getTeamTotal(team) {
    let keys = team.length ? Object.keys(team[0].attributes) : {}

    let teamTotal = {}
    // Get the sum of all the team members' attributes into one object.
    team.forEach((member) => {
      keys.forEach((key) => {
        let value = this.getScaledAttribute(member.attributes[key])
        teamTotal[key] = teamTotal[key] ? teamTotal[key] + value : value
      })
    })

    console.log('team total', teamTotal)
    return teamTotal
  },

  getAttributeAverage(attributes, count) {
    let average = {}
    Object.keys(attributes).forEach((key) => {
      average[key] = BetterMath.clamp(attributes[key] / count, 0, MAX_ATTRIBUTE_VALUE)
    })

    console.log('average', average)
    return average
  },

  getScores(team, applicants) {
    let teamTotal = this.getTeamTotal(team)
    let teamAverage = this.getAttributeAverage(teamTotal, team.length)

    let scores = applicants.map((applicant) => {
      let scoreObject = this.getScore(teamAverage, applicant)
      return scoreObject
    })

    return scores
  }
}

export default ScoreCalculator
