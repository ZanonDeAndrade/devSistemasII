export type RootStackParamList = {
    Event: { eventId: string };
    Attendees: { eventId: string; eventTitle: string };
  };
  
  export type NavigationProp = import('@react-navigation/native-stack').NativeStackNavigationProp<RootStackParamList>;
  export type RouteProp<T extends keyof RootStackParamList> = import('@react-navigation/native').RouteProp<RootStackParamList, T>;