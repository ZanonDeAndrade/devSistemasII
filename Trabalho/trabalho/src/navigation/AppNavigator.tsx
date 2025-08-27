import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { EventListScreen, EventScreen, AttendeesScreen } from '../screens';
import { COLORS } from '../utils/constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EventList"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="EventList"
          component={EventListScreen}
          options={{
            title: 'Eventos',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Event"
          component={EventScreen}
          options={{
            title: 'Evento',
          }}
        />
        <Stack.Screen
          name="Attendees"
          component={AttendeesScreen}
          options={{
            title: 'Participantes',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};