import { createStore } from 'vuex';
import mutations from './mutations';
import Storage from '../utils/storage';
const state = {
  userInfo: Storage.getItem('userInfo') || {},
  menuList: Storage.getItem('menuList') || [],
  actionList: Storage.getItem('actionList') || [],
};
const store = createStore({
  state,
  mutations,
});
export default store;
