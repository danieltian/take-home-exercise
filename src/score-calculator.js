let ScoreCalculator = {
  getModifier(value) {
    return 1 - (value / 10)
  },

  getAttributeScore(valueToCheck, valueToGetScoreFor) {
    return getModifier(valueToCheck) * valueToGetScoreFor
  },

  getScore(person1, person2) {
    let score = {
      score: 0,
      breakdown: {}
    }

    Object.keys(person1.attributes).forEach((key) => {
      let modifier = this.getModifier(person1.attributes[key])
      let value = person2.attributes[key] * modifier
      score.breakdown[key] = value
      score.score = score.score + value
    })

    return score
  }
}

export default ScoreCalculator
