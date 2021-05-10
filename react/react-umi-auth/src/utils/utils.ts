import { parse } from 'querystring';
import { pathToRegexp } from 'path-to-regexp';
import type { MenuDataItem } from '@ant-design/pro-layout';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

interface TreeDataChildren<T> {
  children?: T[];
}
/**
 *
 * @param treeData 树形结构数组
 * @param data 扁平化数据
 */
export const flatTreeData = <T>(
  treeData: TreeDataChildren<T>[],
  data: TreeDataChildren<T>[],
): void => {
  if (Array.isArray(treeData)) {
    treeData.forEach((item: TreeDataChildren<T>) => {
      data.push(item);

      if (item?.children) {
        flatTreeData(item.children, data);
      }
    });
  }
};

export const isPathMatched = (
  definePath: string | undefined,
  pathname: string | undefined,
  exact: boolean = true,
): boolean => pathToRegexp(`${definePath}${exact ? '' : '(.*)'}`).test(pathname ?? '');


/**
 *
 * @param pathname 当前路径
 * @param routes 路由配置数据
 * @returns 与当前路径匹配配置数据
 */
export const getMatchPathConfig = (
  pathname: string = window.location.pathname,
  routes: MenuDataItem[],
): MenuDataItem | { authority: undefined } => {
  if (Array.isArray(routes)) {
    const flatRoutes: MenuDataItem[] | undefined = [];

    flatTreeData(routes, flatRoutes);

    return (
      flatRoutes?.find((item) =>
        isPathMatched(item.path, pathname, item.exact),
      ) || {
        authority: undefined,
      }
    );
  }

  return { authority: undefined };
};
