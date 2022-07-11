<template>
 <div>
    <div class='his-hot' v-show='isShowHistory'>
      <div class="hd">
        <h4>历史记录</h4>
        <van-icon name="delete-o" size=".2rem" @click='clearHistory'/>
      </div>
      <div class="bd">
        <van-tag plain type="default" v-for='(item, index) in historyListData' :key='index'
          @click='tagClick(item)'
        >{{item}}</van-tag>
      </div>
    </div>

    <div class='his-hot'>
      <div class="hd">
        <h4>热门搜索</h4>
      </div>
      <div class="bd">
        <van-tag plain type="default" v-for='(item, index) in hotKeywordListData' :key='index'
          :class="item.is_hot===1?'red': ''"  @click='tagClick(item.keyword)'
        >{{item.keyword}}</van-tag>
      </div>
    </div>
 </div>

  
</template>

<script>
import {reqClearHistory} from '@/request/api'
export default {
  name: 'HistoryHot',
  props: ['historyListData', 'hotKeywordListData'],
  data () {
    return {
      isShowHistory: true
    }
  },
  methods: {
    // 点击热门和历史搜索事件
    tagClick (val) {
      // console.log(val)
      this.$emit ('tagClick', val)
    },
    // 删除历史记录请求
    async clearHistory () {
      const {data: res} = await reqClearHistory ()
      // console.log (res)
      if (res.errno == 0) {
        this.$toast.success('删除成功')
        // 隐藏历史记录
        setTimeout (() => {
          this.isShowHistory = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.his-hot {
  background-color: white;
  padding: .1rem;
  margin-bottom: .2rem;
  .hd {
    display: flex;
    justify-content: space-between;
    margin-bottom: .08rem;
    h4 {
      font-size: .20rem;
    };
  }
  .van-tag {
    margin: .05rem;
    padding: .03rem;
  }
  .red {
    color: darkred
  }
}
</style>
