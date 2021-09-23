import request from '../utils/http';
export default {
  getMenuList() {
    return request({
      url: '/menu/list',
      method: 'get',
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
  deleteUser(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
    });
  },
  getRoleList() {
    return request({
      url: '/roles/list',
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
