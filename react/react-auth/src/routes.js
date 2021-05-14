import { lazy } from 'react';
import { addAuthority, getOptionsMapData } from './utils/auth';

const HeadMaster = lazy(() => import('./pages/management/HeadMaster'));
const Teachers = lazy(() => import('./pages/management/Teachers'));
const Students = lazy(() => import('./pages/management/Students'));
const Math = lazy(() => import('./pages/task/Math'));
const English = lazy(() => import('./pages/task/English'));
const Other = lazy(() => import('./pages/task/Other/index'));
const Chinese = lazy(() => import('./pages/task/Chinese'));
const NotFound = lazy(() => import('./404'));
const NoAuth = lazy(() => import('./403'));


/**
 * @authority 菜单权限 code
 * @optionsAuthority 操作权限 code
 * 
 */
const routes = [
  {
    path: '/management',
    name: '信息管理',
    redirect: '/management/headmasters',
    exact: true,
    // authority: ['management.headmasters', 'management.teachers', 'management.students'],
    children: [
      {
        path: '/management/headmasters',
        name: '校长信息',
        exact: true, 
        component: HeadMaster,
        authority: 'management.headmasters',
        optionsAuthority: ['management.headmasters.add', 'management.headmasters.delete']
      },
      {
        path: '/management/teachers',
        name: '教师信息',
        exact: true, 
        component: Teachers,
        authority: 'management.teachers',
        optionsAuthority: ['management.teachers.add', 'management.teachers.delete']
      },
      {
        path: '/management/students',
        name: '学生信息',
        exact: true, 
        component: Students,
        authority: 'management.students',
        optionsAuthority: ['management.students.add', 'management.students.delete']
      }
    ]
  },
  {
    path: '/task',
    name: '作业管理',
    redirect: '/task/chinese',
    exact: true,
    // authority: ['task.chinese', 'task.math', 'task.english', 'task.other'],
    children: [
      {
        path: '/task/chinese',
        name: '语文',
        exact: true, 
        component: Chinese,
        authority: 'task.chinese',
        optionsAuthority: ['task.chinese.add', 'task.chinese.edit']
      },
      {
        path: '/task/math',
        name: '数学',
        exact: true, 
        component: Math,
        authority: 'task.math',
      },
      {
        path: '/task/english',
        name: '英语',
        exact: true, 
        component: English,
        authority: 'task.english',
      },
      {
        path: '/task/other',
        name: '其他 - 测试权限控制高阶组件',
        exact: true, 
        component: Other,
        authority: 'task.other',
        optionsAuthority: ['task.other.add', 'task.other.edit', 'task.other.delete']
      }
    ] 
  },
  {
    path: '/403',
    component: NoAuth,
    hideInMenu: true,
  },
  {
    path: '/404',
    component: NotFound,
    hideInMenu: true,
  },
];

addAuthority(routes);

export const optionsMap = getOptionsMapData(routes);
export { routes }