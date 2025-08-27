import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { api } from '../services/api';
import { ApiError } from '../types/api';
import { formatTime } from '../utils/formatters';

interface UseCheckInReturn {
  loading: boolean;
  checkIn: (eventId: string, attendeeId: string, attendeeName: string) => Promise<boolean>;
}

export const useCheckIn = (
  onSuccess?: (attendeeId: string, checkedInAt: string) => void
): UseCheckInReturn => {
  const [loading, setLoading] = useState(false);

  const checkIn = useCallback(async (
    eventId: string,
    attendeeId: string,
    attendeeName: string
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      Alert.alert(
        'Confirmar Check-in',
        `Deseja confirmar a presença de ${attendeeName}?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'Confirmar',
            style: 'default',
            onPress: async () => {
              try {
                setLoading(true);
                const response = await api.checkIn(eventId, attendeeId);
                
                onSuccess?.(attendeeId, response.checkedInAt);
                
                Alert.alert(
                  'Check-in realizado!',
                  `${attendeeName} foi registrado como presente às ${formatTime(response.checkedInAt)}.`,
                  [{ text: 'OK' }]
                );
                
                resolve(true);
              } catch (error) {
                const apiError = error as ApiError;
                
                if (apiError.status === 409) {
                  // Participante já estava presente
                  Alert.alert(
                    'Participante já presente',
                    `${attendeeName} já havia feito check-in anteriormente.`,
                    [{ text: 'OK' }]
                  );
                } else {
                  Alert.alert(
                    'Erro no check-in',
                    apiError.message || 'Ocorreu um erro ao realizar o check-in. Tente novamente.',
                    [{ text: 'OK' }]
                  );
                }
                
                resolve(false);
              } finally {
                setLoading(false);
              }
            },
          },
        ]
      );
    });
  }, [onSuccess]);

  return {
    loading,
    checkIn,
  };
};