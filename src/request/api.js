import request from "./request";

// 首页数据
export const reqGetHomeList = () => request ({url: '/index/index', method: 'get'})

// search 历史记录
export const reqGetSearchPopupData = () => request ({url: '/search/index', method: 'get'})

// search 实时搜索获取文本
export const reqGetSearchTipsListData = params => request.get ('/search/helper',{params})

//  search 搜索商品列表
export const reqGetSearchGoodsListData = params => request.get ('/goods/list',{params})

// search 清除搜索历史记录
export const reqClearHistory = () => request ({url: '/search/clearhistory', method: 'post'})

// 登录请求
export const reqGoLogin = (data) => request ({url: '/auth/loginByWeb', method: 'post', data})

// 产品详情请求product---productDetail
export const reqGetGoodsDetail = (id) => request ({url: `/goods/detail/?id=${id}`, method: 'get'})

// 产品详情页相关产品请求productDetail
export const reqGetGoodsRelated = (id) => request ({url: `/goods/related/?id=${id}`, method: 'get'})

// 购物栏购物车数量
export const reqGetGoodsCount = () => request ({url: '/cart/goodscount', method: 'get'})

// 加入购物车
export const reqAddProductToCart = ({goodsId, productId,number}) => request ({url: '/cart/add', method: 'post', data: {goodsId, productId,number}})

// 获取购物车数据
export const reqGetCartListData = () => request ({url: '/cart/index', method: 'get'})

// 购物车点击每一项切换选中状态
export const reqChangeGoodChecked = ({isChecked, productIds}) => request ({url: '/cart/checked', method: 'post', data: {isChecked, productIds}})

// 购物车步进器
export const reqStepperChange = ({goodsId, productId, id, number}) => request ({url: '/cart/update', method: 'post', data: {goodsId, productId, id, number}})

// 删除商品
// export const reqDeleteGood = params => request.post ( '/cart/delete', params)
export const reqDeleteGood = (productIds) => request ({url: '/cart/delete',method: 'post', data: { productIds}} )

//-----------------------------------
// 专题请求
export const reqGetTopicList = ({page, size}) => request ({url: '/topic/list', method: 'get', params: {page, size}})

// 分类请求
export const reqGetCategoryList = () => request ({url: '/catalog/index', method: 'get'})

// 当前分类请求
export const reqGetCurrentCategory = (id) => request ({url: `/catalog/current/?id=${id}`, method: 'get'})