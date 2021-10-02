import Storage from '../utils/storage';
const mutations = {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    Storage.setItem('userInfo', userInfo);
  },
};

export default mutations;
