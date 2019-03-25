<template>
  <i :class="['size' + size, type, 'star']"></i>
</template>

<script>
export default {
  name: 'star',
  props: ['size', 'type']
}
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixin.styl'
  .star
    display inline-block
  .size24
    &.on
      icon-img('img/star24_on', 12px, 12px)
    &.off
      icon-img('img/star24_off', 12px, 12px)
    &.half
      icon-img('img/star24_half', 12px, 12px)
  .size36
    &.on
      icon-img('img/star36_on', 18px, 18px)
    &.off
      icon-img('img/star36_off', 18px, 18px)
    &.half
      icon-img('img/star36_half', 18px, 18px)
  .size48
    &.on
      icon-img('img/star48_on', 24px, 24px)
    &.off
      icon-img('img/star48_off', 24px, 24px)
    &.half
      icon-img('img/star48_half', 24px, 24px)
</style>
