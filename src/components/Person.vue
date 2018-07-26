<template lang="pug">
  .person
    .name {{ person.name }}
    .attributes
      Attribute.intelligence(icon="fas fa-magic" :value="person.intelligence")
      Attribute.strength(icon="fas fa-dumbbell" :value="person.strength")
      Attribute.endurance(icon="fas fa-stopwatch" :value="person.endurance")
      Attribute.spicy-food-tolerance(icon="fab fa-hotjar" :value="person.spicyFoodTolerance")
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

    .name
      font-size: 1.6em
</style>
