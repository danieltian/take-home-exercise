<template lang="pug">
  .attribute(:title="tooltip")
    i.icon(:class="icon")

    //- Element for the entire width of the bar.
    .bar-holder
      //- The bar showing the attribute value as a percentage of the entire bar.
      .bar(:style="barStyle")
      //- End cap for the bar, to make the end value easier to see.
      .bar-cap(:style="capStyle")

    span.value {{ value }}
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },

      value: {
        type: Number,
        required: true
      },

      barColor: {
        type: String,
        default: '6682FF'
      },

      tooltip: {
        type: String,
        default: ''
      },

      max: {
        type: Number,
        default: 10
      }
    },

    computed: {
      widthPercent() {
        return this.value / this.max * 100
      },

      color() {
        return this.barColor.startsWith('#') ? this.barColor : '#' + this.barColor
      },

      barStyle() {
        return `width: ${this.widthPercent}%; background-color: ${this.color};`
      },

      capStyle() {
        return `background-color: ${this.color};`
      }
    }
  }
</script>

<style lang="stylus">
  bar-height = 5px

  .attribute
    display: flex
    align-items: center
    margin-bottom: 0.1em

    .icon
      width: 1.3em
      text-align: right
      margin-right: 0.7em

    .bar-holder
      flex: 1
      background-color: attribute-bar-holder
      height: bar-height
      display: flex
      align-items: center

    .bar
      height: 100%

    .bar-cap
      width: bar-height + 1
      height: bar-height + 1
      filter: brightness(0.6)

    .value
      width: 1.6em
      text-align: right
      margin-left: 0.3em
      font-weight: bold
</style>
