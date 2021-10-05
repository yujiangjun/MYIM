<template>
  <div>
    <van-nav-bar
      title="添加好友"
      left-arrow
      @click-left="back"
    />
    <van-row>
      <van-col :span="24">
        <van-tabs v-model:active="tagId">
          <van-tab title="好友">
            <van-row>
              <van-col span="24">
                <van-field
                  v-model="imNumber"
                  type="digit"
                  label="IM号"
                  @update:model-value="updateImNo"
                />
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <van-button
                  
                  round
                  type="primary"
                  style="width:90%"
                  :disabled="enableAddUser"
                  @click="addUser"
                >
                  添加好友
                </van-button>
              </van-col>
            </van-row>
          </van-tab>
          <van-tab title="群聊">
            <van-row>
              <van-col span="24">
                <van-field
                  v-model="groupNumber"
                  type="digit"
                  label="群组号"
                />
              </van-col>
            </van-row>
            <van-row>
              <van-col span="24">
                <van-button
                  round
                  type="primary"
                  style="width:90%"
                >
                  加入群组
                </van-button>
              </van-col>
            </van-row>
          </van-tab>
        </van-tabs>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import API from '../utils/api'
export default {
    data(){
        return{
            imNumber:null,
            groupNumber:null,
            tagId:0,
            enableAddUser:true,
            chatType:{
                single:1,
                group:2
            },
            myid:this.$route.query.myid
        }
    },
    methods:{
        back () {
            this.$router.go(-1)
        },
        addUser(){
            console.log('添加好友')
            this.imNumber=null
            this.$get(API.addUser,{
                myId: this.myid,
                friendName:this.imNumber,
                chatType:this.chatType.single
            }).then((resp)=>{
                let code=resp.code
                if(code!=200){
                    this.$toast.fail(resp.message)
                }else{
                    this.$toast.success('已向对方发送好友申请')
                }
            })
        },
        updateImNo(){
          if(this.imNumber){
            this.enableAddUser=false
          }else{
            this.enableAddUser=true
          }
        }
    }
}
</script>