import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const PublicRoutes: React.FC = () => {
  const Public = createStackNavigator();

  return (
    <Public.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Public.Screen name="SignIn" component={SignIn} />
      <Public.Screen name="SignUp" component={SignUp} />
    </Public.Navigator>
  );
};

export default PublicRoutes;
