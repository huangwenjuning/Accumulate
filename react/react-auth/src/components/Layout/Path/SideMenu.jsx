import React from 'react';
import { Menu } from 'antd';
import { routes } from '../../../routes';
import { Link } from "react-router-dom"

const { SubMenu } = Menu;
const permissions = JSON.parse(localStorage.getItem('permission_path_keys'));

const renderRoutes = (route) => route?.map((item) => {
  if (item.hideInMenu) { return null }
  
  let parentHasPermission = true;
  if (item.authority && item.children) {
    parentHasPermission = item.authority.some((key) => permissions.includes(key));
  }

  if (!parentHasPermission) {
    return null
  }

  if (item.authority && !item.children && !permissions.includes(item.authority)) {
    return null;
  }

  if (item?.children?.length) {
    return (
      <SubMenu key={item.path} title={item.name}>
        {renderRoutes(item.children)}
      </SubMenu>
    )
  }

  return (
    <Menu.Item key={item.path}>
      <Link to={item.path}>
        {item.name}
      </Link>
    </Menu.Item>
  ) 
});

export const SideMenu = () => {
  return (
    <Menu
      defaultSelectedKeys={routes[0].path}
      mode="inline"
      theme="dark"
    >
      {renderRoutes(routes)}
    </Menu>
  )
}