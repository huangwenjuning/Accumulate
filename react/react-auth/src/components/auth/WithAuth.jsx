import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import NoAuth from '../../403';



export const WithAuth = (code, ...values) => (WrappedComponent) => (
  props
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hasCode, hasValues] = useAuth(code, ...values);

  return hasCode ? (
    <WrappedComponent {...props} permissions={hasValues} />
  ) : (
    <NoAuth />
  );
};
