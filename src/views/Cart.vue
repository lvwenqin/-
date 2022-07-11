<template>
  <div>
    <Tips></Tips>

    <van-checkbox-group v-model="result" :disabled='isEditing'>
      <van-checkbox :name="item.id" v-for='item in cartList' :key='item.id'
      @click='changeGoodChecked(item)'>
        <van-swipe-cell>
          <van-card 
            :num="item.number" 
            :price="item.retail_price" 
            :title="item.goods_name" 
            :thumb="item.list_pic_url"
          ></van-card>
          <van-stepper v-model="item.number" v-show='isEditing' @change='stepperChange(item)' />
           <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click='deleteGood(item.product_id)' />
          </template>
        </van-swipe-cell>
      </van-checkbox>

    </van-checkbox-group>

    <van-submit-bar :price="cartTotal.checkedGoodsAmount * 100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkedAll" :disabled='isEditing'>全选</van-checkbox>
      <template #tip>
        累计共<span>{{cartTotal.checkedGoodsCount}}</span>件商品, 点击 <van-button :type="isEditing? 'danger':'primary'" size="mini" @click='editBtn'>{{isEditing? '完成编辑':'编辑'}}</van-button> 修改商品数量
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from "@/components/Tips.vue"
import {reqGetCartListData, reqChangeGoodChecked, reqStepperChange, reqDeleteGood} from '@/request/api'
export default {
  name: "Cart",
  components: {
    Tips,
  },
  data() {
    return {
      result: [], // 展示选中元素的数组  谁checked==1 谁的id展示这里
      // checkedAll: "",
      // 请求购物车数据
      cartList: [],
      cartTotal: {},
      // 编辑状态
      isEditing: false
    }
  },
  computed: {
    // 全选
    checkedAll: {
      get () {
        return this.result.length==this.cartList.length
      },
      // 请求切换
      async set (val) {
        let ids_arr = []
        this.cartList.map (item => {
          ids_arr.push (item.product_id)
        })
        let isChecked = val?1:0
        let productIds = ids_arr.join ()
        const {data: res} = await reqChangeGoodChecked ({isChecked, productIds})
        // console.log (res)
        if (res.errno == 0) {
          this.cartList = res.data.cartList
          this.cartTotal = res.data.cartTotal
          this.result = []
          // 处理复选框
          this.cartList.map ((item) => {
            item.checked == 1? this.result.push (item.id): ''
          })
        }
      }
    }
  },
  created () {
    // 获取购物车数据
    this.getCartListData ()
  },
  methods: {
    // 获取购物车数据
    async getCartListData () {
      const{data: res} = await reqGetCartListData ()
      // console.log (res)
      if (res.errno == 0) {
        this.cartList = res.data.cartList
        this.cartTotal = res.data.cartTotal
        // 处理复选框
        this.cartList.map ((item) => {
          item.checked == 1? this.result.push (item.id): ''
        })
      }
    },
    // 切换每一项选中状态请求拿回数据
    async changeGoodChecked (item) {
      // 编辑状态要return出去
      if (this.isEditing) return
      let isChecked = item.checked==0?1:0
      let productIds = item.product_id
      const {data: res} = await reqChangeGoodChecked ({isChecked, productIds})
      // console.log (res)
      if (res.errno == 0) {
        this.cartList = res.data.cartList
        this.cartTotal = res.data.cartTotal
        this.result = []
        // 处理复选框
        this.cartList.map ((item) => {
          item.checked == 1? this.result.push (item.id): ''
        })
      }
    },
    // 编辑按钮
    editBtn () {
      this.isEditing = !this.isEditing
    },
    // 步进器按钮请求
    async stepperChange (item) {
      let goodsId = item.goods_id
      let id = item.id
      let number = item.number
      let productId = item.product_id
      const {data: res} = await reqStepperChange ({goodsId, productId, id, number})
      if (res.errno == 0) {
        this.cartList = res.data.cartList
        this.cartTotal = res.data.cartTotal
        this.result = []
        // 处理复选框
        this.cartList.map ((item) => {
          item.checked == 1? this.result.push (item.id): ''
        })
      }
    },
    // 删除商品
    async deleteGood (id) {
      let productIds = id.toString()
      const {data: res} = await reqDeleteGood (productIds)
      console.log(res)
      if (res.errno == 0) {
        this.cartList = res.data.cartList
        this.cartTotal = res.data.cartTotal
        this.result = []
        // 处理复选框
        this.cartList.map ((item) => {
          item.checked == 1? this.result.push (item.id): ''
        })
      }
    },
    onSubmit() {},
    onClickEditAddress() {},
  },
}
</script>

<style lang="less" scoped>
/deep/.van-checkbox__label{
    flex:1;
}
.van-checkbox-group{
    background-color: #fff; 
    padding-bottom: 1.4rem;
    .van-checkbox{
        padding:.1rem .15rem;
        border-bottom: 1px solid #ccc;
    }
}
.van-submit-bar{
    bottom:.5rem;
    border-bottom: 1px solid #ccc;
}
.van-stepper {
  text-align: right;
}
.van-button--square {
  height: 100%;
}
</style>
