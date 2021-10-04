<template>
  <div>
    <van-nav-bar
      title="注册"
      left-arrow
      @click-left="back"
    />
    <van-tabs
      v-model:active="active"
      class="content"
    >
      <van-tab title="用户名注册">
        <van-row>
          <van-col span="24">
            <van-form
              class="register_form"
              @submit="register"
            >
              <van-cell-group
                inset
                class="register_form_group"
              >
                <van-field
                  v-model="user.username"
                  name="用户名"
                  label="用户名"
                  placeholder="用户名"
                  :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                  v-model="user.password"
                  type="password"
                  name="密码"
                  label="密码"
                  placeholder="密码"
                  class="register_form_field"
                  :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                  v-model="user.nickName"
                  type="text"
                  name="昵称"
                  label="昵称"
                  placeholder="昵称"
                  class="register_form_field"
                  :rules="[{ required: true, message: '请填写昵称' }]"
                />
              </van-cell-group>
              <div style="margin: 16px;">
                <van-button
                  round
                  block
                  type="primary"
                  native-type="submit"
                >
                  注册
                </van-button>
              </div>
            </van-form>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="手机注册">
        手机注册
      </van-tab>
    </van-tabs>
    <van-dialog
      v-model:show="showCountDown"
      :show-confirm-button="false"
      class-name="dialog"
    >
      <van-count-down
        time="5000"
        format="ss"
        class="dialog"
        @finish="goLogin"
      >
        <template #default="timeData">
          <span style="font-size:16px">5秒后跳转到登录</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </van-dialog>
  </div>
</template>
<script>
import API from '../utils/api'
export default {
    data(){
        return{
            active : 0,
            showCountDown:false,
            user: {
                username:'',
                password:'',
                nickName:''
            }
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
            },
        register(){
            console.log('注册')
            let params={
                userName:this.user.username,
                password:this.user.password,
                nickName:this.user.nickName
            }
            this.$post(API.register,params).then(()=>{
              this.showCountDown=true
              this.$toast('注册成功')
            })
        },
        goLogin(){
          this.showCountDown=false
          this.$router.push({path:'login'})
        }
    }
}
</script>
<style scoped>
.content{
    margin-top: 10px;
}
.register_form{
    margin-top: 100px;
}
.register_form_group{
    background-color: #ebedf0;
}
.register_form_field{
    margin-top: 10px;
}
.dialog{
  height: 150px;
}
</style>