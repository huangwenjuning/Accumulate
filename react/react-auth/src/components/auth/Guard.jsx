import React from 'react';

export const Guard = ({ permissionCode, children }) => {
  const permission = JSON.parse(localStorage.getItem('permission_keys'));

  return permission?.indexOf(permissionCode) !== -1 ? <>{children}</> : null;
};
