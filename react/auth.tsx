import React, { Suspense } from 'react';
import pathToRegexp from 'path-to-regexp';
import { Redirect, Route, Switch } from 'react-router-dom';

const toPath = (path: string, params: Record<string, string>): string =>
  pathToRegexp.compile(path)(params);

const NO_AUTH = 'no-auth';

export const TestRoute = () => {
  const authRoutes = [
    {
      path: '/teacher',
      name: '教师信息',
      exact: true,
      component: Teacher,
    },
  ];

  const noAuthRoutes = [
    {
      path: '/student',
      name: '学生信息',
      exact: true,
      component: Student,
    },
  ];

  const renderRoute = (routes, key) => {
    routes?.map((route) => (
      <Route
        key={route.path}
        path={route.path}
        exact={!!route.exact}
        component={(_props) => {
          if (route?.redirect) {
            return (
              <Redirect to={toPath(route.redirect, _props.match?.params)} />
            );
          }

          return (
            <Suspense fallback={<br />}>
              {key === NO_AUTH ? (
                <Route key={NO_AUTH} path="*" redirect="/403" />
              ) : (
                <route.component
                  {..._props}
                  currentRoute={route}
                  paths={route.path}
                />
              )}
            </Suspense>
          );
        }}
      />
    ));
  };

  return (
    <Switch>
      {renderRoute(authRoutes)}
      {renderRoute(noAuthRoutes, NO_AUTH)}
      <Route key="not-found" path="*" redirect="/404" />
    </Switch>
  );
};
