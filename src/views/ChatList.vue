<template>
  <div>
    <van-nav-bar
      title="聊天"
      left-arrow
      @click-left="back"
    />
    <van-row>
      <van-col :span="20">
        <van-field
          v-model="searchText"
          placeholder="请输入内容"
        />
      </van-col>
      <van-col
        :span="4" 
        style="display:flex;justify-content: start;align-items: center;"
      >
        <van-popover
          v-model:show="popoverShow"
          :actions="actionOptions"
          @select="onSelect"
        >
          <template #reference>
            <van-icon
              name="plus"
              size="20px"
            />
          </template>
        </van-popover>
      </van-col>
    </van-row>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    />
    <van-swipe-cell
      v-for="item in list"
      :key="item"
    >
      <van-cell
        :title="item.friendName"
        :value="item.content"
        @click="goChat(item)"
      >
        <template #icon>
          <van-image
            width="50"
            height="50"
            :src="item.friendAvtor"
          />
          <!-- <van-icon name="search" class="search-icon" /> -->
        </template>
      </van-cell>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="deleteRecord(item)"
        />
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
      myId: this.$route.query.myId,
      popoverShow: false,
      popClass:'pop-style',
      searchText:'',
      actionOptions: [
        { text: '添加好友', value: 0 },
        { text: '添加群组', value: 1 },
        { text: '扫一扫', value: 2 }
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    addAction () {
      this.popoverShow = true
    },
    onLoad () {
      this.$get(API.getMyChatList + '?myUserId=' + this.$route.query.myId)
        .then(res => {
          this.list = res.data
          console.log(res.data)
          this.loading = false
          this.finished = true
        })
    },
    onSelect (action,index) {
      if(index===1 || index===0) {
        this.$router.push({ path: 'addFriend', query: { myid: this.myId}})
      }
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
  .pop-style{
    z-index: 2003;
    position: absolute;
    left: 280px;
    top: 42px;
    margin: 0px;
  }
</style>
