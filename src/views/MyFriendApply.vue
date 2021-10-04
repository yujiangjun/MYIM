<template>
  <div>
    <van-nav-bar
      title="好友申请"
      left-arrow
      @click-left="back"
    />
    <van-row>
      <van-col span="24">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="item in list"
            :key="item"
            center
            :label="'申请时间:'+item.applyTime"
          >
            <template #icon>
              <van-image
                :src="item.friendAvtor"
                height="50"
                width="50"
                radius="10"
              />
            </template>
            <template #title>
              <span class="name_class">{{ item.friendNickName }}</span>
            </template>
            <template #value>
              <van-button type="primary" round size="small" @click="pass(item)" :disabled="item.status">同意</van-button>
              <van-button type="warning" round size="small" @click="reject(item)" :disabled="item.status">拒绝</van-button>
            </template>
          </van-cell>
        </van-list>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import API from '../utils/api'
// import {get} from '../utils/http'
import {ref} from 'vue'
export default {
     setup() {
        const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    // const onLoad = () => {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       list.value.push(list.value.length + 1);
    //     }

    //     // 加载状态结束
    //     loading.value = false;

    //     // 数据全部加载完成
    //     if (list.value.length >= 40) {
    //       finished.value = true;
    //     }
    //   }, 1000);
    // };

    return {
      list,
      loading,
      finished,
    };
  },
  data(){
      return{
          myid:this.$route.query.myid,
      }
  },
  methods:{
      back(){
        this.$router.go(-1)
      },
      onLoad(){
          this.loading=false
          this.$get(API.getMyFriendApplyRecord,{
              myUserId:this.myid
          }).then((resp)=>{
              this.loading=true
              this.finished=true
              this.list=resp.data
              console.log('接收数据')
              console.log(this.list)
          })
      },
      pass(item){
          this.$get(API.passAddFriend,{
              recordId:item.recordId
          }).then(resp=>{
              if(resp.code!==200){
                  this.$toast.fail(resp.message)
              }else{
                item.status=1;
              }
          })
      },
      reject(item){
          this.$get(API.passAddFriend,{
              recordId:item.recordId
          }).then(resp=>{
              if(resp.code!==200){
                  this.$toast.fail(resp.message)
              }else{
                item.status=2;
              }
          })
      }
  }
}
</script>