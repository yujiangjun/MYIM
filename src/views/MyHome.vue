<template>
  <div>
    <router-view />

    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" :to="'/chatList?myId='+myId">聊天</van-tabbar-item>
      <van-tabbar-item icon="friends-o" :to="'/myFriends?myId='+myId">好友</van-tabbar-item>
      <van-tabbar-item icon="search" :to="'/myLife?myId='+myId">发现</van-tabbar-item>
      <van-tabbar-item icon="setting-o" :to="'/mySetting?myId='+myId">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myId: null,
      active: 0
    }
  },
  created() {
    this.active = 0
    this.myId = this.$route.query.myId
  }
}
</script>
<style scoped>

</style>
