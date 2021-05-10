import React from 'react';

export const Guard = ({ permissionCode, children }) => {
  const permission = [''];

  return permission?.indexOf(permissionCode) !== -1 ? <>{children}</> : null;
};
