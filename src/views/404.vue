<template>
  <div class="exception-wrapper">
    <img src="@/assets/images/404.jpeg" />
    <el-button class="btn-home" @click="goHome">回首页</el-button>
  </div>
</template>

<script>
  export default {
    name: '404',
    methods: {
      goHome() {
        this.$router.push('/');
      },
    },
  };
</script>

<style lang="scss">
  .exception-wrapper {
    position: relative;
    img {
      width: 100%;
      height: 100vh;
    }
    .btn-home {
      position: fixed;
      bottom: 100px;
      left: 50%;
      margin-left: -34px;
    }
  }
</style>
