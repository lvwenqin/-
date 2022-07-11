<template>
  <div>
    <div v-if="$route.path=='/category'" >
     <van-search v-model="searchValue" placeholder="请输入搜索关键词" shape="round" disabled
      @click="$router.push ('/category/searchPopup')"
    />

    <div class="category">
      <div class="left">
        <!-- v-model="activeKey"  @change="onChange"绑定当前选中项的索引-->
        <van-sidebar v-model="activeKey" @change="onChange" >
          <van-sidebar-item :title="item.name" v-for='(item) in categoryList' :key='item.id' @click='changeCategory(item.id)'/>
        </van-sidebar>
      </div>
      <div class="right">
        <img :src='currentCategory.banner_url' style='width:100%'>
        <div class="title0">
          <span>{{currentCategory.name}}</span>
        </div>
        <van-grid>
          <van-grid-item :icon="item.wap_banner_url" :text="item.name" v-for='item in subCategory' :key='item.id'
           />
        </van-grid>
      </div>
    </div>
  </div>

  <!-- searchPopup -->
    <transition name='van-slide-right'>
      <router-view></router-view>
    </transition>
  </div>
  
</template>

<script>
import {reqGetCategoryList, reqGetCurrentCategory} from '@/request/api'
export default {
  name: 'Category',
  data () {
    return {
      searchValue: '',
      categoryList: [],
      currentCategory: {},
      activeKey: 0,
      subCategory: [],
    }
  },
  computed: {

  },
  created () {
    this.getCategoryList ()
  },
   methods: {
    onChange(index) {
      // console.log (index)
      this.activeKey = index
    },
    // 获取分类请求
    async getCategoryList () {
      const {data: res} = await reqGetCategoryList ()
      // console.log (res)
      if (res.errno == 0) {
        this.categoryList = res.data.categoryList
        this.currentCategory = res.data.currentCategory
        this.subCategory = res.data.currentCategory.subCategoryList
      }
    },
    // 获取当前分类请求
    async changeCategory (id) {
      // console.log (id)
      const {data: res} = await reqGetCurrentCategory (id)
      // console.log (res)
      if (res.errno == 0) {
        this.subCategory = res.data.currentCategory.subCategoryList
        this.currentCategory = res.data.currentCategory
      }
    },
    
  },
}
</script>

<style lang="less" scoped>
.category {
  display: flex;
  .right {
    flex: 1;
      .title0 {
      width: 100%;
      background: #fff;
      height: 0.5rem;
      position: relative;
      &::before {
      content: "";
      width: 50%;
      height: 2px;
      background: #ccc;
      position: absolute;
      top: 50%;
      margin-top: -1px;
      left: 50%;
      margin-left: -25%;
    }
    span {
      width: 30%;
      position: relative;
      background: #fff;
      display: block;
      text-align: center;
      margin: 0 auto;
      height: 0.5rem;
      line-height: 0.5rem;
    }
}
  }

}

</style>
