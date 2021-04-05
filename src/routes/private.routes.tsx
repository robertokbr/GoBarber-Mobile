import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import TabRoutes from './tab.routes';

const PrivateRoutes: React.FC = () => {
  const Private = createStackNavigator();

  return (
    <Private.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
      initialRouteName="Dashboard"
    >
      <Private.Screen name="Dashboard" component={TabRoutes} />
      <Private.Screen name="CreateAppointment" component={CreateAppointment} />
      <Private.Screen
        name="AppointmentCreated"
        component={AppointmentCreated}
      />

      <Private.Screen name="Profile" component={Profile} />
    </Private.Navigator>
  );
};

export default PrivateRoutes;
