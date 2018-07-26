<template lang="pug">
  #app
    textarea {{ formattedData }}

    .people
      .group.team
        Person(v-for="teamMember in team" :person="teamMember" :key="teamMember.key")
      .group.applicants
        Person(v-for="applicant in applicants" :person="applicant" :key="applicant.key")
</template>

<script>
  import sampleData from '../sample-data'
  import Person from './Person.vue'
  import PersonModel from '../models/Person'

  export default {
    components: { Person },

    data() {
      return {
        data: sampleData,
        team: sampleData.team.map((x) => new PersonModel(x)),
        applicants: sampleData.applicants.map((x) => new PersonModel(x))
      }
    },

    computed: {
      formattedData() {
        return JSON.stringify(this.data, undefined, 2)
      }
    }
  }
</script>

<style lang="stylus">
  body
    font-family: Verdana, Arial, sans-serif

  .people
    display: flex
    max-width: 800px
    margin: 0 auto

  .group
    flex: 1
</style>
