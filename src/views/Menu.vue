<template>
  <div class="menu-manager">
    <div class="query-form">
      <el-form ref="menuQuery" :model="menu" :inline="true">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menu.menuName" type="text" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="menu.menuState" placeholder="请选择菜单状态">
            <el-option label="正常" :value="1"></el-option>
            <el-option label="停用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset('menuQuery')">重置</el-button>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </div>
      <el-table :data="menus" style="width: 100%" row-key="_id">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :width="column.width"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
        />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button size="mini" @click="handleAdd(scope.row)">新增</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              title="你确定删除此菜单?"
              @confirm="handleDelete"
            >
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="menu-modal">
      <el-dialog v-model="showModal" :title="menuForm._id ? '菜单编辑' : '菜单添加'" @close="handleCancel">
        <el-form
          ref="menuModal"
          :model="menuForm"
          :rules="rules"
          label-position="right"
          label-width="100px"
          size="mini"
        >
          <el-form-item label="父级菜单" prop="parentId">
            <el-cascader
              v-model="menuForm.parentId"
              :options="menus"
              :props="{ checkStrictly: true, label: 'menuName', value: '_id' }"
              placeholder="请选择父菜单"
              clearable
            />
            <span>不选,则直接创建一级菜单</span>
          </el-form-item>
          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="menuForm.menuType">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="menuForm.menuName" type="text" placeholder="请输入菜单名称" />
          </el-form-item>
          <div v-if="menuForm.menuType === 1">
            <el-form-item label="菜单图标" prop="icon">
              <el-input v-model="menuForm.icon" type="text" placeholder="请输入菜单图标" />
            </el-form-item>
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="menuForm.path" type="text" placeholder="请输入菜单路径" />
            </el-form-item>
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="menuForm.component" type="text" placeholder="请输入菜单组件" />
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="菜单标识" prop="menuCode">
              <el-input v-model="menuForm.menuCode" type="text" placeholder="请输入菜单代码" />
            </el-form-item>
          </div>
          <el-form-item label="菜单状态" prop="menuState">
            <el-radio-group v-model="menuForm.menuState">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button size="mini" @click="handleCancel">取消</el-button>
          <el-button size="mini" type="primary" @click="handleSumbit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { reactive, toRefs, getCurrentInstance, onMounted } from 'vue';
  export default {
    name: 'Menus',
    setup() {
      const { proxy } = getCurrentInstance();
      const menuQuery = reactive({
        menu: { menuState: 1 },
        handleQuery() {
          _getMenuList();
        },
      });
      const menuTable = reactive({
        menus: [],
        columns: [
          {
            prop: 'menuName',
            label: '菜单名称',
            width: 250,
          },
          {
            prop: 'icon',
            label: '图标',
          },
          {
            prop: 'menuType',
            label: '菜单类型',
            formatter(row, column, value) {
              return {
                1: '菜单',
                2: '按钮',
              }[value];
            },
          },
          {
            prop: 'menuCode',
            label: '权限标识',
          },
          {
            prop: 'path',
            label: '路由地址',
          },
          {
            prop: 'component',
            label: '组件路径',
          },
          {
            prop: 'menuState',
            label: '菜单状态',
            formatter(row, column, value) {
              return {
                1: '正常',
                2: '停用',
              }[value];
            },
          },
          {
            prop: 'createTime',
            label: '创建时间',
          },
        ],
        handleCreate() {
          _openModal();
        },
        handleAdd(row) {
          _openModal();
          menuModal.menuForm.parentId = [...row.parentId, row._id].filter((item) => item);
        },
        handleEdit(row) {
          proxy.$nextTick(() => Object.assign(menuModal.menuForm, row));
          _openModal();
        },
        async handleDelete(row) {
          try {
            await proxy.$api.deleteMenu({ menuIds: row._id });
            proxy.$message({ type: 'success', message: '删除菜单成功' });
            await _getMenuList();
          } catch (e) {
            proxy.$message({ type: 'error', message: '删除菜单失败' });
          }
        },
      });
      const menuModal = reactive({
        showModal: false,
        rules: {
          menuName: [
            {
              required: true,
              message: '请输入菜单名称',
              trigger: 'blur',
            },
            {
              min: 2,
              max: 10,
              message: '长度为2-10个字符',
              trigger: 'blur',
            },
          ],
        },
        menuForm: {
          menuState: 1,
          menuType: 1,
        },
        handleCancel() {
          handleReset('menuModal');
          menuModal.showModal = false;
          menuModal.menuForm = {
            menuState: 1,
            menuType: 1,
          };
        },
        handleSumbit(row) {
          proxy.$refs['menuModal'].validate(async (vaild) => {
            if (vaild) {
              try {
                await proxy.$api.saveMenu(menuModal.menuForm);
                proxy.$message({ type: 'success', message: '保存菜单成功' });
                handleReset('menuModal');
                await _getMenuList();
              } catch (e) {
                proxy.$message({ type: 'error', message: '保存菜单失败' });
              }
            }
          });
        },
      });
      onMounted(() => {
        _getMenuList();
      });
      const handleReset = (form) => {
        proxy.$refs[form].resetFields();
      };
      const _getMenuList = async () => {
        let menuList = await proxy.$api.getMenuList(menuQuery.menu);
        menuTable.menus = menuList;
      };
      const _openModal = () => {
        menuModal.showModal = true;
      };
      return {
        ...toRefs(menuQuery),
        ...toRefs(menuTable),
        ...toRefs(menuModal),
        handleReset,
      };
    },
  };
</script>

<style scoped></style>
