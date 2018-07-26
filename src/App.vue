<template lang="pug">
  #app
    h1 {{ text }}
    input(v-model="text")
</template>

<script>
  export default {
    data() {
      return {
        text: 'Hi from app!'
      }
    }
  }
</script>

<style lang="stylus">
  h1
    color: orange
</style>
