<template lang="pug" functional>
  .group-header
    i.icon(:class="props.icon")
    | {{ props.name }}
</template>

<style lang="stylus">
  .group-header
    font-size: 1.6em
    margin-bottom: 0.8em
    text-align: center
    background-color: group-header-background
    color: group-header-text
    padding: 0.4em 0

    .icon
      margin-right: 0.3em
      color: group-header-text
</style>
