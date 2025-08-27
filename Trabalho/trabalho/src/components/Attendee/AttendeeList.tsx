import React from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  StyleSheet,
  ListRenderItem,
} from 'react-native';
import { Attendee } from '../../types/api';
import { AttendeeItem } from './AttendeeItem';
import { EmptyState } from './EmptyState';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { COLORS } from '../../utils/constants';

interface AttendeeListProps {
  attendees: Attendee[];
  loading: boolean;
  refreshing: boolean;
  hasMore: boolean;
  searchTerm: string;
  onAttendeePress: (attendee: Attendee) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export const AttendeeList: React.FC<AttendeeListProps> = ({
  attendees,
  loading,
  refreshing,
  hasMore,
  searchTerm,
  onAttendeePress,
  onRefresh,
  onLoadMore,
}) => {
  const renderAttendee: ListRenderItem<Attendee> = ({ item }) => (
    <AttendeeItem
      attendee={item}
      onPress={onAttendeePress}
      disabled={loading}
    />
  );

  const renderFooter = () => {
    if (!hasMore || attendees.length === 0) return null;
    
    return (
      <View style={styles.footer}>
        <LoadingSpinner size="small" message="Carregando mais..." />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading && attendees.length === 0) {
      return <LoadingSpinner message="Carregando participantes..." />;
    }

    if (searchTerm) {
      return (
        <EmptyState
          message={`Nenhum resultado para "${searchTerm}"`}
          subtitle="Tente buscar por nome, email ou documento"
        />
      );
    }

    return (
      <EmptyState
        message="Nenhum participante encontrado"
        subtitle="Não há participantes cadastrados para este evento"
      />
    );
  };

  const keyExtractor = (item: Attendee) => item.id;

  const handleEndReached = () => {
    if (hasMore && !loading) {
      onLoadMore();
    }
  };

  return (
    <FlatList
      data={attendees}
      keyExtractor={keyExtractor}
      renderItem={renderAttendee}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          tintColor={COLORS.primary}
        />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      removeClippedSubviews={true}
      maxToRenderPerBatch={20}
      windowSize={10}
      style={styles.list}
      contentContainerStyle={attendees.length === 0 ? styles.emptyContainer : undefined}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
  },
  footer: {
    padding: 20,
  },
});