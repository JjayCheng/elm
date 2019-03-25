<template>
  <div class="detailedSeller">
     <h3 class="title">{{seller.name}}</h3>
    <stars :score="seller.score" size="48"></stars>
    <line-title title="优惠信息"></line-title>
    <div class="supports" v-if="seller.supports">
      <div class="item" v-for="(support, index) in seller.supports" :key="index">
        <supportIcon class="icon-img" :type="support.type" :size="2"></supportIcon>
        <span>{{support.description}}</span>
      </div>
    </div>
    <line-title title="优惠信息"></line-title>
    <p class="bulletin">
      {{seller.bulletin}}
    </p>
    <div class="close"><i class="icon-close" @click="$emit('close', true)"></i></div>
  </div>
</template>

<script>
import stars from 'components/components_s/stars/stars'
import lineTitle from './line-title'
import supportIcon from 'components/components_s/supportIcon/icon'
export default {
  name: 'detailedSeller',
  props: ['seller'],
  components: {
    stars,
    supportIcon,
    'line-title': lineTitle
  }
}
</script>

<style lang="stylus" scoped>
  .detailedSeller
    position absolute
    top 0px
    left 0px
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.8)
    color #fff
    text-align center
    z-index 5
    overflow scroll
    .title
      margin-top 64px
      margin-bottom 16px
      font-size 16px
      font-weight 700
      line-height 16px
      text-align center
    .supports
      font-size 0px
      text-align left
      padding-left 36px
      .item
        margin-top 12px
        .icon-img
          vertical-align middle
        span
          margin-left 6px
          font-size 12px
          line-height 12px
          vertical-align middle
    .bulletin
      padding 0px 48px
      font-size 12px
      line-height 24px
      text-align left
      padding-bottom 100px
    .close
      position fixed
      width 100%
      left 0
      bottom 32px
      font-size 32px
      color rgba(255, 255, 255, .5)
</style>
