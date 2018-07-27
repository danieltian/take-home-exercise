<template lang="pug">
  #app
    .text
      .text-label Input
      textarea.textarea(v-model="jsonInput")

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

    .text
      .text-label Output
      textarea.textarea {{ jsonOutput }}
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
        data: sampleData
      }
    },

    computed: {
      team() {
        return this.data.team.map((x) => new Person(x))
      },

      applicants() {
        return this.data.applicants.map((x) => new Person(x))
      },

      jsonInput: {
        get() {
          return JSON.stringify(this.data, undefined, 2)
        },

        set(value) {
          try {
            this.data = JSON.parse(value)
          }
          catch (e) {
            // Don't do anything since this will happen frequently as the user is editing the JSON.
          }
        }
      },

      scores() {
        let scores = calculator.getScores(this.team, this.applicants)

        return scores
      },

      jsonOutput() {
        return JSON.stringify(this.scores, undefined, 2)
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

  #app
    display: flex
    height: 100vh
    width: 100vw

  .text
    display: flex
    flex-direction: column

  .text-label
    background-color: textarea-background
    color: textarea-text
    font-size: 1.4em
    font-weight: bold
    text-transform: uppercase
    text-align: center

  .textarea
    width: 25em
    background-color: textarea-background
    color: textarea-text
    border: none
    outline: none
    flex: 1

  .columns
    display: flex
    padding: 0 3em
    flex: 1
    border: 5px solid columns-border

  .group
    flex: 1
    overflow: auto
    padding-top: 2.5em

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
