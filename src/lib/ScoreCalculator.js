import BetterMath from './BetterMath'
import Score from '../models/Score'

// Attribute multiplier. An attribute value of 1 will have a multiplier of 1x, and at 10 will have a multiplier of 2x.
// The rest of the values in between increase on a linear scale.
const ATTRIBUTE_MIN = 1
const ATTRIBUTE_MAX = 10
const ATTRIBUTE_MIN_MULTIPLIER = 1
const ATTRIBUTE_MAX_MULTIPLIER = 2
const ATTRIBUTE_SLOPE = (ATTRIBUTE_MAX_MULTIPLIER - ATTRIBUTE_MIN_MULTIPLIER) / (ATTRIBUTE_MAX - ATTRIBUTE_MIN)

// Score multiplier, which is based on the team's average attribute. A team attribute value of 1 (every team member has
// 1 for that stat) will have a multiplier of 2x, and at 10 (every team member has 10 for that stat) will have a
// multiplier of 0.1. The rest of the values in between decrease on a linear scale.
const SCORE_MIN = 1
const SCORE_MAX = 10
const SCORE_MIN_MULTIPLIER = 0.1
const SCORE_MAX_MULTIPLIER = 2
const SCORE_SLOPE = (SCORE_MIN_MULTIPLIER - SCORE_MAX_MULTIPLIER) / (SCORE_MAX - SCORE_MIN)

let ScoreCalculator = {
  /**
   * Get scores for the applicants based on an existing team.
   * @param {Array} team - existing team members
   * @param {Array} applicants - applicants to get the scores for
   * @returns {Array} score for each applicant
   */
  getScores(team, applicants) {
    let teamTotal = this._getTeamTotal(team)
    let teamAverage = this._getTeamAverage(teamTotal, team.length)
    let scores = applicants.map((applicant) => this._getScore(teamAverage, applicant))

    return scores
  },

  /**
   * Sum up the attributes for the entire team and return it as an object.
   * @param {Array} team - array of team members
   * @returns {Object} sum of the team member's attributes
   */
  _getTeamTotal(team) {
    let keys = team.length ? Object.keys(team[0].attributes) : []

    let teamTotal = {}
    // Get the sum of all the team members' attributes into one object.
    team.forEach((member) => {
      keys.forEach((key) => {
        let value = this._getScaledAttribute(member.attributes[key])
        // If the key already exists, add to it. Otherwise, set it to the current value.
        teamTotal[key] = teamTotal[key] ? teamTotal[key] + value : value
      })
    })

    return teamTotal
  },

  /**
   * Get the score for a person based on a collection of attributes to compare against.
   * @param {Object} attributes - attributes to compare the person against
   * @param {Object} person - person to get the score for
   */
  _getScore(attributes, person) {
    let score = new Score({
      name: person.name,
      maxValuePerAttribute: ATTRIBUTE_MAX
    })

    // Get the score for each attribute.
    Object.keys(attributes).forEach((key) => {
      let value = this._getAttributeScore(attributes[key], person.attributes[key])
      score.setBreakdown(key, value)
    })

    return score
  },

  /**
   * Get the average of the attributes based on a number to divide by.
   * @param {Object} attributes - attributes to get the average for
   * @param {Number} count - number to divide by to get the average
   * @returns {Object} average of the attributes
   */
  _getTeamAverage(attributes, count) {
    let average = {}
    Object.keys(attributes).forEach((key) => {
      // Clamp the value to the attribute max. Because the team member's attributes are scaled up the larger they are,
      // it's possible for the average to be greater than the max value.
      average[key] = BetterMath.clamp(attributes[key] / count, 0, ATTRIBUTE_MAX)
    })

    return average
  },

  /**
   * Get a score for an applicant's attribute based on the team's average attribute.
   * @param {Number} teamAverageValue - average value of the team members for the attribute
   * @param {Number} applicantValue - value of the attribute for the applicant
   * @returns {Number} score of the particular attribute for the applicant
   */
  _getAttributeScore(teamAverageValue, applicantValue) {
    let multiplier = (teamAverageValue * SCORE_SLOPE) + SCORE_MAX_MULTIPLIER - SCORE_SLOPE
    return applicantValue * multiplier
  },

  /**
   * Gets the attribute value scaled based on its current value.
   * @param {Number} value - value to get scaled value for
   * @returns {Number} scaled attribute value
   */
  _getScaledAttribute(value) {
    let multiplier = (value * ATTRIBUTE_SLOPE) + ATTRIBUTE_MIN_MULTIPLIER - ATTRIBUTE_SLOPE
    return value * multiplier
  }
}

export default ScoreCalculator
