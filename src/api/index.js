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
};
