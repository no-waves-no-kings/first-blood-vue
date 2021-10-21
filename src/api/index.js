import request from '../utils/http';
export default {
  getMenuList(menu) {
    return request({
      url: '/menus',
      method: 'get',
      data: menu,
      mock: false,
    });
  },
  saveMenu(menu) {
    return request({
      url: '/menus',
      method: 'post',
      data: menu,
      mock: false,
    });
  },
  updateMenu(menu) {
    return request({
      url: '/menus',
      method: 'put',
      data: menu,
      mock: false,
    });
  },
  deleteMenu(param) {
    return request({
      url: '/menus',
      method: 'delete',
      data: param,
      mock: false,
    });
  },
  getNoticeCount() {
    return request({
      url: '/leave/count',
      method: 'get',
    });
  },
  getUserList(params) {
    return request({
      url: '/users',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  getUserPermissionList(params) {
    return request({
      url: '/users/permission',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  getUserSelect() {
    return request({
      url: '/users/select',
      method: 'get',
      mock: false,
    });
  },
  userLogin(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  getUserById(userId) {
    return request({
      url: `/user/:userId`,
      method: 'get',
    });
  },
  saveUser(user) {
    return request({
      url: '/users',
      method: 'post',
      data: user,
      mock: false,
    });
  },
  updateUser(user) {
    return request({
      url: '/users',
      method: 'put',
      data: user,
      mock: false,
    });
  },
  deleteUser(params) {
    return request({
      url: '/users',
      method: 'delete',
      data: params,
      mock: false,
    });
  },
  getAllRoleList() {
    return request({
      url: '/roles/select',
      method: 'get',
      mock: false,
    });
  },
  getRoleList(params) {
    return request({
      url: '/roles',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  saveRole(params) {
    return request({
      url: '/roles',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  updateRole(params) {
    return request({
      url: '/roles',
      method: 'put',
      data: params,
      mock: false,
    });
  },
  deleteRole(params) {
    return request({
      url: '/roles',
      method: 'delete',
      data: params,
      mock: false,
    });
  },
  updateRolePermission(params) {
    return request({
      url: '/roles/permission',
      method: 'put',
      data: params,
      mock: false,
    });
  },
  getDeptList(params) {
    return request({
      url: '/depts',
      method: 'get',
      data: params,
      mock: false,
    });
  },
  saveDept(params) {
    return request({
      url: '/depts',
      method: 'post',
      data: params,
      mock: false,
    });
  },
  updateDept(params) {
    return request({
      url: '/depts',
      method: 'put',
      data: params,
      mock: false,
    });
  },
  deleteDept(params) {
    return request({
      url: '/depts',
      method: 'delete',
      data: params,
      mock: false,
    });
  },
};
