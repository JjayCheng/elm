<template>
  <div class="nav border-bottom-1px">
      <router-link to="/goods" class="item">商品</router-link>
      <router-link to="/ratings" class="item">评论</router-link>
      <router-link to="/seller" class="item">商家</router-link>
  </div>
</template>

<script>
export default {
  name: 'v-nav'
}
</script>

<style lang="stylus" scoped>
  .nav
    width 100%
    height 40px
    display flex
    flex-wrap nowrap
    .item
      display block
      flex 1
      color #000
      text-align center
      line-height 40px
      font-size 14px
      text-decoration none
    .router-link-active
      color rgb(240, 20, 20)
</style>
