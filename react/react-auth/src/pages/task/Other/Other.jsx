import React from 'react'
import { Button } from 'antd';

export const Other = ({ permissions }) => {
  const [hasAdd, hasEdit, hasDelete] = permissions;

  return (
    <>
      {hasAdd && (<Button type="primary" style={{ margin: '0 16px' }}>新增控制</Button>)}
      {hasEdit && (<Button type="primary" style={{ margin: '0 16px' }}>编辑控制</Button>)}
      {hasDelete && (<Button type="primary" style={{ margin: '0 16px' }}>删除控制</Button>)}
    </>
  )
}
