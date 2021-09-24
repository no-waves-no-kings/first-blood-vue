import request from '../utils/http';
export default {
  getMenuList(menu) {
    return request({
      url: '/menu/list',
      method: 'get',
      data: menu,
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
  getRoleList() {
    return request({
      url: '/roles/alllist',
      method: 'get',
    });
  },
  getDeptList() {
    return request({
      url: '/dept/list',
      method: 'get',
    });
  },
};
