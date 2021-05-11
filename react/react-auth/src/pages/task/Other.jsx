import React from 'react'
import { Button } from 'antd';
import { WithAuth } from '../../components/auth/WithAuth';

const Other = ({ permissions }) => {
  const [hasAdd, hasEdit, hasDelete] = permissions;

  return (
    <>
      {hasAdd && (<Button type="primary">新增控制</Button>)}
      {hasEdit && (<Button type="primary">编辑控制</Button>)}
      {hasDelete && (<Button type="primary">删除控制</Button>)}
    </>
  )
}

export default WithAuth('teacher.other')(Other);