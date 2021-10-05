<template>
  <div>
    <van-nav-bar
      title="我的好友"
      left-arrow
      @click-left="back"
    />
    <van-cell>
      <template #title>
        <span class="name_class">新朋友</span>
      </template>
      <template #value>
        <van-button
          type="primary"
          size="small"
          round
          @click="getMyFriendApply"
        >
          查看
        </van-button>
      </template>
      <template #icon>
        <van-icon 
          name="friends-o" 
          size="35"
        />
      </template>
    </van-cell>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in friends"
        :key="index"
        center
        @click="chat(item)"
      >
        <template #icon>
          <van-image
            :src="item.avtor"
            height="50"
            width="50"
            radius="10"
          />
        </template>
        <template #value>
          <span class="name_class">{{ item.nickName }}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import Api from "../utils/api";
export default {
  data() {
    return {
      friends: [],
      myId: this.$route.query.myId,
    };
  },
  created() {
    this.$get(Api.getMyFriends + "?myUserId=" + this.myId).then((resp) => {
      this.friends = resp.data;
    });
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    chat(item) {
      console.log(item);
      this.$router.push({
        path: "chating",
        query: {
          myid: this.myId,
          friendId: item.userId,
          friendName: item.nickName,
        },
      });
    },
    getMyFriendApply(){
      this.$router.push({path:'myFriendApply',query:{myid:this.myId}})
    }
  },
};
</script>

<style>
.name_class {
  font-size: 16px;
  margin-left: 2%;
}
.cell_row{
  display: flex;
  align-items: center;
}
</style>
