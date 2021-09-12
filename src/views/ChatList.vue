<template>
  <div>
      <van-list
        v-model:loading="loading"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      ></van-list>
      <van-cell v-for="item in list" :key="item" :title="item" >
        <template #icon>
          <van-image width="50" height="50" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <!-- <van-icon name="search" class="search-icon" /> -->
        </template>
      </van-cell>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      list.value.push(1)
      list.value.push(2)
      list.value.push(3)
    };

    return {
      list,
      onLoad,
      loading,
      finished,
    };
  },
};
</script>

<style scope>
  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
</style>