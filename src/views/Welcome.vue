<template>
  <div class="welcome-wrapper">
    <div class="content">
      <div class="sub-title">欢迎体验</div>
      <div class="title">后台管理系统</div>
      <!--      <div class="description">for u,homie</div>-->
    </div>
    <div class="img-container"></div>
  </div>
</template>

<script>
  export default {
    name: '欢迎',
    mounted() {},
    methods: {
      goLogin() {
        this.$router.push('/login');
      },
    },
  };
</script>

<style lang="scss">
  .welcome-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    .content {
      position: relative;
      bottom: 40px;
      .sub-title {
        font-size: 30px;
        line-height: 42px;
        color: #333;
      }
      .title {
        color: #409eff;
        font-size: 40px;
        line-height: 62px;
      }
      .description {
        font-size: 16px;
        color: #999;
        text-align: right;
      }
    }
    .img-container {
      margin-left: 105px;
      height: 438px;
      width: 371px;
      background: url('../assets/images/welcome.png');
    }
  }
</style>
