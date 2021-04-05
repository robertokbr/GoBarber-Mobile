import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';
import PrivateRoutes from './private.routes';
import PublicRoutes from './public.routes';
import TabRoutes from './tab.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <ActivityIndicator
        color="#ff9000"
        size="small"
        style={{
          flex: 1,
          alignSelf: 'center',
        }}
      />
    );
  }

  return user ? <PrivateRoutes /> : <PublicRoutes />;
};

export default Routes;
