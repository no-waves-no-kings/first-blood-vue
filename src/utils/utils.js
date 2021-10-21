function generateRoutes(menuList) {
  let routes = [];
  const deep = (arr) => {
    while (arr.length) {
      let item = arr.pop();
      if (item.action) {
        routes.push({
          name: item.component,
          path: item.path,
          meta: {
            title: item.menuName,
          },
          component: item.component,
        });
      }
      if (item.children && !item.action) {
        deep(item.children);
      }
    }
  };
  deep(menuList);
  return routes;
}
export default { generateRoutes };
