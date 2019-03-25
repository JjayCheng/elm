<template>
  <div class="ratings">
    <div class="box score border-bottom-1px">
      <div class="average">
        <h1 class="averageScore">{{seller.score}}</h1>
        <p class="title">综合评分</p>
        <p class="rankRate">高于周边商家{{seller.rankRate}}%</p>
      </div>
      <div class="serviceScore">
        <p class="star-item">
          <span class="text">服务态度</span>
          <stars class="stars" :score="seller.serviceScore" :size="'36'"></stars>
          <span class="num">{{seller.serviceScore}}</span>
        </p>
        <p class="star-item">
          <span class="text">商品描述</span>
          <stars :score="seller.foodScore" :size="'36'"></stars>
          <span class="num">{{seller.foodScore}}</span>
        </p>
        <p class="star-item deliveryTime">
          <span class="text">送达时间</span>
          <span class="num">{{seller.deliveryTime}}</span>
        </p>
      </div>
    </div>
    <div class="box userRatings border-bottom-1px">
      <div class="checkbox-wrapper border-bottom-1px">
        <div class="checkbox-item all" :class="{'selected': checkbox === 1}" @click="checkbox = 1">
          <span class="text">全部</span>
          <span class="num">{{ratingsTotal.all}}</span>
        </div>
        <div class="checkbox-item good" :class="{'selected': checkbox === 2}" @click="checkbox = 2">
          <span class="text">推荐</span>
          <span class="num">{{ratingsTotal.good}}</span>
        </div>
        <div class="checkbox-item bad" :class="{'selected': checkbox === 3}" @click="checkbox = 3">
          <span class="text">吐槽</span>
          <span class="num">{{ratingsTotal.bad}}</span>
        </div>
      </div>
      <div class="onlyBtn border-bottom-1px" :class="{'selected': !showAll}" @click="showAll = !showAll">
        <i class="icon-check_circle"></i>
        <span>只看有内容的评价</span>
      </div>
      <transition-group name="list-complete" tag="div" class="rating-wrapper">
        <div class="rating-item border-bottom-1px" v-for="rating in ratings" :key="rating.rateTime"
        v-show="(rating.text || showAll) && (checkbox === 1 || (checkbox === 2 && rating.rateType === 0) || (checkbox === 3 && rating.rateType === 1))">
          <div class="infor">
            <span class="user">
              <img :src="rating.avatar">
              <span>
                <p class="username">{{rating.username}}</p>
                <p class="score">
                  <stars class="stars" :score="rating.score" :size="'24'"></stars>
                  <span class="deliveryTime" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </p>
              </span>
            </span>
            <span class="time">{{rating.rateTime}}</span>
          </div>
          <div class="content">
            <p class="text">
              <span>{{rating.text}}</span>
            </p>
            <div class="recommend-wrapper">
              <i :class="rating.rateType ? 'icon-thumb_down' : 'icon-thumb_up'"></i>
              <span class="recommend-item" v-for="(recommend_item, index2) in rating.recommend" :key="index2">
                <span>{{recommend_item.length > 3 ? recommend_item.substring(0, 3) + '..' : recommend_item}}</span>
              </span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import stars from 'components/components_s/stars/stars'
export default {
  name: 'ratings',
  props: ['seller'],
  created () {
    this.$http.get('/api/ratings').then(res => {
      var ratings = this.ratings = res.body
      var ratingsTotal = {
        all: ratings.length,
        good: 0,
        bad: 0
      }
      ratings.forEach(rating => {
        if (rating.rateType) {
          ratingsTotal.bad++
        } else {
          ratingsTotal.good++
        }
      })
      this.ratingsTotal = ratingsTotal
    })
  },
  data () {
    return {
      ratingsTotal: {},
      'showAll': true,
      checkbox: 1,
      ratings: {}
    }
  },
  methods: {
  },
  components: {
    stars
  }
}
</script>

<style lang="stylus" scoped>
.ratings
  overflow scroll
  background-color #f3f5f7
  .score
    display flex
    .average
      text-align center
      padding 0 24px
      border-right 1px solid rgba(7, 17, 27, 0.1)
      .averageScore
        font-size 24px
        color rgb(255, 153, 0)
        margin-bottom 6px
      .title
        font-size 12px
        color rgb(7, 17, 27)
        margin-bottom 8px
      .rankRate
        margin-bottom 6px
        font-size 10px
        color rgba(7, 17, 27, 0.5)
    .serviceScore
      flex 1
      padding 0 24px
      .star-item
        margin-bottom 8px
        font-size 0
        height 18px
        line-height 5px
        .text
          font-size 12px
          color rgb(7, 17, 27)
          vertical-align middle
          margin-right 12px
        .stars
          vertical-align middle
          margin-right 12px
        .num
          font-size 12px
          color rgb(255, 153, 0)
          vertical-align middle
      .deliveryTime
        line-height 18px
        .num
          margin-left 0
          color rgb(147, 153, 159)
  .userRatings
    .checkbox-wrapper
      display flex
      padding-bottom 18px
      .checkbox-item
        font-size 0
        padding 8px 16px
        color rgb(77, 85, 93)
        margin-right 8px
        border-radius 4px
        .text
          font-size 12px
        .num
          font-size 8px
          font-weight 600
        &.all
          background-color rgba(0, 160, 220, 0.2)
          &.selected
            color #fff
            background rgb(0, 160, 220)
        &.good
          background rgba(0, 160, 220, 0.2)
          &.selected
            color #fff
            background rgb(0, 160, 220)
        &.bad
          background rgba(77, 85, 93, 0.2)
          &.selected
            color #fff
            background rgba(77, 85, 93, 0.8)
    .onlyBtn
      font-size 0
      color rgb(147, 153, 159)
      padding 12px 0px
      .icon-check_circle
        font-size 24px
        margin-right 4px
        vertical-align middle
      span
        font-size 12px
        vertical-align middle
      &.selected
        color #00c850
        span
          color #93999f
    .rating-wrapper
      .rating-item
        padding 18px 0
        transition all 1s
        .infor
          font-weight 200
          font-size 0px
          color rgb(147, 153, 159)
          .time
            float right
            font-size 10px
          .user
            display inline-block
            span
              display inline-block
              margin-left 12px
              vertical-align middle
              .username
                font-size 10px
                color rgb(7, 17, 27)
              .score
                margin-top 4px
                .stars
                  margin-left 0
                  vertical-align middle
                .deliveryTime
                  font-size 10px
                  vertical-align middle
                  margin-left 6px
            img
              display inline-block
              width 28px
              height 28px
              border-radius 100%
              vertical-align middle
        .content
          font-size 0px
          padding-left 40px
          .text
            padding 6px 0px 8px 0px
            font-size 12px
            color rgb(7, 17, 27)
            font-weight normal
            line-height 18px
          .recommend-wrapper
            i
              display inline-block
              font-size 12px
              vertical-align middle
              margin-right 4px
              width 20px
              height 20px
              line-height 20px
            .recommend-item
              display inline-block
              padding 0 6px
              height 20px
              line-height 20px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 2px
              background-color #fff
              margin-right 8px
              vertical-align middle
              span
                font-size 10px
      .rating-item:last-child
          &:after
            display none
</style>
