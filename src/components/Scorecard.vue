<template lang="pug">
  .scorecard
    .score {{ score.score.toFixed(this.precision) }}
    .breakdown
      Attribute(icon="fas fa-magic" :value="breakdown.intelligence" tooltip="Intelligence" barColor="19CF28" :editable="false" :precision="this.precision")
      Attribute(icon="fas fa-dumbbell" :value="breakdown.strength" tooltip="Strength" barColor="9E3FFC" :editable="false" :precision="this.precision")
      Attribute(icon="fas fa-swimmer" :value="breakdown.endurance" tooltip="Endurance" barColor="6682FF" :editable="false" :precision="this.precision")
      Attribute(icon="fab fa-hotjar" :value="breakdown.spicyFoodTolerance" tooltip="Spicy Food Tolerance" barColor="FC3F3F" :editable="false" :precision="this.precision")
</template>

<script>
  import Attribute from './Attribute.vue'

  export default {
    components: { Attribute },

    props: {
      score: {
        type: Object,
        required: true
      },

      precision: {
        type: Number,
        default: 2
      }
    },

    computed: {
      breakdown() {
        return this.score.breakdown
      }
    }
  }
</script>

<style lang="stylus">
  .scorecard
    padding: 0.5em 1.2em 0.8em

  .score
    font-size: 1.6em;
    margin-bottom: 0.3em;
</style>
