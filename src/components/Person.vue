<template lang="pug">
  .person
    .name {{ person.name }}
    .attributes
      Attribute(icon="fas fa-magic" :value="person.intelligence" tooltip="Intelligence" barColor="19CF28")
      Attribute(icon="fas fa-dumbbell" :value="person.strength" tooltip="Strength" barColor="9E3FFC")
      Attribute(icon="fas fa-swimmer" :value="person.endurance" tooltip="Endurance" barColor="6682FF")
      Attribute(icon="fab fa-hotjar" :value="person.spicyFoodTolerance" tooltip="Spicy Food Tolerance" barColor="FC3F3F")
</template>

<script>
  import Attribute from './Attribute.vue'

  export default {
    components: { Attribute },

    props: {
      person: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="stylus">
  .person
    border: 1px solid gray
    padding: 0.8em 1.2em

    .name
      font-size: 1.6em
      margin-bottom: 0.3em
</style>
