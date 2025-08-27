import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { EventScreen, AttendeesScreen } from '../screens';
import { COLORS, EVENT_ID } from '../utils/constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Event"
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
          name="Event"
          component={EventScreen}
          initialParams={{ eventId: EVENT_ID }}
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