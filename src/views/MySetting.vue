<template>
  <van-nav-bar
    title="发现"
    left-arrow
    @click-left="back"
  />
</template>

<script>
export default {
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>