import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { Event } from '../types/api';
import { useEventList } from '../hooks/useEvents';
import { EventCard } from '../components/Event/EventCard';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { EmptyState } from '../components/Attendee/EmptyState';
import { COLORS } from '../utils/constants';

export const EventListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { events, loading, error, refetch } = useEventList();

  // Refetch quando a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleEventPress = (event: Event) => {
    navigation.navigate('Event', { eventId: event.id });
  };

  const handleRetry = () => {
    Alert.alert(
      'Erro ao carregar eventos',
      error?.message || 'Ocorreu um erro inesperado',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Tentar novamente', onPress: refetch },
      ]
    );
  };

  const renderEvent: ListRenderItem<Event> = ({ item }) => (
    <EventCard event={item} onPress={handleEventPress} />
  );

  const renderEmpty = () => {
    if (loading) {
      return <LoadingSpinner message="Carregando eventos..." />;
    }

    return (
      <EmptyState
        message="Nenhum evento encontrado"
        subtitle="Não há eventos disponíveis no momento"
      />
    );
  };

  const keyExtractor = (item: Event) => item.id;

  // Mostrar erro se houver
  if (error && events.length === 0 && !loading) {
    handleRetry();
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={keyExtractor}
        renderItem={renderEvent}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          events.length === 0 ? styles.emptyContainer : styles.listContainer
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
  },
});