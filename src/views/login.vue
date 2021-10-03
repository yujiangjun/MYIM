<template>
  <div>
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
          提交
        </van-button>
      </div>
    </van-form>
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
      console.log(this.username)
      console.log(this.password)
      console.log(Api.login)
      const params = {
        userName: this.username,
        password: this.password
      }
      this.$post(Api.login, params).then((resp) => {
        console.log(JSON.stringify(resp))
        this.$router.push({
          path: '/myHome',
          query: { myId: resp.data.userId }
        })
      })
    }
  }
}
</script>
