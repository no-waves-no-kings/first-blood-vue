<template>
  <div class="menu-manager">
    <div class="query-form">
      <el-form ref="menuQuery" :model="menu" :inline="true">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menu.menuName" type="text" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="menu.menuState" placeholder="请选择菜单状态">
            <el-option label="全部"></el-option>
            <el-option label="正常" :value="0"></el-option>
            <el-option label="停用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset('menuQuery')">重置</el-button>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDelete">批量删除</el-button>
      </div>
      <el-table :data="menus" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :width="column.width"
          :prop="column.prop"
          :label="column.label"
          :hidden="column.hidden"
        />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        menu: { menuState: 0 },
        handleQuery() {
          _getMenuList();
        },
      });
      const menuTable = reactive({
        menus: [],
        columns: [
          {
            prop: '_id',
            label: '菜单ID',
            hidden: false,
          },
          {
            prop: 'menuName',
            label: '菜单名称',
          },
          {
            prop: 'path',
            label: '路径',
          },
        ],
        handleCreate() {},
        handlePatchDelete() {},
        handleEdit(row) {
          console.log(row);
        },
      });
      const menuForm = reactive({});
      onMounted(() => {
        _getMenuList();
      });
      const handleReset = (form) => {
        proxy.$refs[form].resetFields();
      };
      const _getMenuList = async () => {
        let menuList = await proxy.$api.getMenuList({
          ...menuQuery.menu,
        });
        menuTable.menus = menuList;
      };
      return {
        ...toRefs(menuQuery),
        ...toRefs(menuTable),
        ...toRefs(menuForm),
        handleReset,
      };
    },
  };
</script>

<style scoped></style>
