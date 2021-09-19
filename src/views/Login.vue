<template>
  <div class="login-wrapper">
    <div class="model">
      <el-form>
        <div class="title">first-blood</div>
        <el-form-item>
          <el-input type="text" placeholder="请输入姓名" prefix-icon="el-icon-user" />
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" />
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup></script>

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
