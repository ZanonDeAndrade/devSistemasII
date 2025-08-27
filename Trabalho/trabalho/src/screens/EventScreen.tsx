import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '../types/navigation';
import { useEvents } from '../hooks/useEvents';
import { EventHeader } from '../components/Event/EventHeader';
import { EventStats } from '../components/Event/EventStats';
import { Button } from '../components/UI/Button';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { COLORS } from '../utils/constants';

export const EventScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<'Event'>>();
  const { eventId } = route.params;

  const { event, loading, error, refetch } = useEvents(eventId);

  useEffect(() => {
    if (event) {
      navigation.setOptions({
        title: 'Evento',
      });
    }
  }, [event, navigation]);

  const handleViewAttendees = () => {
    if (event) {
      navigation.navigate('Attendees', {
        eventId: event.id,
        eventTitle: event.title,
      });
    }
  };

  const handleRetry = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner message="Carregando evento..." />;
  }

  if (error) {
    const handleErrorRetry = () => {
      Alert.alert(
        'Erro ao carregar evento',
        error.message,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Tentar novamente', onPress: handleRetry },
        ]
      );
    };

    handleErrorRetry();
    return null;
  }

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Button title="Tentar novamente" onPress={handleRetry} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <EventHeader event={event} />
      <EventStats event={event} />
      
      <View style={styles.buttonContainer}>
        <Button
          title="Ver participantes"
          onPress={handleViewAttendees}
          accessibilityHint="Navegar para a lista de participantes"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.lightGray,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginTop: 8,
  },
});