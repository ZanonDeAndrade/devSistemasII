import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Event } from '../../types/api';
import { COLORS } from '../../utils/constants';

interface EventStatsProps {
  event: Event;
}

export const EventStats: React.FC<EventStatsProps> = ({ event }) => {
  const { stats } = event;
  const percentage = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <StatCard
          title="Total"
          value={stats.total}
          color={COLORS.primary}
          accessibilityLabel={`Total de participantes: ${stats.total}`}
        />
        <StatCard
          title="Presentes"
          value={stats.checkedIn}
          color={COLORS.success}
          accessibilityLabel={`Participantes presentes: ${stats.checkedIn}`}
        />
        <StatCard
          title="Ausentes"
          value={stats.absent}
          color={COLORS.danger}
          accessibilityLabel={`Participantes ausentes: ${stats.absent}`}
        />
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Taxa de presença: {percentage}%</Text>
        <View style={styles.progressBar}>
          <View 
            style={[styles.progressFill, { width: `${percentage}%` }]}
            accessibilityLabel={`Taxa de presença: ${percentage} porcento`}
          />
        </View>
      </View>
    </View>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  accessibilityLabel: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, accessibilityLabel }) => (
  <View style={styles.statCard} accessibilityLabel={accessibilityLabel}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
});