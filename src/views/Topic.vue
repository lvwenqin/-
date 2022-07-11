<template>
  <div class='container'>
    <div class="topic" v-for='item in topicList' :key='item.id'>
      <img :src='item.scene_pic_url' style='width:100%'>
     <div class="info">
      <div class="title">{{item.title}}</div>
      <div class="goods_brief">{{item.subtitle}}</div>
      <div class="retail_price">{{item.price_info | RMBformat}}</div>
    </div>
    </div>
    <van-pagination v-model="currentPage" :page-count="totalPages" mode="simple" @change='changePage'/>
  </div>
</template>

<script>
import {reqGetTopicList} from '@/request/api'
export default {
  name: 'Topic',
  data () {
    return {
      currentPage: 1,
      size: 6,
      totalPages:'',
      count: '',
      topicList: []
    }
  },
  created () {
    this.getTopicList (this.currentPage, this.size)
  },
  methods: {
    async getTopicList (page, size) {
      const {data: res} = await reqGetTopicList ({page, size})
      // console.log (res)
      if (res.errno == 0) {
        this.topicList = res.data.data
        this.totalPages = res.data.totalPages
        this.count = res.data.count
      }
    },
    changePage (val) {
      this.currentPage = val
      this.getTopicList (this.currentPage, this.size)
      window.scrollTo(0,0)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding-bottom: .5rem;
}
.info {
  background-color: #fff;
  text-align: center;
  line-height: .4rem;
  padding: .2rem 0 .01rem; 
  border-bottom: 1px solid #ccc;
  .title {
    font-size: .2rem;
  }
  .retail_price {
    color: darkred
  }
}
</style>
