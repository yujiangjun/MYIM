<template>
  <div>
    <van-nav-bar
      title="发现"
      left-arrow
      @click-left="back"
    />
    <van-row>
      <van-col
        span="20"
        offset="2"
      >
        <van-cell-group title="基础信息">
          <van-cell>
            <template #icon>
              <van-image
                width="100"
                height="100"
                :src="userInfo.avtor"
              />
            </template>
            <template #title>
              <span class="my_name"><b>{{ userInfo.nickName }}</b></span>
            </template>
            <template #value>
              <van-image
                width="50"
                height="50"
                src="http://192.168.211.130:4545/qr1.png"
                @click="preView('http://192.168.211.130:4545/qr1.png')"
              />
            </template>
            <template #label>
              <span><b>IM号:{{ userInfo.userName }}</b></span>
            </template>
          </van-cell>
        </van-cell-group>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {ref} from 'vue'
import API from '../utils/api'
import { ImagePreview } from 'vant';

export default {
  setup(){
    const imagePre=ImagePreview.Component
    return{
      imagePre
    }
  },
  data(){
    return{
      myid:this.$route.query.myId,
      userInfo:ref({})
    }
  },
  created(){
    this.$get(API.getDetail,{
      userId:this.myid
    }).then(resp=>{
      this.userInfo=resp.data
    })
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    preView(src){
      let images=[]
      images.push(src)
      ImagePreview({
        images:images,
        closeable:true
      })
    }
  }
}
</script>

<style scope>
.my_name{
  font-size: 20px;
}
</style>