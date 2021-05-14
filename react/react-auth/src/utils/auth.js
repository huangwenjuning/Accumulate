// 打平树形结构，变成一维数组数据
export const flatTreeData = (treeData, data) => {
  if (Array.isArray(treeData)) {
    treeData.forEach((item) => {
      data.push(item);

      if (item?.children) {
        flatTreeData(item.children, data);
      }
    });
  }
};

const defineAuthority = (routes) => {
  if (routes === null || routes === undefined) {
    return null;
  }

  const allAuth = routes?.every((item) => item.authority);

  if (allAuth) {
    let authority = [];

    routes.forEach((item) => {
      authority = item.authority ? authority.concat(item.authority) : authority;
    });

    return [...new Set(authority)];
  }

  return null;
};

/**
 * 添加 authority
 * @param router 路由表
 *
 * 最内层无 authority 时，不处理
 *  父级authority情况：
 *    1、如果父级下的子级全部都配置了 authority，则父级需要配置 authority，authority 是子级 authority 的并集
 *    2、如果父级下存在没有 authority 的子级，则父级无需配置 authority
 */
export const addAuthority = (router) => {
  if (router === null || router === undefined) {
    return;
  }

  router?.forEach((route) => {
    const newRoute = route;

    if (Array.isArray(route.children)) {
      addAuthority(route.children);
      newRoute.authority = defineAuthority(route.children);
    }
  });
};

export const getOptionsMapData = (routes) => {
  const routeList = [];

  flatTreeData(routes, routeList);
  return routeList.reduce((data, route) => {
    if (route.optionsAuthority) {
      data[route.authority] = route.optionsAuthority;
    }

    return data;
  }, {});
};