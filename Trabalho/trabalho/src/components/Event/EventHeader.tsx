import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event } from '../../types/api';
import { formatDateRange } from '../../utils/formatters';
import { COLORS } from '../../utils/constants';

interface EventHeaderProps {
  event: Event;
}

export const EventHeader: React.FC<EventHeaderProps> = ({ event }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        {event.title}
      </Text>
      <Text style={styles.date}>
        {formatDateRange(event.startsAt, event.endsAt)}
      </Text>
      <Text style={styles.location}>{event.location}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: COLORS.gray,
  },
});