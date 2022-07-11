<template>
  <div>
    <van-list
      :finished="finished"
      finished-text="没有更多了"
    >
      <van-cell v-for="item in searchTipsListData" :key="item" :title="item" @click='cellClick(item)'/>
    </van-list> 
  </div>
</template>

<script>
export default {
  name: 'SearchTipsList',
  props: ['searchTipsListData'],
  data () {
    return {
      finished: true
    }
  },
  methods: {
    cellClick (val) {
      this.$emit ('cellClick', val)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
