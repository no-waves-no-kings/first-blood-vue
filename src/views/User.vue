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
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDelete">批量删除</el-button>
      </div>
      <el-table :data="users" style="width: 100%; height: 100%" @selection-change="onSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :width="column.width"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.fomatter"
        >
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
      <el-dialog v-model="showModal" title="新增用户" center>
        <el-form ref="addUserForm" :model="userForm">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="userEmail">
            <el-input v-model="userForm.userEmail"></el-input>
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
  import { ref, reactive, getCurrentInstance, onMounted } from 'vue';
  export default {
    name: 'User',
    setup() {
      const { proxy } = getCurrentInstance();
      const columns = ref([]);
      const users = ref([]);
      const user = reactive({
        state: 1,
      });
      const userForm = reactive({});
      const checkedUserIds = ref([]);
      const showModal = ref(false);
      let pager = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      });
      columns.value = [
        {
          prop: 'userId',
          label: '用户ID',
        },
        {
          prop: 'userName',
          label: '用户名',
        },
        {
          prop: 'role',
          label: '角色',
          fomatter(row, column, value) {
            return {
              0: '管理员',
              1: '普通用户',
            }[value];
          },
        },
        {
          prop: 'state',
          label: '在职状态',
          fomatter(row, column, value) {
            return {
              1: '在职',
              2: '离职',
              3: '试用期',
            }[value];
          },
        },
        {
          prop: 'createTime',
          label: '创建时间',
        },
        {
          prop: 'lastLoginTime',
          label: '上次登录时间',
        },
      ];
      onMounted(() => {
        getUserList();
      });
      const onSelectionChange = (selection) => {
        let map = selection.map((user) => user.userId);
        checkedUserIds.value = map;
      };
      const getUserList = async () => {
        let { list, page } = await proxy.$api.getUserList({
          ...user,
          ...pager,
        });
        users.value = list;
        pager.total = page.total;
      };
      const handleQuery = () => {
        this.getUserList();
      };
      const handleReset = () => {
        proxy.$refs['form'].resetFields();
      };
      const handleCurrentChange = (curPage) => {
        pager.pageNum = curPage;
        this.getUserList();
      };
      const handleDelete = (row) => {
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
              proxy.$message({ type: 'success', message: '删除成功!' });
            } catch (e) {
              proxy.$message({ type: 'error', message: '删除失败!' });
            }
          });
      };
      const handlePatchDelete = async () => {
        if (checkedUserIds.value.length <= 0) {
          proxy.$message({ type: 'error', message: '请选择删除的用户!' });
        }
        try {
          let res = await proxy.$api.deleteUser({
            userIds: checkedUserIds,
          });
          if (res.nModified > 0) {
            proxy.$message({ type: 'success', message: '删除成功!' });
          } else {
            proxy.$message({ type: 'error', message: '删除失败!' });
          }
        } catch (e) {
          proxy.$message({ type: 'error', message: '删除失败!' });
        }
      };
      const handleCreate = () => {
        showModal.value = true;
      };
      const handleCancel = () => {
        showModal.value = false;
      };
      const handleSubmit = () => {
        showModal.value = false;
      };
      return {
        user,
        columns,
        users,
        getUserList,
        pager,
        handleQuery,
        handleReset,
        handleCurrentChange,
        handleDelete,
        handlePatchDelete,
        onSelectionChange,
        checkedUserIds,
        showModal,
        handleCreate,
        userForm,
        handleCancel,
        handleSubmit,
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
