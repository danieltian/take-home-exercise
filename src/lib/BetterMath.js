// Create an object whose prototype is Math. We can't use a class and extend Math because it's not a function.
let BetterMath = Object.create(Math)

/**
 * Clamp a number between the lower and upper bound, inclusive on both ends.
 * @param {Number} value - value to check against the clamp range
 * @param {Number} lower - lowest value that the number can be
 * @param {Number} upper - highest value that the number can be
 * @returns {Number} clamped value
*/
BetterMath.clamp = function (value, lower, upper) {
  return this.min(this.max(value, lower), upper)
}

/**
 * Get an integer value that represents the ratio between a current value and the max possible value.
 * @param {Number} current - current position to get the step for
 * @param {Number} max - maximum possible value
 * @param {Number} steps - number of steps from 0 to the maximum possible value
 * @returns {Number} step that the current ratio is on
 * @example
 * // We want to get an integer value from 0 to 10. The current value is 46 out of a maximum of 100 with 10 total steps:
 * BetterMath.step(46, 100, 10)
 * // We should get 5, since 46 / 100 = 0.46, and rounding it up to the closest step is 5.
 */
BetterMath.step = function (current, max, steps) {
  return this.clamp(this.round(current / max * steps), 0, steps)
}

module.exports = BetterMath
