<template>
  <div>
    <h1>这是欢迎页面</h1>
    <!--    <router-link to="/login">去登录</router-link>-->
    <el-button @click="goLogin">去登录</el-button>
  </div>
</template>

<script>
  export default {
    name: '欢迎',
    methods: {
      goLogin() {
        this.$router.push('/login');
      },
    },
  };
</script>

<style scoped></style>
