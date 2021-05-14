import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"
import { routes } from '../../../routes';
import { flatTreeData } from '../../../utils/auth';
import { Spin } from 'antd';
import { compile } from 'path-to-regexp';

const toPath = (path, params) => compile(path)(params);

const renderRoute = (flatRoutes) => {
  return flatRoutes?.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      component={(_props) => {
        if (route?.redirect) {
          return (
            <Redirect to={toPath(route.redirect, _props.match?.params)} />
          );
        }

        return (
          <Suspense fallback={<Spin />}>
            <route.component
              {..._props}
              currentRoute={route}
              paths={route.path}
            />
          </Suspense>
        );
      }}
    />
  ));
};

export const MainHoc = () => {
  const routeList = [];
  flatTreeData(routes, routeList);

  return (
    <Switch>
      {/* 高阶组件权限控制 */}
      {renderRoute(routeList)}
      <Route key="not-found" path="*" redirect="/404" />
    </Switch>
  );
};
