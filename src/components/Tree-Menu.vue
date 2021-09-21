<template>
  <template v-for="menu in menuList">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType.toString() === '1'"
      :key="menu._id"
      :index="menu.path"
    >
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <tree-menu :menu-list="menu.children"></tree-menu>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType.toString() === '1'" :key="menu._id" :index="menu.path">{{
      menu.menuName
    }}</el-menu-item>
  </template>
</template>

<script>
  export default {
    name: 'TreeMenu',
    props: {
      menuList: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {};
    },
    mounted() {},
  };
</script>

<style scoped></style>
