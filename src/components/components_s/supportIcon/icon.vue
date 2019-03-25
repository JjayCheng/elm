<template>
  <i :class="['support', 'size' + size % 2, typeMap[type] + size]"></i>
</template>

<script>
export default {
  name: 'support',
  props: ['type', 'size'],
  data () {
    return {
      typeMap: ['decrease_', 'discount_', 'guarantee_', 'invoice_', 'special_']
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../common/stylus/mixin.styl'
  .support
    display inline-block
  .size1
    &.decrease_1
      icon-img('img/decrease_1', 12px, 12px)
    &.decrease_3
      icon-img('img/decrease_3', 12px, 12px)
    &.discount_1
      icon-img('img/discount_1', 12px, 12px)
    &.discount_3
      icon-img('img/discount_3', 12px, 12px)
    &.guarantee_1
      icon-img('img/guarantee_1', 12px, 12px)
    &.guarantee_3
      icon-img('img/guarantee_3', 12px, 12px)
    &.invoice_1
      icon-img('img/invoice_1', 12px, 12px)
    &.invoice_3
      icon-img('img/invoice_3', 12px, 12px)
    &.special_1
      icon-img('img/special_1', 12px, 12px)
    &.special_3
      icon-img('img/special_3', 12px, 12px)
  .size0
    &.decrease_2
      icon-img('img/decrease_2', 16px, 16px)
    &.decrease_4
      icon-img('img/decrease_4', 16px, 16px)
    &.discount_2
      icon-img('img/discount_2', 16px, 16px)
    &.discount_4
      icon-img('img/discount_4', 16px, 16px)
    &.guarantee_2
      icon-img('img/guarantee_2', 16px, 16px)
    &.guarantee_4
      icon-img('img/guarantee_4', 16px, 16px)
    &.invoice_2
      icon-img('img/invoice_2', 16px, 16px)
    &.invoice_4
      icon-img('img/invoice_4', 16px, 16px)
    &.special_2
      icon-img('img/special_2', 16px, 16px)
    &.special_4
      icon-img('img/special_4', 16px, 16px)
</style>
