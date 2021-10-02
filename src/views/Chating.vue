<template>
  <van-nav-bar :title="friend.nickName" left-arrow @click-left="back" />
  <van-cell-group class="chat_content">
    <van-cell v-for="(item, index) in messages" :key="index">
      <template #title>
        <van-row>
          <van-col :span="24">
            <span v-if="item.msgDirect == 1" class="chat_content_float">
              <b>我</b>
            </span>
            <span v-else class="chat_content_float"
              ><b>{{ friend.nickName }}</b></span
            >
          </van-col>
        </van-row>
      </template>
      <!-- <template #icon v-if="item.msgDirect == 0">
        <van-image :src="my.avtor" height="50" width="50" radius="10" />
      </template>
      <template #right-con v-if="item.msgDirect == 1">
        <van-image :src="friend.avtor" height="50" width="50" radius="10" />
      </template> -->
      <template #value>
        <van-row>
          <van-col :span="20">
            <span class="chat_content_float mes_back">{{ item.content }}</span>
            <span class="chat_content_float_right mes_back">{{
              item.receiveTime
            }}</span>
          </van-col>
        </van-row>
      </template>
    </van-cell>
  </van-cell-group>
  <van-sticky :offset-bottom="50" position="bottom">
    <van-field v-model="inputMes" placeholder="请输入...">
      <template #button>
        <van-button size="small" type="primary" @click="send">发送</van-button>
      </template>
    </van-field>
  </van-sticky>
</template>

<script>
import Api from "../utils/api";
import { encodeMessage, decodeMessage } from "../../json-module";
export default {
  data() {
    return {
      friend: {},
      my: {},
      myId:this.$route.query.myid,
      friendId:this.$route.query.friendId,
      friendName:this.$route.query.friendName,
      messages: [],
      inputMes: "",
      socket: "",
      sendMsg: {},
    };
  },
  created() {
    this.friend = {
      id: this.$route.query.friendId,
      name: this.$route.query.friendName,
    };
    this.$get(Api.getDetail + "?userId=" + this.$route.query.friendId).then(
      (resp) => {
        this.friend = resp.data;
      }
    );
    this.$get(Api.getDetail + "?userId=" + this.$route.query.myid).then(
      (resp) => {
        this.my = resp.data;
      }
    );
    this.init();
  },
  mounted() {
    // this.init();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket("ws://localhost:9999/ws");
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getWebSocketMsg;
      }
    },
    open() {
      console.log("socket连接成功");
      let registerMsg = {
        myId: this.myId,
        msgType: 6,
      };
      console.log("加入聊天");
      console.log(registerMsg);
      this.socket.send(encodeMessage(registerMsg));
    },
    error(e) {
      console.log("连接错误,cause:" + JSON.stringify(e));
      this.close();
    },
    close() {
      console.log("socket已经关闭");
    },
    send() {
      this.sendMsg = {
        myId: this.my.userId,
        myName: this.my.nickName,
        friendId: this.friend.userId,
        friendName: this.friend.nickName,
        content: this.inputMes,
        msgDirect: 1,
      };
      console.log("发送消息");
      console.log(this.sendMsg);
      this.socket.send(encodeMessage(this.sendMsg));
      this.inputMes = "";
    },
    getWebSocketMsg(msg) {
      if (typeof msg !== "undefined") {
        let reader = new FileReader();
        reader.readAsArrayBuffer(msg.data);
        reader.onload = () => {
          const buf = new Uint8Array(reader.result);
          let result = decodeMessage(buf);
          if (result.msgType === 6) {
            console.log("注册登录");
            console.log(result);
          } else {
            result.receiveTime = this.$moment(new Date()).format("YYYY-MM-DD");
            console.log("接收消息");
            console.log(result);
            this.messages.push(result);
          }
        };
      }
    },
  },
  unmounted() {
    // 销毁监听
    this.socket.onclose = this.close;
  },
};
</script>

<style>
.chat_content {
  min-height: 500px;
  height: auto !important;
  height: 100px;
  width: 100%;
  /* background:#FFF000; */
}
.chat_content_float {
  float: left;
}
.chat_content_float_right {
  float: right;
}
.mes_back {
  background: rgb(97, 190, 139);
  color: black;
}
</style>