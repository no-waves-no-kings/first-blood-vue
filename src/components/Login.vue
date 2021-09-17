<template>
  <div>
    <h1>登录页</h1>
    <el-button @click="goHome">去首页</el-button>
    <el-button @click="onLogin">登录</el-button>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { getCurrentInstance } from 'vue';

  const router = useRouter();
  const goHome = () => {
    router.push('/');
  };
  let { proxy } = getCurrentInstance();
  const onLogin = async (event) => {
    let newVar = await proxy.$request.get({
      url: '/login',
    });
    console.log(newVar);
  };
</script>

<style scoped></style>
