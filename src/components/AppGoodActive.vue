<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon icon="star" text="已收藏" color="darkred" v-if='isCollected' @click='isCollected=!isCollected'/>
      <van-goods-action-icon icon="star-o" text="未收藏" color="darkred" v-else @click='isCollected=!isCollected'/>
      <van-goods-action-icon icon="cart-o" text="购物车" :badge='goodsCount' />
      <!-- eslint-disable-next-line vue/valid-v-on -->
      <van-goods-action-button type="warning" text="加入购物车" @click=goToCart />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "AppGoodActive",
  props: ['goodsCount'],
  data () {
    return {
      isCollected: false
    }
  },
  methods: {
    goToCart () {
      this.$emit ('goToCart')
    }
  }
}
</script>

<style lang="less" scoped>
.van-goods-action {
  z-index: 99999;
}
</style>
