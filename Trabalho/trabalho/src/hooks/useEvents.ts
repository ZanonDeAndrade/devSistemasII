import { useState, useEffect, useCallback } from 'react';
import { Event, ApiError } from '../types/api';
import { api } from '../services/api';

interface UseEventsReturn {
  event: Event | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

export const useEvents = (eventId: string): UseEventsReturn => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const eventData = await api.getEvent(eventId);
      setEvent(eventData);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  const refetch = useCallback(async () => {
    await fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    event,
    loading,
    error,
    refetch,
  };
};