<template>
  <div class="dept-wrapper">
    <div class="query-form">
      <el-form ref="deptForm" v-model="dept" inline>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="dept.deptName" type="text" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
          <el-button size="mini" @click="handleReset('deptForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">创建</el-button>
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
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              title="你确定删除此部门?"
              cancel-button-text="取消"
              confirm-button-text="确定"
              @confirm="handleDelete(scope)"
            >
              <template #reference>
                <el-button type="danger" size="mini">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dept-modal">
      <el-dialog :modal="showModal">
        <el-form>
          <el-form-item label="上级部门"></el-form-item>
          <el-form-item label="部门名称"></el-form-item>
          <el-form-item label="负责人"></el-form-item>
          <el-form-item label="负责人邮箱"></el-form-item>
        </el-form>
        <template #footer>
          <el-button>取消</el-button>
          <el-button>确定</el-button>
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
            prop: 'createTime',
            label: '创建时间',
            formatter: function (row, column, value) {
              return getBarYMDHMS(value);
            },
          },
          {
            prop: 'updateTime',
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
        handleDelete(row) {},
      });
      const deptModal = reactive({
        showModal: false,
        deptForm: {},
      });
      onMounted(() => {
        _getDeptList();
      });
      const _getDeptList = async () => {
        let depts = await proxy.$api.getDeptList(deptQuery.dept);
        deptTable.depts = depts;
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
