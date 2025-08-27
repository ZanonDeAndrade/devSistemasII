import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Event } from '../../types/api';
import { StatusChip } from '../UI/StatusChip';
import { formatDateRange } from '../../utils/formatters';
import { COLORS } from '../../utils/constants';

interface EventCardProps {
  event: Event;
  onPress: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const { stats } = event;
  const attendanceRate = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0;

  const handlePress = () => {
    onPress(event);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      accessibilityLabel={`Evento ${event.title}`}
      accessibilityHint="Toque para ver detalhes do evento"
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <View style={styles.attendanceContainer}>
          <Text style={styles.attendanceText}>{attendanceRate}%</Text>
        </View>
      </View>

      <Text style={styles.date}>
        {formatDateRange(event.startsAt, event.endsAt)}
      </Text>

      <Text style={styles.location} numberOfLines={1}>
        📍 {event.location}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: COLORS.success }]}>
            {stats.checkedIn}
          </Text>
          <Text style={styles.statLabel}>Presentes</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: COLORS.danger }]}>
            {stats.absent}
          </Text>
          <Text style={styles.statLabel}>Ausentes</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${attendanceRate}%` }]}
          />
        </View>
        <Text style={styles.progressText}>Taxa de presença</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
    marginRight: 12,
  },
  attendanceContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 44,
    alignItems: 'center',
  },
  attendanceText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    marginBottom: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.gray,
  },
});