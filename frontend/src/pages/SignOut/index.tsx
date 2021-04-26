import React from 'react';

import { useAuth } from '../../context/AuthContext';

const SignOut: React.FC = () => {
  const { signOut } = useAuth();
  signOut();
  return <div />;
};

export default SignOut;
