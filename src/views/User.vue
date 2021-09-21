<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form :ref="user" :model="user" :inline="true">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" type="text"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户姓名" type="text"></el-input>
        </el-form-item>
        <el-form-item label="在职状态" prop="state">
          <el-select v-model="user.state" placeholder="请选择用户在职状态">
            <el-option label="所有" :value="0"></el-option>
            <el-option label="在职" :value="1"></el-option>
            <el-option label="离职" value="2"></el-option>
            <el-option label="试用期" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column fixed prop="date" label="日期" width="150"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data() {
      return {
        user: {},
      };
    },
  };
</script>

<style lang="scss"></style>
