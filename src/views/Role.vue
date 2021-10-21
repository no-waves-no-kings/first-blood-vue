<template>
  <div class="role-manager">
    <div class="query-form">
      <el-form ref="roleQuery" :model="role" :inline="true">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="role.roleName" type="text" placeholder="请输入角色名称" />
        </el-form-item>
        <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
        <el-button size="mini" @click="handleReset">重置</el-button>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button v-has="'role-create'" type="primary" @click="handleCreate">创建</el-button>
      </div>
      <el-table :data="roles">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :formatter="column.formatter"
          :width="column.width"
        ></el-table-column>
        <el-table-column label="操作" width="240">
          <template #default="scope">
            <el-button v-has="'role-edit'" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-has="'role-permission'" size="mini" type="primary" @click="handleOpenPermission(scope.row)"
              >设置权限</el-button
            >
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              title="你确定删除该角色吗?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button v-has="'role-delete'" type="danger" size="mini">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        :page-size="pager.pageSize"
        :total="pager.total"
        layout="prev,pager,next"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="role-modal">
      <el-dialog v-model="showModal" :title="roleForm._id ? '角色编辑' : '角色新建'" @close="handleCancel">
        <el-form ref="roleModal" :model="roleForm" :rules="rules" label-width="100px" label-position="right">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleForm.roleName" type="text" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="roleForm.remark" type="textarea" :rows="2" placeholder="请输入备注" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button size="mini" @click="handleCancel">取消</el-button>
          <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
        </template>
      </el-dialog>
    </div>
    <div class="permission-modal">
      <el-dialog v-model="showPermission" title="权限设置">
        <el-form label-width="100px" label-position="right">
          <el-form-item label="角色名称">
            {{ curRoleName }}
          </el-form-item>
          <el-form-item label="权限列表">
            <el-tree
              ref="tree"
              :data="menus"
              :props="{ label: 'menuName' }"
              show-checkbox
              default-expand-all
              node-key="_id"
              highlight-current
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button size="mini" @click="showPermission = false">取消</el-button>
          <el-button size="mini" type="primary" @click="handlePermissionSubmit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { reactive, getCurrentInstance, toRefs, onMounted } from 'vue';
  import { getBarYMDHMS } from '@/utils/date';

  export default {
    name: 'Role',
    setup() {
      const { proxy } = getCurrentInstance();
      const roleQuery = reactive({
        role: {},
        handleQuery() {
          _getRoleList();
        },
      });
      const roleTable = reactive({
        roles: [],
        pager: {
          pageNum: 1,
          pageSize: 10,
          total: 0,
        },
        actionMap: {},
        columns: [
          {
            prop: 'roleName',
            label: '菜单名称',
          },
          {
            prop: 'remark',
            label: '备注',
          },
          {
            prop: 'permissionList',
            label: '菜单列表',
            formatter(row, column, value) {
              const halfCheckedKeys = value.halfCheckedKeys || [];
              let names = [];
              halfCheckedKeys.map((key) => {
                if (key && roleTable.actionMap[key]) {
                  names.push(roleTable.actionMap[key]);
                }
              });
              return names.join(',');
            },
          },
          {
            prop: 'createdTime',
            label: '创建时间',
            formatter(row, column, value) {
              return getBarYMDHMS(value);
            },
          },
        ],
        handleCreate() {
          roleModal.showModal = true;
        },
        handleEdit(row) {
          proxy.$nextTick(() => Object.assign(roleModal.roleForm, row));
          roleModal.showModal = true;
        },
        handleOpenPermission(row) {
          permissionModal.showPermission = true;
          permissionModal.curRoleName = row.roleName;
          permissionModal.roleId = row._id;
          const { checkedKeys } = row.permissionList;
          setTimeout(() => {
            proxy.$refs['tree'].setCheckedKeys(checkedKeys);
          });
        },
        async handleDelete(row) {
          try {
            await proxy.$api.deleteRole({ roleIds: [row._id] });
            proxy.$message({
              type: 'success',
              message: '菜单删除成功',
            });
            await _getRoleList();
          } catch (e) {
            proxy.$message({
              type: 'error',
              message: '菜单删除失败',
            });
          }
        },
        handleCurrentChange(curPage) {
          roleTable.pager.pageNum = curPage;
          _getRoleList();
        },
      });
      const roleModal = reactive({
        showModal: false,
        roleForm: {},
        rules: {
          roleName: [
            {
              required: true,
              message: '请输入角色名称',
              trigger: 'blur',
            },
          ],
        },
        handleCancel() {
          handleReset('roleModal');
          roleModal.showModal = false;
          roleModal.roleForm = {};
        },
        handleSubmit() {
          proxy.$refs['roleModal'].validate(async (valid) => {
            if (valid) {
              try {
                if (roleModal.roleForm._id) {
                  await proxy.$api.updateRole(roleModal.roleForm);
                } else {
                  await proxy.$api.saveRole(roleModal.roleForm);
                }
                roleModal.handleCancel();
                await _getRoleList();
                proxy.$message({
                  type: 'success',
                  message: '创建菜单成功',
                });
              } catch (e) {
                proxy.$message({
                  type: 'error',
                  message: '创建菜单失败',
                });
              }
            }
          });
        },
      });
      const permissionModal = reactive({
        showPermission: false,
        curRoleName: '',
        roleId: '',
        menus: [],
        async handlePermissionSubmit() {
          let checkedNodes = proxy.$refs.tree.getCheckedNodes();
          let checkedKeys = [];
          let parentIds = [];
          checkedNodes.forEach((node) => {
            if (!node.children) {
              checkedKeys.push(node._id);
            } else {
              parentIds.push(node._id);
            }
          });
          let halfCheckedKeys = proxy.$refs.tree.getHalfCheckedKeys();
          await proxy.$api.updateRolePermission({
            roleId: permissionModal.roleId,
            checkedKeys,
            halfCheckedKeys: parentIds.concat(halfCheckedKeys),
          });
          proxy.$message.success('权限设置成功');
          permissionModal.showPermission = false;
          await _getRoleList();
        },
      });
      const _getRoleList = async () => {
        let { list, page } = await proxy.$api.getRoleList({
          ...roleQuery.role,
          ...roleTable.pager,
        });
        roleTable.roles = list;
        roleTable.pager.total = page.total;
      };
      const _getMenuList = async () => {
        let menuList = await proxy.$api.getMenuList();
        permissionModal.menus = menuList;
        _getActionMap(menuList);
      };
      const _getActionMap = (menus) => {
        let actionMap = {};
        const deep = (arr) => {
          while (arr.length) {
            let prop = arr.pop();
            if (prop.children && prop.action) {
              actionMap[prop._id] = prop.menuName;
            }
            if (prop.children && !prop.action) {
              deep(prop.children);
            }
          }
        };
        deep(JSON.parse(JSON.stringify(menus)));
        roleTable.actionMap = actionMap;
      };
      onMounted(() => {
        _getRoleList();
        _getMenuList();
      });
      const handleReset = (form) => {
        proxy.$refs[form].resetFields();
      };
      return {
        ...toRefs(roleQuery),
        ...toRefs(roleTable),
        ...toRefs(roleModal),
        ...toRefs(permissionModal),
        handleReset,
      };
    },
  };
</script>

<style scoped></style>
