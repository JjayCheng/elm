<template>
  <div id="app">
    <v-header :seller="seller" @supportsClick="showDetailedSeller = true"></v-header>
    <v-nav></v-nav>
    <transition name="component-fade" mode="out-in">
      <router-view class="main-view"
      @changedShopList="newShopList" :seller="seller"/>
    </transition>
    <transition name="slide-fade">
      <detailedSeller v-show="showDetailedSeller" :seller="seller" @close="showDetailedSeller = false"></detailedSeller>
    </transition>
    <shopCar class="shopCar"
    :shopList="shopList"
    :deliveryPrice="seller.deliveryPrice"
    :minPrice="seller.minPrice"></shopCar>
  </div>
</template>

<script>
import header from 'components/header/header'
import nav from 'components/components_s/nav'
import detailedSeller from 'components/detailedSeller/detailedSeller'
import shopCar from 'components/shopCar/shopCar'
export default {
  name: 'App',
  components: {
    'v-header': header,
    'v-nav': nav,
    'detailedSeller': detailedSeller,
    shopCar
  },
  created () {
    this.$http.get('/api/seller').then(res => {
      this.seller = res.body
    })
  },
  data () {
    return {
      seller: {},
      shopList: [],
      showDetailedSeller: false
    }
  },
  methods: {
    newShopList (shopList) {
      this.shopList = shopList
    }
  }
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
    .main-view
      position absolute
      width 100%
      top 176px
      bottom 50px
</style>
