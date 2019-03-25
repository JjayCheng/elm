<template>
  <div class="line-title">
    <div class="border-bottom-1px"></div>
    <h2>{{title}}</h2>
    <div class="border-bottom-1px"></div>
  </div>
</template>

<script>
// import stars from 'components/stars/stars'
export default {
  name: 'detailedSeller',
  props: ['title']
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
  .line-title
    display flex
    color #fff
    font-size 14px
    font-weight 700
    line-height 14px
    padding 28px 36px 24px 36px
    h2
      padding 0 12px
    div
      flex 1
      &::after
        border-top-color rgba(255, 255, 255, 0.5)
        top 5px
</style>
