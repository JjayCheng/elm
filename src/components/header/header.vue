<template>
  <div class="header" :style="{background: 'url(' + seller.avatar +') no-repeat',   backgroundSize:'100% 100%'}">
    <div class="filter"></div>
    <div class="wrapper">
      <div class="seller">
        <img class="avatar" :src="seller.avatar" alt="">
        <div class="infor">
          <h4><i class="icon-img"></i>{{seller.name}}</h4>
          <h3>{{seller.description}}/{{seller.deliveryTime}}分钟送达</h3>
          <h2 v-if="seller.supports" @click="$emit('supportsClick', true)">
            <span class="left">
              <supportIcon class="icon-img" :type="seller.supports[0].type" :size="2"></supportIcon>
              <span class="content">{{seller.supports[0].description}}</span>
            </span>
            <span class="right">
              {{seller.supports.length}}个
              <i class="icon-keyboard_arrow_right"></i>
            </span>
          </h2>
        </div>
      </div>
      <div class="bulletin" @click="$emit('supportsClick', true)">
        <i class="icon-img"></i>
        <p>{{seller.bulletin}}</p>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import supportIcon from 'components/components_s/supportIcon/icon'
export default {
  name: 'v-header',
  props: ['seller'],
  components: {
    supportIcon
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
  .header
    width 100%
    position relative
    .filter
      position absolute
      width 100%
      height 100%
      z-index 1
      left 0
      top 0
      background inherit
      filter blur(10px)
      background-size 100% 100%
    .wrapper
      position relative
      width 100%
      height 100%
      background rgba(7, 17, 27, 0.5)
      z-index 2
      .seller
        padding 24px 24px 18px 24px
        color #fff
        display flex
        .avatar
          width 64px
          height 64px
          border-radius 4px
        .infor
          margin-left 16px
          flex 1
          h4
            font-size 16px
            font-weight bold
            line-height 18px
            .icon-img
              display inline-block
              icon-img('img/brand', 30px, 18px)
              margin-right 6px
              margin-top -3px
              vertical-align middle
          h3
            margin-top 8px
            font-size 13px
            line-height 12px
          h2
            margin-top 4px
            height 24px
            font-size 12px
            line-height 24px
            .left
              .icon-img
                vertical-align middle
              .content
                vertical-align middle
            .right
              float right
              display block
              height 24px
              padding 0 6px 0 12px;
              background rgba(0, 0, 0, 0.2)
              border-radius 20px
      .bulletin
        position relative
        height 28px
        background rgba(7, 17, 27, 0.2)
        padding 0 30px 0 46px
        color #fff
        p
          white-space nowrap  /*强制span不换行*/
          display inline-block  /*将span当做块级元素对待*/
          width 100%  /*限制宽度*/
          height 28px
          overflow hidden  /*超出宽度部分隐藏*/
          text-overflow ellipsis  /*超出部分以点号代替*/
          line-height 0.9  /*数字与之前的文字对齐*/
          font-size 10px
          line-height 30px
        .icon-img
          display block
          position absolute
          top 8px
          left 12px
          icon-img('img/bulletin', 22px, 12px)
        .icon-keyboard_arrow_right
          position absolute
          right 12px
          top 5px
          font-size 20px
</style>
