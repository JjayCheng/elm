<template>
  <div class="seller">
    <div class="box sellerType border-bottom-1px">
      <div class="top">
        <span class="left">
          <h2 class="name">{{seller.name}}</h2>
          <p class="sell">
            <stars :score="seller.score" :size="'36'"></stars>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </p>
        </span>
        <span class="collect-btn" @click="hasCollect = !hasCollect">
          <p class="hart"><i class="icon-favorite" :style="{'color': hasCollect ? 'rgb(240, 20, 20)':'rgba(7, 17, 27, 0.3)'}"></i></p>
        </span>
      </div>
      <div class="type-wrapper">
        <div class="type-item">
          <p class="text">起送价</p>
          <p class="price">{{seller.minPrice}}</p>
        </div>
        <div class="type-item">
          <p class="text">商家配送</p>
          <p class="price">{{seller.deliveryPrice}}</p>
        </div>
        <div class="type-item">
          <p class="text">平均配送时间</p>
          <p class="price">{{seller.deliveryTime}}</p>
        </div>
      </div>
    </div>
    <div class="box bulletin border-bottom-1px">
      <h2>公告与活动</h2>
      <p class="content border-bottom-1px">{{seller.bulletin}}</p>
      <div class="supports-wrapper">
        <div class="supports-item border-bottom-1px" v-for="(support, index) in seller.supports" :key="index">
          <supportIcon class="icon-img" :type="support.type" :size="4"></supportIcon>
          <span class="text">{{support.description}}</span>
        </div>
      </div>
    </div>
    <div class="box sellerPics border-bottom-1px">
      <h2>商家实景</h2>
      <div class="pics-view">
        <div class="pics-wrapper" :style="{'width': picsWidth}">
          <img v-for="(pic, index) in seller.pics" :key="index" :src="pic">
        </div>
      </div>
    </div>
    <div class="box sellerInfos border-bottom-1px">
      <h2 class="border-bottom-1px">商家信息</h2>
      <div class="infos-wrapper">
        <div class="infos-item border-bottom-1px" v-for="(info, index) in seller.infos" :key="index">{{info}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import stars from 'components/components_s/stars/stars'
import supportIcon from 'components/components_s/supportIcon/icon'
export default {
  name: 'seller',
  props: ['seller'],
  data () {
    return {
      hasCollect: false
    }
  },
  computed: {
    picsWidth () {
      var pics = this.seller.pics
      if (pics) {
        return this.seller.pics.length * 126 + 'px'
      }
    }
  },
  components: {
    stars,
    supportIcon
  }
}
</script>

<style lang="stylus" scoped>
.seller
  background-color #f3f5f7
  overflow scroll
  .sellerType
    font-size 0
    .top
      .left
        display inline-block
        .sell
          padding 8px 0 18px 0
          .sellCount
            font-size 10px
            color rgb(77, 58, 93)
            vertical-align middle
            margin-left 12px
          .stars
            vertical-align middle
      .collect-btn
        display inline-block
        float right
        text-align center
        .hart
          i
            font-size 24px
        .text
          font-size 10px
          color rgb(77, 85, 93)
          margin-top 4px
    .type-wrapper
      display flex
      padding 18px 0
      justify-content center
      .type-item
        flex 1
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        &:last-child
          border none
        .text
          font-size 10px
          color rgb(147,153,159)
          margin-bottom 4px
        .price
          font-size 24px
          color rgb(7, 17, 27)
          line-height 24px
          &::after
            font-size 10px
            content '元'
  .bulletin
    .content
      padding 8px 12px 16px 12px
    .supports-wrapper
      font-size 0
      .supports-item
        padding 16px
        .icon-img
          vertical-align middle
        .text
          font-size 12px
          font-weight 200
          color rgb(7, 17, 27)
          line-height 16px
          vertical-align middle
          margin-left 6px
      .supports-item:last-child
        &:after
          display none
  .sellerPics
    .pics-view
      margin-top 12px
      font-size 0
      height 90px
      overflow scroll
      .pics-wrapper
        img
          display inline-block
          width 120px
          height 90px
          margin-right 6px
  .sellerInfos
    h2
      padding-bottom 12px
    .infos-wrapper
      .infos-item
        padding 16px 12px
        font-size 12px
        line-height 16px
        color rgb(7, 17, 27)
      .infos-item:last-child
        &:after
          display none
</style>
