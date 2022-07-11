<template>
 <div>
    <div v-if="$route.path=='/productDetail'">
    <van-search placeholder="请输入搜索关键词" shape="round" disabled
      @click="$router.push ('/productDetail/searchPopup')"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for='item in gallery' :key=item.id>
        <img :src='item.img_url' width='100%' style='display: block'>
      </van-swipe-item>
    </van-swipe>
    <!-- tips组件 -->
    <Tips></Tips>
    <!-- 产品信息 -->
    <div class="info">
      <div class="title">{{info.name}}</div>
      <div class="goods_brief">{{info.goods_brief}}</div>
      <div class="retail_price">{{info.retail_price|| 0 | RMBformat}}</div>
    </div>
    <!-- cell组件 展示弹出层 -->
    <van-cell title="展示弹出层" is-link @click='isSkuShow=true'/>
    <!-- 商品参数 -->
    <div class="attribute">
      <h3>商品参数</h3>
      <ul>
        <li v-for='item in attribute' :key='item.name'>
          <div class="name">{{item.name}}</div>
          <div class="value van-ellipsis" >{{item.value}}</div>
        </li>
      </ul>
    </div>
    <!-- 图片信息 -->
    <div class="goods_desc" v-html='goods_desc'></div>
    <!-- 问题 -->
    <div class="title0">
      <span>常见问题</span>
    </div>
    <ul class="issue">
      <li v-for="item in issue" :key="item.id">
        <h3>{{item.question}}</h3>
        <p>{{item.answer}}</p>
      </li>
    </ul>
    <!-- 相关推荐产品 -->
    <div class="title0">
      <span>大家都在看</span>
    </div>
    <Products :goodsList="goodsList"></Products>
    <!-- sku弹出层 @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"-->
    <van-sku
      ref='sku'
      v-model="isSkuShow"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"  
    ></van-sku>
    <!-- 商品导航组件 -->
    <AppGoodActive @goToCart='AddToCart' :goodsCount='goodsCount'></AppGoodActive>
  </div>
  <!-- searchPopup -->
    <transition name='van-slide-right'>
      <router-view></router-view>
    </transition>
 </div>
</template>

<script>
import Tips from '@/components/Tips'
import Products from '@/components/Products.vue'
import AppGoodActive from '@/components/AppGoodActive.vue'
import { reqGetGoodsDetail, reqGetGoodsRelated, reqGetGoodsCount, reqAddProductToCart} from '@/request/api'
export default {
  name: 'ProductDetail',
  data () {
    return {
      gallery: [],
      info: {},
      attribute: [],
      goods_desc: '',
      // 常见问题
      issue:[],
      // 相关产品列表 另一个请求
      goodsList:[],
      // sku弹出层-------------------------------
      isSkuShow: false,
      sku: {
        tree: [
          // {
          //   largeImageMode: true, //  是否展示大图模式
          // }
        ],
        hide_stock: false,
        price: '0',
        stock_num: ''
      },
      goods: {
        picture: ''
      },
      // 购物栏数量
      goodsCount: 0,
      // 请求详情页数据拿到 productList 用于加入购物车参数
      productList:[]

    }
  },
  components: {
    Tips,
    Products,
    AppGoodActive
  },
  created () {
    // 产品详情请求
    this.getGoodsDetail ()
    // 相关产品请求
    this.getGoodsRelated ()
    // 购物栏数量
    this.getGoodsCount ()
  },
  methods: {
    async getGoodsDetail () {
      let id = this.$route.query.id
      const {data: res} = await reqGetGoodsDetail (id)
      // console.log (res)
      if (res.errno == 0) {
        this.gallery = res.data.gallery
        this.info = res.data.info 
        this.attribute = res.data.attribute
        this.goods_desc = res.data.info.goods_desc
        this.issue = res.data.issue
        // sku弹出层数据
        this.goods.picture = res.data.info.list_pic_url
        this.sku.price = res.data.info.retail_price
        this.sku.stock_num = res.data.info.goods_number
        // 请求详情页数据拿到 productList 用于加入购物车参数
        this.productList = res.data.productList
      }
    },
    async getGoodsRelated () {
      let id = this.$route.query.id
      const {data: res} = await reqGetGoodsRelated (id)
      // console.log (res)
      if (res.errno == 0) {
        this.goodsList = res.data.goodsList
      }
    },
    // 加入购物车事件
    async AddToCart () {
      if (this.isSkuShow) {
        // console.log ('jiaru gouwuche ')
        // 加入购物车携带的数量等参数 见sku文档
        let goodsId = this.$route.query.id
        let productId = this.productList[0].id
        let number = this.$refs.sku.getSkuData ().selectedNum
        const {data: res} = await reqAddProductToCart({goodsId, productId,number})
        // console.log(res) 
        // 更新购物栏数量
        this.goodsCount = res.data.cartTotal.goodsCount
        // 跳转购物车页面
        this.$toast.success ('加入购物车成功')
        setTimeout (() => {
          this.$router.push ('/cart')
        }, 1500)
      } else {
        this.isSkuShow = true
      }
    },
    // 购物栏数量
    async getGoodsCount () {
      const {data: res } = await reqGetGoodsCount ()
      // console.log(res)
      if (res.errno == 0) {
        this.goodsCount = res.data.cartTotal.goodsCount
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
.attribute {
  background-color: #fff;
  margin-top: .2rem;
  padding: .1rem .168rem;
  h3 {
    font-size: .1638rem;
    line-height: .5rem;
  }
  li {
    height: .4rem;
    line-height: .4rem;
    background-color: #efefef;
    display: flex;
    margin-bottom: .1rem;
    border-radius: .1rem;
    .name {
      width: 30%;
      text-align: right;
      margin-right: .2rem;
      font-size: .12rem;
    }
    .value {
      flex: 1;
      font-size: .168rem;
    }
  }
}
// 深度样式
/deep/.goods_desc {
  img {
    display: block;
    width: 100%;
  }
}
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
.issue {
  padding: 0 4%;
  background: #fff;
  li {
    h3 {
      height: 0.3rem;
      line-height: 0.3rem;
      padding-left: 0.2rem;
      position: relative;
      font-weight: normal;
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }
    p {
      font-size: 0.12rem;
      line-height: 0.2rem;
      padding-left: 0.2rem;
    }
  }
}
</style>
