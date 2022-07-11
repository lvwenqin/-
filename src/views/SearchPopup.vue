<template>
  <div class='search-popup'>
    <van-search
      autofocus=true
      v-model="searchVal"
      show-action
      :placeholder="placeholderVal"
      @search="onSearch"
      @cancel="onCancel"
      @input='onInput' 
    />
    <!-- 三个组件 -->
    <HistoryHot v-if='blockShow===1' :historyListData='historyListData' :hotKeywordListData='hotKeywordListData'
      @tagClick='tagClick'
    ></HistoryHot>
    <SearchTipsList v-else-if='blockShow===2' :searchTipsListData='searchTipsListData'
      @cellClick='tagClick'
    ></SearchTipsList>
    <SearchProducts v-else :filterCategory='filterCategory' :goodsList='goodsList'
      @categoryChange='categoryChange'
      @priceChange='priceChange'
    ></SearchProducts>
  </div>
</template>

<script>
import HistoryHot from '@/components/HistoryHot.vue'
import SearchTipsList from '@/components/SearchTipsList.vue'
import SearchProducts from '@/components/SearchProducts.vue'

import {reqGetSearchPopupData, reqGetSearchTipsListData, reqGetSearchGoodsListData} from '@/request/api'
export default {
  name: 'SearchPopup',
  components: {
    HistoryHot,
    SearchTipsList,
    SearchProducts,
  },
  data () {
    return {
      searchVal: '', // 搜索框收集
      placeholderVal: '', // 占位符服务器返回的
      blockShow: 1, // 控制search下展示不同的组件  三个
      historyListData: [], //历史记录列表数据
      hotKeywordListData: [], // 热门搜索
      searchTipsListData: [], // 搜索实时提示
      filterCategory: [], // 搜索产品内容的分类数据
      goodsList: [], // 搜索产品列表
      // 细化请求列表参数 没有传就默认值order: xxx, categoryId:xxx, sort: xxx
      order: 'desc',
      categoryId: 0,
      sort: 'id' // 默认搜索方式 是id还是price
    }
  },
  created () {
    this.getSearchPopupData ()
    // reqGetSearchPopupData().then (res => {
    //   console.log(res.data)
    // })
  },
  methods: {
    // 子传来给父自定义事件，点击分类事件
    categoryChange (value) {
      this.categoryId = value
      this.onSearch (this.searchVal)
    },
    // 子传来给父自定义事件，点击价格事件
    priceChange (value) {
      this.order = value
      this.sort = 'price'
      this.onSearch (this.searchVal)
    },
    // 子传来给父自定义事件，点击热门和历史事件  实时搜索联想列表
    tagClick (val) {
      this.searchVal = val
      this.onSearch (val)
    },
  
    // 回车搜索的时候触发 获取商品列表请求  order: xxx, categoryId:xxx, sort: xxx子传父
     async onSearch(val) {
      // console.log(val)
      this.blockShow = 3
      const {data: res} = await reqGetSearchGoodsListData ({keyword: val, page:1, size:10
      , order: this.order, categoryId:this.categoryId, sort: this.sort})
      // console.log(res)
      if (res.errno == 0) {
        let Arr = res.data.filterCategory
        let newArr = JSON.parse(JSON.stringify(Arr).replace(/name/g, 'text').replace(/id/g, 'value'))
        this.filterCategory = newArr
        this.goodsList = res.data.goodsList
      }
    },
    onCancel() {
      this.$router.go (-1)
    },
    async onInput (val) {
      this.blockShow = 2
      // search输入框变化时触发, 发送请求
      const {data: res} = await reqGetSearchTipsListData ({keyword:val})
      // console.log(res)
      this.searchTipsListData = res.data
    },
    // 获取search历史记录
    async getSearchPopupData () {
      const {data: res} = await reqGetSearchPopupData ()
      // console.log (res)
      if (res.errno == 0) {
        this.placeholderVal = res.data.defaultKeyword.keyword
        this.historyListData = res.data.historyKeywordList
        this.hotKeywordListData = res.data.hotKeywordList
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #efefef;
}
</style>
