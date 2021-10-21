import Storage from '../utils/storage';
const mutations = {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    Storage.setItem('userInfo', userInfo);
  },
  saveMenuList(state, menuList) {
    state.menuList = menuList;
    Storage.setItem('menuList', menuList);
  },
  saveActionList(state, actionList) {
    state.actionList = actionList;
    Storage.setItem('actionList', actionList);
  },
};

export default mutations;
