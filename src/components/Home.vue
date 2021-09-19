<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'no-extend' : 'extend']">
      <div class="menu-header">
        <img src="../assets/logo.png" class="logo" />
        <text>Manager</text>
      </div>
      <div class="menu">
        <el-menu
          :collapse="isCollapse"
          :uniqueOpened="true"
          default-active="1"
          background-color="#001529"
          text-color="#ffffff"
          router
          class="nav-menu"
        >
          <el-sub-menu index="1">
            <template #title>
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">菜单管理</el-menu-item>
            <el-menu-item index="1-3">部门管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <template #title>审批管理</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread">
          <div class="expand-btn" @click="onFold">
            <i class="el-icon-s-fold"></i>
          </div>
          <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">系统管理</a></el-breadcrumb-item>
              <el-breadcrumb-item>欢迎</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="user-info">
          <el-badge is-dot class="notice"><i class="el-icon-bell"></i></el-badge>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">俊阳<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
    data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      onFold() {
        this.isCollapse = !this.isCollapse;
      },
      handleCommand(command) {},
    },
  };
</script>

<style lang="scss">
  .basic-layout {
    position: relative;
    display: flex;
    flex-direction: row;
    .nav-side {
      //position: fixed;
      width: 200px;
      height: 100vh;
      background-color: #001529;
      overflow-y: auto;
      overflow-x: hidden;
      color: #fff;
      display: flex;
      flex-direction: column;
      transition: width 0.5s;
      .menu-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        font-size: 18px;
        .logo {
          width: 32px;
          height: 32px;
          margin: 0 16px;
        }
      }
      &.extend {
        width: 200px;
      }
      &.no-extend {
        width: 64px;
      }
      .menu {
        //height: 100%;
      }
      .nav-menu {
        border-right: none;
        height: 100%;
      }
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
        .bread {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 18px;
          .expand-btn {
            margin-right: 20px;
          }
        }
        .user-info {
          .notice {
            margin-right: 20px;
          }
          .el-dropdown-link {
            cursor: pointer;
            color: #409eff;
          }
          .el-icon-arrow-down {
            font-size: 12px;
          }
        }
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
