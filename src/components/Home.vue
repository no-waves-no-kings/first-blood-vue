<template>
  <div class="basic-layout">
    <div class="nav-side"></div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread">面包屑</div>
        <div class="user-info">用户</div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '首页',
  };
</script>

<style lang="scss">
  .basic-layout {
    position: relative;
    display: flex;
    flex-direction: row;
    .nav-side {
      width: 200px;
      height: 100vh;
      background-color: #001529;
      overflow-y: auto;
      color: #fff;
      transition: width 0.5s;
    }
    .content-right {
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      .nav-top {
        height: 50px;
        width: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
      }
      .wrapper {
        background-color: #eef0f3;
        padding: 20px;
        width: 100%;
        height: calc(100vh - 50px);
        .main-page {
          width: 100%;
          height: 100%;
          background-color: #ffffff;
        }
      }
    }
  }
</style>
