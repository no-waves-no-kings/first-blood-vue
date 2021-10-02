import request from '../utils/http';
export default {
  getMenuList(menu) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: menu,
    });
  },
  saveMenu(menu) {
    return request({
      url: '/menu/save',
      method: 'post',
      data: menu,
    });
  },
  deleteMenu(param) {
    return request({
      url: '/menu/delete',
      method: 'delete',
      data: param,
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
      url: '/users/list',
      method: 'get',
      data: params,
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
      url: '/user/save',
      method: 'post',
      data: user,
    });
  },
  deleteUser(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
    });
  },
  getAllRoleList() {
    return request({
      url: '/roles/alllist',
      method: 'get',
    });
  },
  getRoleList(params) {
    return request({
      url: '/roles/list',
      method: 'get',
      data: params,
    });
  },
  saveRole(params) {
    return request({
      url: '/role/save',
      method: 'post',
      data: params,
    });
  },
  deleteRole(params) {
    return request({
      url: '/role/delete',
      method: 'post',
      data: params,
    });
  },
  updateRolePermission(params) {
    return request({
      url: '/role/permission',
      method: 'post',
      data: params,
    });
  },
  getDeptList() {
    return request({
      url: '/dept/list',
      method: 'get',
    });
  },
};
