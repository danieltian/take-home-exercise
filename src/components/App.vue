<template lang="pug">
  #app
    textarea.input(v-model="formattedData")

    .columns
      //- Team members
      .group.team
        GroupHeader(icon="fas fa-users" name="Team Members")
        Person(v-for="teamMember in team" :person="teamMember" :key="teamMember.key")

      //- Applicants
      .group.applicants
        GroupHeader(icon="fas fa-user-edit" name="Applicants")
        Person(v-for="applicant in applicants" :person="applicant" :key="applicant.key")

      //- Applicant scores with breakdowns
      .group.scorecards
        GroupHeader(icon="fas fa-clipboard-list" name="Scores")
        Scorecard(v-for="score in scores" :score="score" :key="score.name")
</template>

<script>
  import sampleData from '../sample-data'
  import GroupHeader from './GroupHeader.vue'
  import PersonComponent from './Person.vue'
  import Scorecard from './Scorecard.vue'
  import Person from '../models/Person'
  import calculator from '../lib/ScoreCalculator.js'

  export default {
    components: { GroupHeader, Person: PersonComponent, Scorecard },

    data() {
      return {
        data: sampleData,
        team: sampleData.team.map((x) => new Person(x)),
        applicants: sampleData.applicants.map((x) => new Person(x))
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
            this.team = json.team.map((x) => new Person(x))
            this.applicants = json.applicants.map((x) => new Person(x))
            this.data = json
          }
          catch (e) {
            // Don't do anything since this will happen frequently as the user is editing the JSON.
          }
        }
      },

      scores() {
        let scores = calculator.getScores(this.team, this.applicants)

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

    // Don't allow text selection when something is being dragged.
    &.full-screen-drag
      user-select: none

  .input
    width: 100%
    height: 20em
    background-color: json-input-background
    color: white
    margin-bottom: 3em

  .columns
    display: flex
    max-width: 960px
    margin: 0 auto

  .group
    flex: 1

    // Add some more spacing and a divider between the team members and the applicants and their scores.
    &.team
      padding-right: 2em
      border-right: 2px solid person-border

    &:not(:last-of-type)
      margin-right: 2em

  // Add a border between each person except for the last one.
  .person:not(:last-of-type), .scorecard:not(:last-of-type)
    border-bottom: 1px solid person-border
</style>
