import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NavigationProp, RouteProp } from '../types/navigation';
import { Attendee } from '../types/api';
import { useAttendees } from '../hooks/useAttendees';
import { useCheckIn } from '../hooks/useCheckIn';
import { useEvents } from '../hooks/useEvents';
import { SearchInput } from '../components/UI/SearchInput';
import { AttendeeList } from '../components/Attendee/AttendeeList';
import { COLORS } from '../utils/constants';

export const AttendeesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<'Attendees'>>();
  const { eventId, eventTitle } = route.params;

  const { refetch: refetchEvent } = useEvents(eventId);
  const {
    attendees,
    loading,
    error,
    refreshing,
    hasMore,
    searchTerm,
    setSearchTerm,
    refetch,
    loadMore,
    refresh,
    updateAttendee,
  } = useAttendees(eventId);

  const { loading: checkingIn, checkIn } = useCheckIn(
    (attendeeId, checkedInAt) => {
      updateAttendee(attendeeId, { checkedInAt });
      // Atualizar as estatísticas do evento
      refetchEvent();
    }
  );

  useEffect(() => {
    navigation.setOptions({
      title: eventTitle || 'Participantes',
    });
  }, [navigation, eventTitle]);

  // Refetch quando a tela ganhar foco (útil para atualizar após voltar de outra tela)
  useFocusEffect(
    useCallback(() => {
      if (!searchTerm) {
        refetch();
      }
    }, [refetch, searchTerm])
  );

  const handleAttendeePress = async (attendee: Attendee) => {
    if (attendee.checkedInAt) {
      Alert.alert(
        'Participante já presente',
        `${attendee.name} já realizou check-in.`,
        [{ text: 'OK' }]
      );
      return;
    }

    await checkIn(eventId, attendee.id, attendee.name);
  };

  const handleRetry = () => {
    Alert.alert(
      'Erro ao carregar participantes',
      error?.message || 'Ocorreu um erro inesperado',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Tentar novamente', onPress: refetch },
      ]
    );
  };

  // Mostrar erro se houver
  if (error && attendees.length === 0) {
    handleRetry();
  }

  return (
    <View style={styles.container}>
      <SearchInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Buscar por nome, email ou documento..."
      />
      
      <AttendeeList
        attendees={attendees}
        loading={loading || checkingIn}
        refreshing={refreshing}
        hasMore={hasMore}
        searchTerm={searchTerm}
        onAttendeePress={handleAttendeePress}
        onRefresh={refresh}
        onLoadMore={loadMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
});