<template lang="pug">
  .attribute
    i(:class="icon")
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
      }
    }
  }
</script>

<style lang="stylus">
</style>
