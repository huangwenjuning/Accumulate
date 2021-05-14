import React, { Suspense } from 'react';
import { Route, Redirect, Switch } from "react-router-dom"
import { routes } from '../../../routes';
import { flatTreeData } from '../../../utils/auth';
import { Spin } from 'antd';
import { compile } from 'path-to-regexp';

const toPath = (path, params) => compile(path)(params);

const NO_AUTH = 'no-auth';

const renderRoute = (flatRoutes, key) => {
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
          <>
            {key === NO_AUTH ? (
              <Redirect key={NO_AUTH} to="/403" />
            ) : (
              <Suspense fallback={<Spin />}>
                <route.component
                  {..._props}
                  currentRoute={route}
                  paths={route.path}
                />
              </Suspense>
            )}
          </>
        );
      }}
    />
  ));
};
const permissions = JSON.parse(localStorage.getItem('permission_path_keys'));

export const Main = () => {
  const routeList = [];
  flatTreeData(routes, routeList);
  const authRoutes = routeList?.filter((route) => !route.authority || permissions.includes(route.authority));
  const noAuthRoutes = routeList?.filter((route) => route.authority && !permissions.includes(route.authority));

  return (
    <Switch>
      {renderRoute(authRoutes)}
      {renderRoute(noAuthRoutes, NO_AUTH)}
      <Route key="not-found" path="*" redirect="/404" />
    </Switch>
  );
};
