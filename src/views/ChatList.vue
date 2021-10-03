<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    />
    <van-swipe-cell v-for="item in list" :key="item" @click="goChat(item)">
      <van-cell :title="item.friendName" :value="item.content">
        <template #icon>
          <van-image width="50" height="50" :src="item.friendAvtor" />
          <!-- <van-icon name="search" class="search-icon" /> -->
        </template>
      </van-cell>
      <template #right>
        <van-button square type="danger" text="删除" @click="deleteRecord(item)"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { ref } from 'vue'
import API from '../utils/api'
export default {
  data () {
    return {
      list: ref([]),
      loading: ref(false),
      finished: ref(false),
      myId: this.$route.query.myId
    }
  },
  methods: {
    onLoad () {
      this.$get(API.getMyChatList + '?myUserId=' + this.$route.query.myId)
        .then(res => {
          this.list = res.data
          console.log(res.data)
          this.loading = false
          this.finished = true
        })
    },
    deleteRecord (item) {
      const req = {
        userId: this.myId,
        recordId: item.id
      }
      this.$post(API.deleteMyChat, req)
        .then(() => {
          this.$toast('删除成功')
          this.onLoad()
        })
    },
    goChat (item) {
      this.$router.push({ path: 'chating', query: { myid: this.myId, friendId: item.friendId, friendName: item.friendName }})
    }
  }
}
</script>

<style scope>
  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
</style>
