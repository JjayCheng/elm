<template>
  <span class="stars">
    <star :size="size" v-for="(type, index) in scoreArray" :key="index" :type="type"></star>
  </span>
</template>

<script>
import star from './star'
export default {
  name: 'stars',
  props: ['score', 'size'],
  computed: {
    scoreArray () {
      if (this.score === undefined) {
        return {}
      }
      var scoreArray = []
      var decimals = (this.score % 1).toFixed(1)
      var integer = window.parseInt(this.score)
      for (let i = 0; i < integer; i++) {
        scoreArray.push('on')
      }
      if (decimals !== 0.0 && this.score !== 5) {
        if (decimals < 0.4) {
          scoreArray.push('off')
        } else if (decimals >= 0.4 && decimals <= 0.6) {
          scoreArray.push('half')
        } else if (decimals >= 0.7) {
          scoreArray.push('on')
        }
      }
      if (scoreArray.length < 6) {
        for (let i = 0, l = 5 - scoreArray.length; i < l; i++) {
          scoreArray.push('off')
        }
      }
      return scoreArray
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" scoped>
.stars
  display inline-block
</style>
