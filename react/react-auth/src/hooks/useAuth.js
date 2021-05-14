import { useMemo } from 'react';
import { optionsMap } from '../routes';

const checkPermission = (value, permission) =>
  value?.map((key) => permission?.indexOf(key) !== -1);

export const useAuth = (code, ...values) => {
  const permission = JSON.parse(localStorage.getItem('permission_keys'));

  return useMemo(() => {
    // 1. 没有传入code，当前菜单不受权限控制
    if (!code) {
      return [true, []];
    }

    // 2. 判断当前菜单是否具有访问权限
    if (!checkPermission([code], permission)?.[0]) {
      return [false, []];
    }

    // 维护一份菜单与操作code映射数据
    // const optionsMap = {
    //   'management.headmasters': ['management.headmasters.add', 'management.headmasters.delete'],
    //   'management.teachers': ['management.teachers.add', 'management.teachers.delete'],
    //   'task.chinese': ['task.chinese.add', 'task.chinese.edit'],
    //   'task.other': ['task.other.add', 'task.other.edit', 'task.other.delete'],
    // };


    // 3. 如果传入操作控制 code[], 则使用传入 code[], 否则读取权限操作表数据
    const hasValues = values && values.length
      ? checkPermission(values, permission)
      : checkPermission(optionsMap[code], permission);

    return [true, hasValues];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, ...values]);
};
