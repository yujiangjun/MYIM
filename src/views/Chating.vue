<template>
  <van-nav-bar
  :title="friend.nickName"
  left-arrow
  @click-left="back"
/>
<van-cell-group class="chat_content">
  <van-cell v-for="(item,index) in messages" :key="index">
      <template #title>
          <span v-if="item.direct==0">
              {{my.nickName}}
          </span>
          <span v-else>{{friend.nickName}}</span>
      </template>
      <template #icon v-if="item.direct==0">
          <van-image :src="my.avtor" height="50" width="50" radius="10"/>
      </template>
      <template #right-con v-if="item.direct==1">
          <van-image :src="friend.avtor" height="50" width="50" radius="10"/>
      </template>
      <template #value>
          <span class="mes_back">{{item.value}}</span>
      </template>
  </van-cell>
</van-cell-group>
<van-sticky :offset-bottom="50" position="bottom">
  <van-field v-model="inputMes" placeholder="请输入..." >
      <template #button>
        <van-button size="small" type="primary" @click="send">发送</van-button>
        </template>
  </van-field>
</van-sticky>
</template>

<script>
import Api from '../utils/api'
export default {
    data(){
        return{
            friend:{},
            my:{},
            messages:[],
            inputMes:''
        }
    },
    created(){
        this.friend={
                id:this.$route.query.friendId,
                name:this.$route.query.friendName
        }
        this.$get(Api.getDetail+"?userId="+this.$route.query.friendId).then(resp=>{
            this.friend=resp.data
        })
        this.$get(Api.getDetail+"?userId="+this.$route.query.myid).then(resp=>{
            this.my=resp.data
        })

    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        send(){
            this.messages.push({
                value:this.inputMes,
                direct:1
            })
            this.inputMes=null
        }
    }
}
</script>

<style>
.chat_content{
    min-height:500px;
    height:auto !important;
    height:100px;
    width:30%;
    /* background:#FFF000; */
}
.mes_back{
    background: rgb(97, 190, 139);
    color: black;
}
</style>