<template>
  <span class="control" v-if="food">
    <transition name="roll-fade">
      <i class="wrapper" v-show="food.num > 0">
        <i class="icon-remove_circle_outline icon" @click="dec"></i>
        <span class="num">{{food.num}}</span>
      </i>
    </transition>
    <i class="icon-add_circle icon" @click="add"></i>
  </span>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'control',
  props: ['food'],
  methods: {
    add (e) {
      this.stopBubble(e)
      if (!this.food.num) {
        Vue.set(this.food, 'num', 1)
        this.$emit('changedNum', this.food, true)
      } else {
        this.food.num++
        this.$emit('changedNum', this.food, false)
      }
    },
    dec (e) {
      this.stopBubble(e)
      this.food.num--
      this.$emit('changedNum', this.food, false)
    },
    stopBubble (e) {
      if (e && e.stopPropagation) {
        e.stopPropagation()
      } else {
        window.event.cancelBubble = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.roll-fade-enter-active
  transition all .2s ease
.roll-fade-leave-active
  transition all .3s ease
.roll-fade-enter, .roll-fade-leave-to
  transform translateX(10px)
  opacity 0
.control
  display inline-block
  font-size 0px
  height 24px
  .wrapper
    display inline-block
    height 100%
  .icon, .num
    display inline-block
    width 24px
    height 24px
    vertical-align middle
  .icon
    font-size 24px
    color rgb(0,160,220)
  .num
    font-size 10px
    text-align center
    line-height 24px
    color rgb(7,17,27)
</style>
