<template>
  <div>
    <div style="height:300px"></div>
    <van-form @submit="login">
      <van-cell-group inset>
        <van-field
          v-model="username"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="password"
          label="密码"
          type="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <van-row>
      <van-col span="10" offset="2">
        <a class="login_a">忘记密码</a>
      </van-col>
      <van-col span="10" offset="2">
        <a class="login_a" @click="go_register">注册</a>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Api from '../utils/api'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const params = {
        userName: this.username,
        password: this.password
      }
      this.$post(Api.login, params).then((resp) => {
        this.$router.push({
          path: '/myHome',
          query: { myId: resp.data.userId }
        })
      })
    },
    go_register(){
      this.$router.push({path:'userRegister'})
    }
  }
}
</script>
<style scoped>
.login_a{
  font-size: 14px;
  font-weight: 100;
  color: #1989fa !important;
}
</style>