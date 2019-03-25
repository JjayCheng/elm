<template>
  <div class="food">
    <div class="top">
      <div class="back">
        <i class="icon-arrow_lift" @click="$emit('close')"></i>
      </div>
      <img :src="food.image" alt="" srcset="">
    </div>
    <div class="box resume border-bottom-1px">
      <h2>{{food.name}}</h2>
      <p class="sell-other">
        <span class="sellCount">月售{{food.sellCount}}份</span>
        <span class="rating">好评率{{food.rating}}%</span>
      </p>
      <p class="price">
        <span class="price-left">
          <span class="price">{{food.price}}</span>
          <span class="oldPrice" v-if="food.oldPrice">{{food.oldPrice}}</span>
        </span>
        <span class="price-right">
          <transition name="left-side-fade">
            <div class="btn" v-if="food.num === 0 || food.num === undefined" @click="addToShopList">加入购物车</div>
            <control v-if="food.num > 0" :food="food" @changedNum="changedNum"></control>
          </transition>
        </span>
      </p>
    </div>
    <div class="box detailed border-bottom-1px">
      <h2>商品介绍</h2>
      <p>
        {{food.info}}
      </p>
    </div>
    <div class="box ratings border-bottom-1px">
      <h2>商品评价</h2>
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
          <div class="rating-item border-bottom-1px" v-for="rating in food.ratings" :key="rating.rateTime"
          v-show="(rating.text || showAll) && (checkbox === 1 || (checkbox === 2 && rating.rateType === 0) || (checkbox === 3 && rating.rateType === 1))">
            <div class="infor">
              <span class="time">{{rating.rateTime}}</span>
              <span class="user">
                <span>{{rating.username}}</span>
                <img :src="rating.avatar">
              </span>
            </div>
            <h2 class="content">
              <i :class="rating.rateType ? 'icon-thumb_down' : 'icon-thumb_up'"></i>
              <span>{{rating.text}}</span>
            </h2>
          </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import control from 'components/components_s/control'
export default {
  name: 'food',
  props: ['food', 'shopList'],
  data () {
    var ratings = this.food.ratings
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
    return {
      ratingsTotal,
      'showAll': true,
      checkbox: 1
    }
  },
  methods: {
    addToShopList () {
      Vue.set(this.food, 'num', 1)
      this.$emit('changedNum', this.food, true)
    },
    changedNum (food, newFood) {
      var shopList = this.shopList
      if (food.num === 0) {
        let index = shopList.indexOf(food)
        index > -1 && shopList.splice(index, 1)
      }
    }
  },
  components: {
    control
  }
}
</script>

<style lang="stylus" scoped>
.food
  position absolute
  top -176px
  bottom 0px
  width 100%
  z-index 3
  background-color #f3f5f7
  overflow scroll
  .top
    position relative
    img
      width 100%
    .back
      position absolute
      top 0px
      left 0px
      height 50px
      line-height 50px
      .icon-arrow_lift
        padding 12px
        font-size 20px
        color #fff
  .resume
    .sell-other
      margin-top 8px
      font-size 0px
      color rgb(147, 153, 159)
      line-height 10px
      .sellCount
        font-size 10px
      .rating
        margin-left 12px
        font-size 10px
    .price
      font-size 0
      .price-left
        .price
          font-size 14px
          color red
          font-weight 700
          line-height 24px
          &:before
            content '￥'
            font-size 10px
            font-weight normal
        .oldPrice
          margin-left 8px
          font-size 10px
          color rgb(147, 153, 159)
          line-height 24px
          &:before
            content '￥'
      .price-right
        float right
        .btn
          display inline-block
          width 74px
          height 24px
          font-size 10px
          color #fff
          line-height 24px
          text-align center
          border-radius 24px
          background rgb(0, 160, 220)
  .detailed
    p
      padding 8px
      font-weight 200
      color rgb(77, 85, 93)
      line-height 24px
  .ratings
    .checkbox-wrapper
      display flex
      padding 18px 0
      .checkbox-item
        font-size 0
        padding 8px 16px
        color rgb(77, 85, 93)
        margin-right 8px
        line-height 16px
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
      line-height 24px
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
        padding 16px 0px
        transition all 1s
        background #fff
        .infor
          font-weight 500
          font-size 0px
          color rgb(147, 153, 159)
          line-height 12px
          .time
            font-size 10px
          .user
            float right
            span
              font-size 10px
              margin-right 6px
              vertical-align middle
            img
              width 12px
              height 12px
              border-radius 100%
              vertical-align middle
        .content
          font-size 0px
          i
            font-size 12px
            line-height 24px
            vertical-align middle
            margin-right 4px
          span
            font-size 12px
            color rgb(7, 17, 27)
            vertical-align middle
            line-height 16px
            font-weight normal
      .rating-item:last-child
          &:after
            display none
</style>
