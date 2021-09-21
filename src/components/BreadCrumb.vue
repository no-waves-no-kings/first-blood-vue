<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(route, index) in breadList" :key="route.name" :to="{ path: route.path }">
      <router-link v-if="index === 0" :to="route.path">{{ route.meta.title }}</router-link>
      <span v-else>{{ route.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'BreadCrumb',
    computed: {
      breadList: function () {
        return this.$route.matched;
      },
    },
  };
</script>

<style scoped></style>
