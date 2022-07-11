<template>
  <div>
    <van-row @click='openModel'>
      <van-col span="6">
        <img :src="avatarSrc" alt />
      </van-col>
      <van-col span="15">{{nickname}}</van-col>
      <van-col span="3">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <van-grid :column-num="3" square>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <!-- 登录窗口 -->
    <transition name="van-fade">
      <div class="login-model" v-show='isShowModel' >
        <div class="close-model" @click='isShowModel=!isShowModel'></div>
        <van-form @submit="onSubmit" class="login-form">
          <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </transition>
  </div>
</template>

<script>
import {reqGoLogin} from '@/request/api'
export default {
  data() {
    return {
      avatarSrc: require("../assets/avatar.png"),
      username: '',
      password: '',
      isShowModel: false,
      nickname: '用户登录/注册'
    }
  },
  created () {
    // 刷新的时候：组件创建就要判断用户有没有登录
    let token = localStorage.getItem ('token')
    if (token) {
      let userInfo = JSON.parse (localStorage.getItem ('userInfo'))
      this.nickname = userInfo.nickname
      this.avatarSrc = userInfo.avatar
    }
  },
  methods: {
    // 登录请求
    async onSubmit(values) {
      // console.log('submit', values);
      let username = values['用户名']
      let pwd = values['密码']
      const {data: res} = await reqGoLogin ({username, pwd})
      // console.log (res)
      if (res.errno == 0) {
        // 登录成功 拿到信息  提示框——本地存储token——关闭模态框——拿到的user信息填写到页面
        this.$toast.success ('登录成功')
        let token = res.data.token
        localStorage.setItem ('token', token)
        localStorage.setItem ('userInfo', JSON.stringify (res.data.userInfo))
        setTimeout (() => {
          this.isShowModel = !this.isShowModel
          this.nickname = res.data.userInfo.nickname
          this.avatarSrc = res.data.userInfo.avatar
        }, 1000)
        
      }
    },
    // 模态框展示与隐藏
    openModel () {
      // 判断是否登录，没有登录取反，登录什么也不做
      let token = localStorage.getItem ('token')
      if (token) {
        return
      } else {
        this.isShowModel = !this.isShowModel
      }
    }

  }
}
</script>
 
<style lang = "less" scoped>
.van-row {
  padding: 0.2rem 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 0.7rem;
    font-size: 0.18rem;
    img {
      width: 0.7rem;
      border-radius: 50%;
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.login-model {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  .login-form {
    width: 90%;
    background-color: #fff;
    padding-bottom: .2rem;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -45%;
  }
  .close-model {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>