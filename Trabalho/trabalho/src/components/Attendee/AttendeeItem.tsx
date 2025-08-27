import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Attendee } from '../../types/api';
import { StatusChip } from '../UI/StatusChip';
import { formatTime } from '../../utils/formatters';
import { COLORS } from '../../utils/constants';

interface AttendeeItemProps {
  attendee: Attendee;
  onPress: (attendee: Attendee) => void;
  disabled?: boolean;
}

export const AttendeeItem: React.FC<AttendeeItemProps> = ({
  attendee,
  onPress,
  disabled = false,
}) => {
  const isPresent = !!attendee.checkedInAt;
  const checkedInTime = attendee.checkedInAt ? formatTime(attendee.checkedInAt) : undefined;

  const handlePress = () => {
    onPress(attendee);
  };

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={handlePress}
      disabled={disabled || isPresent}
      accessibilityLabel={`${attendee.name}, ${isPresent ? 'presente' : 'ausente'}${checkedInTime ? ` desde ${checkedInTime}` : ''}`}
      accessibilityHint={isPresent ? 'Já realizou check-in' : 'Toque para fazer check-in'}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name}>{attendee.name}</Text>
          <Text style={styles.details}>
            {attendee.email} • {attendee.document}
          </Text>
        </View>
        
        <StatusChip
          status={isPresent ? 'present' : 'absent'}
          time={checkedInTime}
        />
      </View>
      
      {!isPresent && !disabled && (
        <View style={styles.actionHint}>
          <Text style={styles.actionText}>Toque para check-in</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: COLORS.gray,
  },
  actionHint: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.primary,
    fontStyle: 'italic',
  },
});