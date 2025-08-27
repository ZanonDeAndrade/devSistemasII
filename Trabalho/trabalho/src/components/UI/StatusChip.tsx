import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

interface StatusChipProps {
  status: 'present' | 'absent';
  time?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, time }) => {
  const isPresent = status === 'present';
  
  return (
    <View
      style={[
        styles.container,
        isPresent ? styles.present : styles.absent,
      ]}
      accessibilityLabel={`Status: ${isPresent ? 'Presente' : 'Ausente'}${time ? ` desde ${time}` : ''}`}
    >
      <Text style={[styles.text, isPresent ? styles.presentText : styles.absentText]}>
        {isPresent ? 'Presente' : 'Ausente'}
      </Text>
      {time && (
        <Text style={[styles.time, isPresent ? styles.presentText : styles.absentText]}>
          {time}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70,
    alignItems: 'center',
  },
  present: {
    backgroundColor: '#E8F5E8',
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  absent: {
    backgroundColor: '#FFF2F0',
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  time: {
    fontSize: 10,
    marginTop: 2,
  },
  presentText: {
    color: COLORS.success,
  },
  absentText: {
    color: COLORS.danger,
  },
});