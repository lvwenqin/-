<template>
  <div class='tips'>
    <van-row>
      <van-col span="8"><van-icon name="checked" color='darkred'/>30天无忧退货</van-col>
      <van-col span="8"><van-icon name="checked" color='darkred'/>48小时快速退费</van-col>
      <van-col span="8"><van-icon name="checked" color='darkred'/>满88元免邮费</van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "Tips",
}
</script>

<style lang="less" scoped>
.tips {
  height: .3rem;
  line-height: .3rem;
  text-align: center;
}
</style>
