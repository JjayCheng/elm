<template>
  <div class="goods">
    <div class="left">
      <ul>
        <li v-for="(good, index) in goods" :key="index"
          :class="{'active':watchingGoods === index}"
          class="border-bottom-1px"
          @click="foodsScrollto(index)">
          <div class="wrapper">
            <supportIcon class="icon-img" v-if="good.type" :size="'3'" :type="good.type"></supportIcon>
            <span>{{good.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="right" @scroll="foodsScroll" ref="foods">
      <ul v-if="goods">
        <li v-for="(good, index) in goods" :key="index">
          <h2 class="title"><span>{{good.name}}</span></h2>
          <ul class="foods">
            <li class="food-item border-bottom-1px" v-for="(food, index2) in good.foods" :key="index2" @click="watchingFood = food">
              <img :src="food.icon" alt="" class="avatar">
              <div class="infor">
                <h3 class="name">{{food.name}}</h3>
                <p class="name-other" v-if="food.description">{{food.description}}</p>
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
                    <control :food="food" @changedNum="changedNum"></control>
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <transition name="slide-fade">
      <food v-if="watchingFood"
      :food="watchingFood"
      :shopList="shopList"
      @close="watchingFood = false"
      @changedNum="changedNum"></food>
    </transition>
  </div>
</template>

<script>
import supportIcon from 'components/components_s/supportIcon/icon'
import control from 'components/components_s/control'
import food from './food'
export default {
  name: 'goods',
  data () {
    return {
      watchingGoods: 0,
      goodHeights: [],
      goods: [],
      shopList: [],
      watchingFood: false
    }
  },
  created () {
    this.$http.get('/api/goods').then(res => {
      this.goods = res.body
      this.$nextTick(() => {
        this.initGoodHeights()
      })
    })
  },
  methods: {
    initGoodHeights () {
      let sum = 0
      let heights = []
      var goodsList = this.$refs.foods.children[0].children
      heights.push(sum)
      for (let i = 0, l = goodsList.length; i < l; i++) {
        heights.push(sum += goodsList[i].offsetHeight)
      }
      this.goodHeights = heights
    },
    foodsScroll (e) {
      const goodHeights = this.goodHeights
      const nowTop = this.$refs.foods.scrollTop
      for (let i = 0, l = goodHeights.length; i < l; i++) {
        var pHeight = goodHeights[i - 1] || 0
        var nHeight = goodHeights[i]
        if (nowTop > pHeight && nowTop < nHeight) {
          this.watchingGoods = i - 1
        }
      }
    },
    foodsScrollto (i) {
      this.$refs.foods.scrollTo(0, this.goodHeights[i])
      this.watchingGoods = i
    },
    changedNum (food, newFood) {
      var shopList = this.shopList
      if (food.num === 0) {
        let index = shopList.indexOf(food)
        index > -1 && shopList.splice(index, 1)
      }
      if (newFood) {
        shopList.push(food)
      }
      this.$emit('changedShopList', shopList)
    }
  },
  components: {
    supportIcon,
    control,
    food
  }
}
</script>

<style lang="stylus" scoped>
.goods
  display flex
  .left
    width 80px
    height 100%
    overflow scroll
    background #f3f5f7
    ul
      font-size 0
      padding-bottom 20px
      li
        display table
        width 100%
        height 54px
        font-size 12px
        color #666
        background #f3f5f7
        line-height 14px
        .wrapper
          display table-cell
          vertical-align middle
          padding 0px 12px
          .icon-img
            vertical-align middle
          span
            vertical-align middle
        &:after
          width calc(100% - 24px)
          left 12px
        &.active
          background #eee
          &:after
            border none
  .right
    flex 1
    height 100%
    overflow scroll
    background #f3f5f7
    .title
      height 26px
      background #eee
      position relative
      padding-left 14px
      line-height 26px
      font-size 13px
      color rgb(147, 153, 159)
      border-left 3px solid #ccc
    .foods
      .food-item
        display flex
        padding 18px
        &:after
          width calc(100% - 36px)
          left 18px
        .avatar
          width 57px
          height 57px
          border-radius 4px
        .infor
          flex 1
          margin-left 10px
          .name
            font-size 14px
            color rgb(7, 17, 27)
            line-height 14px
          .name-other, .sell-other
            margin-top 8px
            font-size 10px
            color rgb(147, 153, 159)
            line-height 10px
          .sell-other
            font-size 0px
            span
              font-size 10px
            .rating
              margin-left 12px
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
      .food-item:last-child
        &:after
          display none
</style>
