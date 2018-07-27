<template lang="pug">
  #app
    textarea.input(v-model="formattedData")

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

      //- Applicant scores with breakdowns
      .group.scorecards
        .group-header
          i.icon.fas.fa-clipboard-list
          | Scores
        Scorecard(v-for="score in scores" :score="score" :key="score.name")
</template>

<script>
  import sampleData from '../sample-data'
  import Person from './Person.vue'
  import Scorecard from './Scorecard.vue'
  import PersonModel from '../models/Person'
  import calculator from '../score-calculator.js'

  export default {
    components: { Person, Scorecard },

    data() {
      return {
        data: sampleData,
        team: sampleData.team.map((x) => new PersonModel(x)),
        applicants: sampleData.applicants.map((x) => new PersonModel(x))
      }
    },

    computed: {
      formattedData: {
        get() {
          return JSON.stringify(this.data, undefined, 2)
        },
        set(value) {
          try {
            let json = JSON.parse(value)
            this.team = json.team.map((x) => new PersonModel(x))
            this.applicants = json.applicants.map((x) => new PersonModel(x))
            this.data = json
          }
          catch (e) {
            // Don't do anything since this will happen frequently as the user is editing the JSON.
          }
        }
      },

      teamAverage() {
        let average = {}
        let keys = Object.keys(this.team[0].attributes)

        keys.forEach((key) => {
          this.team.forEach((member) => {
            average[key] = average[key] ? average[key] + member.attributes[key] : member.attributes[key]
          })
        })

        for (let key in average) {
          average[key] = average[key] / this.team.length
        }

        return average
      },

      scores() {
        let scores = this.applicants.map((applicant) => calculator.getScore({ attributes: this.teamAverage }, applicant))

        return scores
      }
    }
  }
</script>

<style lang="stylus">
  body
    font-family: Verdana, Arial, sans-serif
    margin: 0
    background-color: body-background

    &.full-screen-drag
      user-select: none

  .input
    width: 100%
    height: 20em
    background-color: #242424
    color: white
    margin-bottom: 3em

  .people
    display: flex
    max-width: 960px
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
  .person:not(:last-of-type), .scorecard:not(:last-of-type)
    border-bottom: 1px solid person-border
</style>
