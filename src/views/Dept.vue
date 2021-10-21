<template>
  <div class="dept-wrapper">
    <div class="query-form">
      <el-form ref="deptQuery" v-model="dept" inline>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="dept.deptName" type="text" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
          <el-button size="mini" @click="handleReset('deptQuery')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button v-has="'dept-create'" type="primary" @click="handleCreate">创建</el-button>
      </div>
      <el-table :data="depts" row-key="_id" style="width: 100%">
        <el-table-column
          v-for="column in columns"
          :key="column._id"
          :width="column.width"
          :formatter="column.formatter"
          :prop="column.prop"
          :label="column.label"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-has="'dept-edit'" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              title="你确定删除此部门?"
              cancel-button-text="取消"
              confirm-button-text="确定"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button v-has="'dept-delete'" type="danger" size="mini">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dept-modal">
      <el-dialog v-model="showModal" :title="deptForm._id ? '部门编辑' : '部门新增'" @close="handleCancel">
        <el-form ref="deptModal" :model="deptForm" label-position="right" label-width="100px">
          <el-form-item label="上级部门" prop="parentId">
            <el-cascader
              v-model="deptForm.parentId"
              :options="depts"
              :props="{ children: 'children', value: '_id', label: 'deptName' }"
              placeholder="请选择上级部门"
              style="width: 100%"
              :show-all-levels="true"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="deptForm.deptName" type="text" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="负责人" prop="userId">
            <el-select
              v-model="deptForm.userId"
              placeholder="请选择负责人"
              style="width: 100%"
              @change="handleSelectChange"
            >
              <el-option
                v-for="user in userSelect"
                :key="user.userId"
                :label="user.userName"
                :value="`${user.userId}/${user.userName}/${user.userEmail}`"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="负责人邮箱" prop="userEmail">
            <el-input v-model="deptForm.userEmail" type="text" disabled />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button size="mini" @click="handleCancel">取消</el-button>
          <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue';
  import { getBarYMDHMS } from '../utils/date';

  export default {
    name: 'Dept',
    setup() {
      const { proxy } = getCurrentInstance();
      const deptQuery = reactive({
        dept: {
          deptName: '',
        },
        handleQuery() {
          _getDeptList();
        },
      });
      const deptTable = reactive({
        depts: [],
        checkedMenuIds: [],
        columns: [
          {
            prop: 'deptName',
            label: '部门名称',
          },
          {
            prop: 'userName',
            label: '负责人',
          },
          {
            prop: 'createdTime',
            label: '创建时间',
            formatter: function (row, column, value) {
              return getBarYMDHMS(value);
            },
          },
          {
            prop: 'updatedTime',
            label: '更新时间',
            formatter: function (row, column, value) {
              return getBarYMDHMS(value);
            },
          },
        ],
        handleCreate() {
          deptModal.showModal = true;
        },
        handleEdit(row) {
          deptModal.showModal = true;
          proxy.$nextTick(() => {
            Object.assign(deptModal.deptForm, row);
          });
        },
        async handleDelete(row) {
          try {
            await proxy.$api.deleteDept({ deptIds: [row._id] });
            await _getDeptList();
            proxy.$message.success('部门删除成功');
          } catch (e) {
            proxy.$message.error('部门删除失败');
          }
        },
      });
      const deptModal = reactive({
        showModal: false,
        deptForm: {
          parentId: [null],
        },
        userSelect: [],
        handleCancel() {
          deptModal.showModal = false;
          handleReset('deptModal');
          deptModal.deptForm = {};
        },
        handleSubmit() {
          proxy.$refs['deptModal'].validate(async (valid) => {
            if (valid) {
              try {
                if (deptModal.deptForm._id) {
                  await proxy.$api.updateDept(deptModal.deptForm);
                } else {
                  await proxy.$api.saveDept(deptModal.deptForm);
                }
                proxy.$message.success('部门保存成功');
                deptModal.handleCancel();
                await _getDeptList();
              } catch (e) {
                proxy.$message.error('部门保存失败');
              }
            }
          });
        },
        handleSelectChange(value) {
          let split = value.split('/');
          deptModal.deptForm.userId = split[0];
          deptModal.deptForm.userName = split[1];
          deptModal.deptForm.userEmail = split[2];
        },
      });
      onMounted(() => {
        _getDeptList();
        _getUserSelect();
      });
      const _getDeptList = async () => {
        let depts = await proxy.$api.getDeptList(deptQuery.dept);
        deptTable.depts = depts;
      };
      const _getUserSelect = async () => {
        let userList = await proxy.$api.getUserSelect();
        deptModal.userSelect = userList;
      };
      const handleReset = (form) => {
        proxy.$refs[form].resetFields();
      };
      return {
        ...toRefs(deptQuery),
        ...toRefs(deptTable),
        ...toRefs(deptModal),
        handleReset,
      };
    },
  };
</script>

<style scoped></style>
