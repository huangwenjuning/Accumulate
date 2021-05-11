
import React from 'react';
import { WithAuth } from '../../../components/auth/WithAuth';
import { Other } from './Other';

const OtherView = ({ permissions }) => <Other permissions={permissions} />;

export default WithAuth('task.other')(OtherView);