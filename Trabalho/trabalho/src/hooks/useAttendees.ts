import { useState, useEffect, useCallback, useMemo } from 'react';
import { Attendee, AttendeesResponse, ApiError, AttendeeSearchParams } from '../types/api';
import { api } from '../services/api';
import { debounce } from '../utils/search';
import { PAGINATION } from '../utils/constants';

interface UseAttendeesReturn {
  attendees: Attendee[];
  loading: boolean;
  error: ApiError | null;
  refreshing: boolean;
  hasMore: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  refetch: () => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  updateAttendee: (attendeeId: string, updates: Partial<Attendee>) => void;
}

export const useAttendees = (eventId: string): UseAttendeesReturn => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const hasMore = useMemo(() => {
    return attendees.length < totalAttendees;
  }, [attendees.length, totalAttendees]);

  const fetchAttendees = useCallback(async (
    params: AttendeeSearchParams = {},
    append: boolean = false
  ) => {
    try {
      if (!append) {
        setLoading(true);
      }
      setError(null);

      const response = await api.getAttendees(eventId, {
        page: params.page || PAGINATION.DEFAULT_PAGE,
        limit: params.limit || PAGINATION.DEFAULT_LIMIT,
        search: params.search,
      });

      if (append) {
        setAttendees(prev => [...prev, ...response.data]);
      } else {
        setAttendees(response.data);
      }

      setTotalAttendees(response.total);
      setCurrentPage(response.page);
    } catch (err) {
      setError(err as ApiError);
      if (!append) {
        setAttendees([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [eventId]);

  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      setCurrentPage(PAGINATION.DEFAULT_PAGE);
      fetchAttendees({ search: term });
    }, PAGINATION.DEBOUNCE_DELAY),
    [fetchAttendees]
  );

  const refetch = useCallback(async () => {
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
    await fetchAttendees({ search: searchTerm });
  }, [fetchAttendees, searchTerm]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setCurrentPage(PAGINATION.DEFAULT_PAGE);
    await fetchAttendees({ search: searchTerm });
  }, [fetchAttendees, searchTerm]);

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      const nextPage = currentPage + 1;
      await fetchAttendees({
        page: nextPage,
        search: searchTerm,
      }, true);
    }
  }, [hasMore, loading, currentPage, searchTerm, fetchAttendees]);

  const updateAttendee = useCallback((attendeeId: string, updates: Partial<Attendee>) => {
    setAttendees(prev => prev.map(attendee => 
      attendee.id === attendeeId 
        ? { ...attendee, ...updates }
        : attendee
    ));
  }, []);

  const handleSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term);
    if (term.trim() || searchTerm) {
      debouncedSearch(term.trim());
    }
  }, [debouncedSearch, searchTerm]);

  useEffect(() => {
    fetchAttendees();
  }, [eventId]);

  return {
    attendees,
    loading,
    error,
    refreshing,
    hasMore,
    searchTerm,
    setSearchTerm: handleSearchTermChange,
    refetch,
    loadMore,
    refresh,
    updateAttendee,
  };
};