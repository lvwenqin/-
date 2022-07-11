<template>
  <div>
    <!-- 导航菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item disabled title='综合' />
      <van-dropdown-item @change='priceChange' title='价格' v-model="value2" :options="option2" />
      <van-dropdown-item @change='categoryChange' title='分类' v-model="categoryValue" :options="filterCategory" />
    </van-dropdown-menu>
    <!-- products组件 搜索为空empty组件互斥展示-->
    <van-empty image="search" description="搜索不到该商品" v-if='goodsList.length===0'/>
    <Products :goodsList='goodsList' v-else></Products>
  </div>
</template>

<script>
import Products from "./Products.vue"

export default {
  name: "SearchProducts",
  props: ['filterCategory', 'goodsList'],
  components: {
    Products,
  },
  data() {
    return {
      value2: 'asc',
      categoryValue: '0', // 是下拉项的哪一个value值，就代表被勾上
      option2: [
        { text: '价格由高到低', value: 'desc' },
        { text: '价格由低到高', value: 'asc' },
      ],
    };
  },
  beforeUpdate () {
    // 遍历filterCategory 看哪一项checked为true，就把this.categoryValue 改成他的value值，就被勾上
    this.filterCategory.map (item => {
      if (item.checked) {
        this.categoryValue = item.value
      }
    })
  },
  methods: {
    // 分类事件改变
    categoryChange (value) {
      this.$emit ('categoryChange', value)
    },
    // 价格改变事件
    priceChange (value) {
      this.$emit ('priceChange', value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
