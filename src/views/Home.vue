<template>
  <div>
    <div class="home" v-if="$route.path=='/home'">
    <!-- 首页搜索框 -->
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" shape="round" disabled
      @click="$router.push ('/home/searchPopup')"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for='item in banner' :key=item.id>
        <img :src='item.image_url' width='100%'>
      </van-swipe-item>
    </van-swipe>
    
    <!-- 分类 -->
    <van-grid :column-num="5">
      <van-grid-item :icon="item.icon_url" :text="item.name" v-for='item in channel' :key='item.id'/>

    </van-grid>
    <!-- 品牌制造商直供 -->
    <div class="trade">
      <h3 class='title'>品牌制造商直供</h3>
      <ul>
        <li ><img :src='item.list_pic_url' style='width: 45%'  v-for='item in brandList' :key='item.id'></li>
      </ul>
    </div>
    <!-- 新品首发 -->
    <div class="trade">
      <h3 class='title'>新品首发</h3>
      <Products :goodsList='goodsList'></Products>
    </div>
    <!-- 人气推荐 -->
    <div class="trade">
      <h3 class='title'>人气推荐</h3>
      <van-card
        :price='item.retail_price'
        :desc="item.goods_brief"
        :title="item.name"
        :thumb="item.list_pic_url"
        v-for = 'item in hotGoodsList' :key='item.id'
        @click = toProductDetail(item.id)
      />
    </div>
    <!-- 专题精选 -->
    <div class="trade">
      <h3 class='title'>专题精选</h3>
      <van-swipe :loop="false" :width="250">
        <van-swipe-item><img src='@/assets/logo.png' style='height: 150px'></van-swipe-item>
        <van-swipe-item><img src='@/assets/logo.png' style='height: 150px'></van-swipe-item>
        <van-swipe-item><img src='@/assets/logo.png' style='height: 150px'></van-swipe-item>
        <van-swipe-item><img src='@/assets/logo.png' style='height: 150px'></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 具体分类 -->
    <div class="trade" v-for='item in categoryList' :key='item.id'>
      <h3 class='title'>{{item.name}}</h3>
      <Products :goodsList='item.goodsList'></Products>

    </div>
  </div>
  <!-- searchPopup -->
  <transition name='van-slide-right'>
    <router-view></router-view>
  </transition>
  </div>
</template>

<script>
import Products from "@/components/Products.vue"
import { reqGetHomeList } from "@/request/api.js"
export default {
  name: "Home",
  data() {
    return {
      searchValue: "", // 搜索框
      banner: [], // 轮播图
      channel: [],
      hotGoodsList: [],
      brandList: [],
      topicList: [],
      categoryList: [],
      goodsList: [],


    }
  },
  components: {
    Products
  },
  created() {
    this.getHomeList ()
  },
  methods: {
    async getHomeList() {
      const {data: res} = await reqGetHomeList ()
      // console.log (res)
      if (res.errno == 0) {
        this.banner = res.data.banner
        this.channel = res.data.channel
        this.hotGoodsList = res.data.hotGoodsList
        this.goodsList = res.data.newGoodsList
        this.brandList = res.data.brandList
        this.topicList = res.data.topicList
        this.categoryList = res.data.categoryList
      }
    },
    // 人气推荐进入详情
    toProductDetail (id) {
      // console.log(id)
      this.$router.push (`/productDetail?id=${id}`)
        // 产品详情下方产品推荐复用这个组件，点击也要跳转相应详情页
        
    }
  },
  
}
</script>

<style lang="less" scoped>
  // Vue实现动画效果
  // .slide-enter, .slide-leave-to {
  //   // 过渡之前样式
  //   right: -100%
  // }
  // .slide-enter-active,   .slide-leave-active {
  //   transition: right .3s;
  // }
  // .slide-enter-to, .slide-leave {
  //   // 过渡结束
  //   right: 0
  // }
  .home {
    padding-bottom: .4rem;
    .trade {
    margin: .15rem 0;
    background-color: #fff;
    line-height: .4rem;
    padding: .2rem 0 .01rem; 
    border-bottom: 1px solid #ccc;
    .title {
      font-size: .2rem;
      text-align: center;
    }
    ul {
            
      li {
        margin-bottom: .1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        img {
          margin-bottom: .1rem;
        }
      }

    }
  }
  }

  
</style>
