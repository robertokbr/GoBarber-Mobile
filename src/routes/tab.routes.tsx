/* eslint-disable consistent-return */
import React from 'react';
import { Feather } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PublicRoutes from './public.routes';
import Appointments from '../pages/Appointments';
import PrivateRoutes from './private.routes';
import Dashboard from '../pages/Dashboard';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => (
  <Tab.Navigator
    sceneContainerStyle={{ backgroundColor: '#312e38' }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        if (route.name === 'Dashboard') {
          return <Feather name="grid" size={size} color={color} />;
        }
        if (route.name === 'Agendamentos') {
          return <Feather name="list" size={size} color={color} />;
        }
      },
    })}
    tabBarOptions={{
      style: {
        height: 64,
        backgroundColor: '#28262e',
        borderTopWidth: 0,
      },
      tabStyle: {
        alignItems: `center`,
        justifyContent: `center`,
      },
      iconStyle: {
        width: 20,
        height: 20,
        marginBottom: 0,
      },
      labelStyle: {
        fontFamily: 'roboto_400',
        fontSize: 11,
        marginBottom: 8,
      },
      inactiveTintColor: '#999591',
      activeTintColor: '#ff9000',
    }}
    initialRouteName="Dashboard"
  >
    <Tab.Screen name="Dashboard" component={Dashboard} />
    <Tab.Screen name="Agendamentos" component={Appointments} />
  </Tab.Navigator>
);

export default TabRoutes;
