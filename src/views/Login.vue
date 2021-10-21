<template>
  <div class="login-wrapper">
    <div class="model">
      <el-form ref="loginForm" :model="user" :rules="rules" status-icon>
        <div class="title">first-blood</div>
        <el-form-item prop="userName">
          <el-input v-model="user.userName" type="text" placeholder="请输入姓名" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="user.userPwd" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" />
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
  import { getCurrentInstance, reactive, ref } from 'vue';
  import Utils from '@/utils/utils';
  import Storage from '../utils/storage';
  const { proxy } = getCurrentInstance();

  const user = reactive({
    userName: '',
    userPwd: '',
  });
  const rules = ref({
    userName: [
      {
        required: true,
        message: '请输入姓名',
        trigger: 'blur',
      },
    ],
    userPwd: [
      {
        required: true,
        message: '请输入密码',
        trigger: 'blur',
      },
    ],
  });
  const login = () => {
    proxy.$refs.loginForm.validate(async (valid) => {
      if (valid) {
        try {
          let loginUser = await proxy.$api.userLogin(user);
          proxy.$message.success('登录成功');
          proxy.$store.commit('saveUserInfo', loginUser);
          await ayncLoadRoutes();
          proxy.$router.push('/');
        } catch (e) {
          console.log(e);
          proxy.$message.error(e);
        }
      }
    });
  };

  const ayncLoadRoutes = async () => {
    try {
      let userInfo = Storage.getItem('userInfo') || {};
      if (userInfo.token) {
        let { menuList } = await proxy.$api.getUserPermissionList();
        let routes = Utils.generateRoutes(menuList);
        const moudules = import.meta.glob('./*.vue');
        routes.map((route) => {
          route.component = moudules[`./${route.component}.vue`];
          proxy.$router.addRoute('home', route);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
</script>

<style lang="scss">
  .login-wrapper {
    background-color: #f9fcff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    .model {
      width: 500px;
      padding: 50px;
      border-radius: 4px;
      box-shadow: 0px 0px 10px 3px #c7c9cb4d;
      .title {
        font-size: 50px;
        line-height: 1.5;
        text-align: center;
        margin-bottom: 30px;
      }
      .btn {
        width: 100%;
      }
    }
  }
</style>
