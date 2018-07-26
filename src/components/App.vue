<template lang="pug">
  #app
    textarea {{ formattedData }}

    .people
      //- Team members
      .group.team
        .group-header
          i.icon.fas.fa-users
          | Team Members
        Person(v-for="teamMember in team" :person="teamMember" :key="teamMember.key")

      //- Applicants
      .group.applicants
        .group-header
          i.icon.fas.fa-user-edit
          | Applicants
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

    &:not(:last-of-type)
      margin-right: 2em

  .group-header
    font-weight: normal
    font-size: 1.6em
    margin-bottom: 1em
    margin-left: 0.5em

    .icon
      margin-right: 0.3em

  // Add a border between each person except for the last one.
  .person:not(:last-of-type)
    border-bottom: 1px solid person-border

</style>
