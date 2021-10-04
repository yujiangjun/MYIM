<template>
  <van-nav-bar
    title="发现"
    left-arrow
    @click-left="back"
  />
  <van-cell-group>
    <van-row justify="start">
      <van-col span="8">
        <van-cell
          title="朋友圈"
          @click="click"
        >
          <template #icon>
            <svg
              class="icon icon_size"
              aria-hidden="true"
            >
              <use xlink:href="#icon-shejiaotubiao-02" />
            </svg>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-row justify="start">
      <van-col span="8">
        <van-cell
          title="扫一扫"
          @click="click"
        >
          <template #icon>
            <svg
              class="icon icon_size"
              aria-hidden="true"
            >
              <use xlink:href="#icon-saoyisao" />
            </svg>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-row justify="start">
      <van-col span="8">
        <van-cell
          title="看一看"
          @click="click"
        >
          <template #icon>
            <svg
              class="icon icon_size"
              aria-hidden="true"
            >
              <use xlink:href="#icon-kanyikan" />
            </svg>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-row justify="start">
      <van-col span="8">
        <van-cell
          title="搜一搜"
          @click="click"
        >
          <template #icon>
            <svg
              class="icon icon_size"
              aria-hidden="true"
            >
              <use xlink:href="#icon-souyisou" />
            </svg>
          </template>
        </van-cell>
      </van-col>
    </van-row>

    <van-row justify="start">
      <van-col span="8">
        <van-cell
          title="我的收藏"
          @click="click"
        >
          <template #icon>
            <svg
              class="icon icon_size"
              aria-hidden="true"
            >
              <use xlink:href="#icon-wodeshoucang" />
            </svg>
          </template>
        </van-cell>
      </van-col>
    </van-row>
  </van-cell-group>
</template>
<script>
import { Toast } from "vant";
export default {
  methods: {
    back(){
      this.$router.go(-1)
    },
    click() {
      Toast("正在开发中。。。");
    },
  },
};
</script>

<style scope>
.icon_size {
  font-size: 26px;
}
.row{
  background: rgba(234, 237, 240, 0.671);
}
</style>