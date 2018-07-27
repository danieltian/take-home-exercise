<template lang="pug">
  .person
    .name {{ person.name }}
    .attributes
      Attribute(icon="fas fa-magic" :value.sync="attributes.intelligence" tooltip="Intelligence" barColor="19CF28")
      Attribute(icon="fas fa-dumbbell" :value.sync="attributes.strength" tooltip="Strength" barColor="9E3FFC")
      Attribute(icon="fas fa-swimmer" :value.sync="attributes.endurance" tooltip="Endurance" barColor="6682FF")
      Attribute(icon="fab fa-hotjar" :value.sync="attributes.spicyFoodTolerance" tooltip="Spicy Food Tolerance" barColor="FC3F3F")
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
    },

    computed: {
      attributes() {
        return this.person.attributes
      }
    }
  }
</script>

<style lang="stylus">
  hover-strip-width = 8px

  .person
    padding: 0.5em 1.2em 0.8em
    position: relative

    // Hover strip that shows in front of the person when hovered.
    &::before
      content: ''
      position: absolute
      height: 100%
      width: hover-strip-width
      top: 0
      left: 0
      transform: translateX(-(hover-strip-width))
      background-color: person-hover-strip
      transition: transform 70ms ease-out

    &:hover::before {
      transform: translateX(0)
    }

    .name
      font-size: 1.6em
      margin-bottom: 0.3em
</style>
