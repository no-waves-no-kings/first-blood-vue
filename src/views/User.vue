<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form ref="form" :model="user" :inline="true">
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
            <el-option label="离职" :value="2"></el-option>
            <el-option label="试用期" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button v-has="'user-add'" type="primary" @click="handleCreate">新增</el-button>
        <el-button v-has="'user-export'" @click="handleExport">导出</el-button>
        <el-button v-has="'user-patch-delete'" type="danger" @click="handlePatchDelete">批量删除</el-button>
      </div>
      <el-table :data="users" style="width: 100%; height: 100%" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :width="column.width"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button v-has="'user-edit'" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-has="'user-delete'" size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pager.pageSize"
        :total="pager.total"
        class="pagination"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog v-model="showModal" :title="userForm.userId ? '用户编辑' : '用户新增'" @close="handleCancel">
        <el-form
          ref="addUserForm"
          :model="userForm"
          :rules="rules"
          label-position="right"
          label-width="100px"
          size="mini"
        >
          <el-input v-model="userForm.userId" type="hidden" />
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="userForm.userName" :disabled="userForm.userId" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="用户邮箱" prop="userEmail">
            <el-input v-model="userForm.userEmail" :disabled="userForm.userId" placeholder="请输入用户邮箱">
              <template #append>.com</template>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="userMobile">
            <el-input v-model="userForm.userMobile" placeholder="请输入用户邮箱" />
          </el-form-item>
          <el-form-item label="工作状态" prop="state">
            <el-select v-model="userForm.state" placeholder="请输入工作状态">
              <el-option :value="1" label="在职"></el-option>
              <el-option :value="2" label="离职"></el-option>
              <el-option :value="3" label="试用期"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位" prop="job"
            ><el-input v-model="userForm.job" placeholder="请输入岗位"
          /></el-form-item>
          <el-form-item label="系统角色" prop="roleList">
            <el-select v-model="userForm.roleList" multiple placeholder="请输入系统角色" style="width: 100%">
              <el-option v-for="role in roles" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="deptId">
            <el-cascader
              v-model="userForm.deptId"
              placeholder="请选择部门"
              :options="deptList"
              :props="{ checkStrictly: true, label: 'deptName', value: '_id' }"
              clearable
              style="width: 100%"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue';
  import { getBarYMDHMS } from '@/utils/date';
  import Export from '@/utils/export';
  export default {
    name: 'User',
    setup() {
      // 上下文代理对象
      const { proxy } = getCurrentInstance();
      // 用户查询模块
      const userQuery = reactive({
        user: { state: 1 },
        handleQuery() {
          userQuery.getUserList();
        },
        async getUserList() {
          let { list, page } = await proxy.$api.getUserList({
            ...userQuery.user,
            ...userTable.pager,
          });
          userTable.users = list;
          userTable.pager.total = page.total;
        },
      });
      // 用户列表模块
      const userTable = reactive({
        columns: [],
        users: [],
        checkedUserIds: [],
        checkedUser: [],
        pager: { pageNum: 1, pageSize: 10, total: 0 },
        onSelectionChange(selection) {
          let map = selection.map((user) => user.userId);
          userTable.checkedUserIds = map;
          userTable.checkedUser = selection;
        },
        handleCurrentChange(curPage) {
          userTable.pager.pageNum = curPage;
          userTable.getUserList();
        },
        async handleEdit(row) {
          // let user = await proxy.$api.getUserById(row.userId);
          proxy.$nextTick(() => {
            Object.assign(userModal.userForm, row);
          });
          userModal.showModal = true;
        },
        handleDelete(row) {
          proxy
            .$confirm('此操作将永久删除用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
            .then(async () => {
              try {
                await proxy.$api.deleteUser({
                  userIds: [row.userId],
                });
                await userQuery.getUserList();
                proxy.$message({ type: 'success', message: '删除成功!' });
              } catch (e) {
                proxy.$message({ type: 'error', message: '删除失败!' });
              }
            });
        },
        async handlePatchDelete() {
          if (userTable.checkedUserIds.length <= 0) {
            proxy.$message({ type: 'error', message: '请选择删除的用户!' });
            return;
          }
          try {
            let res = await proxy.$api.deleteUser({
              userIds: userTable.checkedUserIds,
            });
            if (res.modifiedCount > 0) {
              proxy.$message({ type: 'success', message: '删除成功!' });
              await userQuery.getUserList();
            } else {
              proxy.$message({ type: 'error', message: '删除失败!' });
            }
          } catch (e) {
            proxy.$message({ type: 'error', message: '删除失败!' });
          }
        },
        handleExport() {
          if (userTable.checkedUser.length === 0) {
            proxy.$message.error('请选择要导出的用户信息');
            return;
          }
          let columnNames = [];
          let columnValues = [];
          userTable.columns.forEach((c) => {
            columnNames.push(c.label);
            columnValues.push(c.prop);
          });
          let map = userTable.users.map((u) =>
            userTable.columns.map((c) => {
              let value = u[c.prop];
              if (c.formatter) {
                value = c.formatter('', '', value);
              }
              return value;
            }),
          );
          Export(map, columnNames, '用户数据');
        },
      });
      // 用户form模块
      const userModal = reactive({
        showModal: false,
        userForm: { state: 3 },
        roles: [],
        rules: {
          userName: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur',
            },
            {
              min: 4,
              max: 32,
              message: '请输入4-32的用户名',
              trigger: 'blur',
            },
          ],
          userEmail: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'blur',
            },
            {
              pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}?)$/g,
              message: '请输入正确的邮箱',
              trigger: 'blur',
            },
          ],
          userMobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            {
              pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
              message: '请输入正确的手机号',
              trigger: 'blur',
            },
          ],
          deptId: [
            {
              required: true,
              message: '请选择部门',
              trigger: 'blur',
            },
          ],
        },
        deptList: [],
        handleCreate() {
          userModal.showModal = true;
        },
        handleCancel() {
          handleReset('addUserForm');
          userModal.userForm = { state: 3 };
          userModal.showModal = false;
        },
        handleSubmit() {
          proxy.$refs['addUserForm'].validate(async (valid) => {
            if (valid) {
              try {
                if (userModal.userForm.userId) {
                  await proxy.$api.updateUser(userModal.userForm);
                } else {
                  await proxy.$api.saveUser(userModal.userForm);
                }
                userModal.showModal = false;
                handleReset('addUserForm');
                proxy.$message({ type: 'success', message: '用户创建成功!' });
                await userQuery.getUserList();
              } catch (e) {
                proxy.$message.error(e);
              }
            }
          });
        },
        async getAllRoleList() {
          let roleList = await proxy.$api.getAllRoleList();
          userModal.roles = roleList;
        },
        async getDeptList() {
          let deptList = await proxy.$api.getDeptList();
          userModal.deptList = deptList;
        },
      });
      const handleReset = (form) => {
        proxy.$refs[form].resetFields();
      };
      userTable.columns = [
        {
          prop: 'userId',
          label: '用户ID',
          width: 100,
        },
        {
          prop: 'userName',
          label: '用户名',
          width: 100,
        },
        {
          prop: 'role',
          label: '角色',
          width: 100,
          formatter(row, column, value) {
            return {
              0: '管理员',
              1: '普通用户',
            }[value];
          },
        },
        {
          prop: 'state',
          label: '在职状态',
          width: 100,
          formatter(row, column, value) {
            return {
              1: '在职',
              2: '离职',
              3: '试用期',
            }[value];
          },
        },
        {
          prop: 'createdTime',
          label: '创建时间',
          width: 180,
          formatter(row, column, value) {
            if (value) return getBarYMDHMS(value);
          },
        },
        {
          prop: 'lastLoginTime',
          label: '上次登录时间',
          // width: 150,
          formatter(row, column, value) {
            if (value) return getBarYMDHMS(value);
          },
        },
      ];
      onMounted(() => {
        userQuery.getUserList();
        userModal.getAllRoleList();
        userModal.getDeptList();
      });
      return {
        ...toRefs(userQuery),
        ...toRefs(userTable),
        ...toRefs(userModal),
        handleReset,
      };
    },
  };
</script>

<style lang="scss">
  .user-manager {
    width: 100%;
    height: 100%;
  }
</style>
