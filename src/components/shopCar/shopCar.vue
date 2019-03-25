<template>
  <div class="shopCar">
    <div class="shopCar-bottom">
      <div class="carIcon">
        <div class="outWrapper">
          <div class="round" @click="showList = !showList" :class="{'bg-blue': totalNum}">
            <i class="icon-shopping_cart"></i>
          </div>
          <i class="red-icon" v-if="totalNum">
            {{totalNum}}
          </i>
        </div>
      </div>
      <p class="price"><span>￥{{totalPrice}}</span></p>
      <p class="other">
        另需配送费￥{{deliveryPrice}}元
      </p>
      <div class="btn" v-if="totalPrice === 0">
        <span>￥{{minPrice}}元起送</span>
      </div>
      <div class="btn" v-if="totalPrice < minPrice && totalPrice > 0">
        <span>还差￥{{minPrice - totalPrice}}元起送</span>
      </div>
      <div class="btn bg-blue" v-if="totalPrice >= minPrice">
        <span>去结算</span>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="listWrapper" v-show="showList">
        <div class="list">
          <div class="title border-bottom-1px">
            <span class="content">购物车</span>
            <span class="clearbtn" @click="clearShopList">清空</span>
          </div>
          <div class="listCt">
            <transition-group name="list-complete" tag="ul">
              <li v-for="food in shopList" :key="food.name">
                <span class="name">{{food.name}}</span>
                <span class="control">
                  <span class="price">{{food.price}}</span>
                  <control :food="food" @changedNum="changedNum"></control>
                </span>
              </li>
            </transition-group>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import control from 'components/components_s/control'
export default {
  name: 'shopCar',
  props: ['shopList', 'deliveryPrice', 'minPrice'],
  data () {
    return {
      showList: false
    }
  },
  methods: {
    changedNum (food, newFood) {
      var shopList = this.shopList
      if (food.num === 0) {
        let index = shopList.indexOf(food)
        index > -1 && shopList.splice(index, 1)
      }
    },
    clearShopList () {
      const shopList = this.shopList
      shopList.forEach((food, i) => {
        food.num = 0
        shopList.splice(i, 1)
      })
    }
  },
  computed: {
    totalPrice () {
      var total = 0
      this.shopList.forEach(food => {
        total += food.price * food.num
      })
      return total
    },
    totalNum () {
      var total = 0
      this.shopList.forEach(food => {
        total += food.num
      })
      return total
    }
  },
  components: {
    control
  }
}
</script>

<style lang="stylus" scoped>
.shopCar
    position fixed
    width 100%
    bottom 0px
    z-index 3
  .shopCar-bottom
    position relative
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content flex-start
    width 100%
    height 50px
    background-color #141d27
    z-index 4
    .outWrapper
      margin-left 18px
      position relative
      top -8px
      width 58px
      height 58px
      border-radius 100%
      background-color #141d27
      .round
        position relative
        top 8px
        left 6px
        width 46px
        height 46px
        background rgba(255, 255, 255, 0.2)
        border-radius 100%
        line-height 54px
        text-align center
        color rgba(255, 255, 255, 0.4)
        &.bg-blue
          color #fff
          background rgb(0,160,220)
        .icon-shopping_cart
          font-size 24px
      .red-icon
        position absolute
        right 0
        top 0
        padding 5px 8px
        border-radius 100%
        background-color red
        color #fff
        font-size 10px
    .price
      font-size 14px
      color rgba(255, 255, 255, 0.4)
      font-weight 700
      line-height 50px
      span
        padding-right 12px
        padding-left 18px
        border-right 1px solid
    .other
      font-size 14px
      color rgba(255, 255, 255, 0.4)
      font-weight 700
      line-height 50px
      padding-left 12px
    .btn
      margin-left auto
      width 105px
      height 50px
      font-size 12px
      color rgba(255, 255, 255, 0.4)
      font-weight 700
      line-height 50px
      text-align center
      background #666
      &.bg-blue
        color #fff
        background rgb(0,160,220)
  .listWrapper
    position fixed
    top 0px
    width 100%
    height 100%
    background rgba(7, 17, 27, 0.8)
    .list
      position absolute
      width 100%
      bottom 50px
      .title
        width 100%
        height 40px
        font-weight 200
        line-height 40px
        background #f3f5f7
        .content
          font-size 14px
          margin-left 18px
        .clearbtn
          font-size 12px
          color rgb(0, 160, 220)
          float right
          margin-right 18px
      .listCt
        width 100%
        height 250px
        background-color #fff
        overflow scroll
        ul
          padding 0 18px
          li
            width 100%
            height 48px
            font-size 0px
            line-height 48px
            border-bottom(1px, rgba(7, 17, 27, 0.1))
            overflow hidden
            transition all 1s
            .name
              font-size 14px
              color rgb(7, 17, 27)
            .control
              float right
              height 48px
              .price
                margin-right 12px
                font-size 14px
                font-weight 700
                color rgb(240, 20, 20)
                &:before
                  content '￥'
                  font-size 10px
                  font-weight normal
</style>
