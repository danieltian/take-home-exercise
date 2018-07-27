<template lang="pug">
  .attribute(:title="tooltip" :class="{ editable }")
    i.icon(:class="icon")

    //- Element for the entire width of the bar.
    .bar-click-zone(ref="bar" @mousedown="onDragStart")
      .bar-holder
        //- The bar showing the attribute value as a percentage of the entire bar.
        .bar(:style="barStyle")
        //- End cap for the bar, to make the end value easier to see.
        .bar-cap(:style="capStyle")

    .value {{ value.toFixed(precision) }}
</template>

<script>
  import BetterMath from '../lib/BetterMath'

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
      },

      editable: {
        type: Boolean,
        default: true
      },

      precision: {
        type: Number,
        default: 0
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
    },

    methods: {
      onDragStart(e) {
        if (!this.editable) { return }

        document.body.classList.add('full-screen-drag')

        let position = this.$refs.bar.getBoundingClientRect()
        // Run the function once to set the position on the initial click.
        this.onMouseMove(e, position)
        // Declare named functions so that removeEventListener can remove them properly.
        let mouseMoveFn = (event) => this.onMouseMove(event, position)
        let mouseUpFn = () => {
          document.body.classList.remove('full-screen-drag')
          document.removeEventListener('mousemove', mouseMoveFn)
          document.removeEventListener('mouseup', mouseUpFn)
        }

        document.addEventListener('mousemove', mouseMoveFn)
        document.addEventListener('mouseup', mouseUpFn)
      },

      onMouseMove(event, position) {
        let pixelsFromLeft = event.screenX - position.left
        let newValue = BetterMath.step(pixelsFromLeft, position.width, this.max)

        if (this.value != newValue) {
          this.$emit('update:value', newValue)
        }
      }
    }
  }
</script>

<style lang="stylus">
  bar-height = 5px

  .attribute
    display: flex
    margin-bottom: 0.1em

    &.editable:hover .bar-cap
      transform: scale(1.4)

    &.editable .bar-cap:active
      transform: scale(1.6)
      filter: brightness(0.4)

    &.editable .bar-click-zone
      cursor: pointer

    .icon
      width: 1.3em
      text-align: center
      align-self: center
      margin-right: 0.7em

    .bar-click-zone
      flex: 1
      display: flex
      align-items: center

    .bar-holder
      width: 100%
      background-color: attribute-bar-holder
      height: bar-height
      display: flex
      align-items: center

    .bar
      height: 100%
      transition: width 50ms ease-out

    .bar-cap
      width: bar-height + 1
      height: bar-height + 1
      filter: brightness(0.6)
      transition: transform 70ms ease-out

    .value
      width: 1.6em
      text-align: right
      margin-left: 0.3em
      font-weight: bold
</style>
