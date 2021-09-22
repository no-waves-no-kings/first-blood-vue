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
  deleteUser(params) {
    return request({
      url: '/users/delete',
      method: 'post',
      data: params,
    });
  },
};
