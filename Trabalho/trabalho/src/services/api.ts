import { BASE_URL, TOKEN } from '../utils/constants';
import {
  Event,
  Attendee,
  AttendeesResponse,
  CheckInRequest,
  CheckInResponse,
  AttendeeSearchParams,
  ApiError,
} from '../types/api';

class ApiService {
  private baseURL: string;
  private token: string;

  constructor() {
    this.baseURL = BASE_URL;
    this.token = TOKEN;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw {
          status: response.status,
          message: `Erro ${response.status}: ${response.statusText}`,
        } as ApiError;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          status: 0,
          message: 'Erro de conexão. Verifique sua internet.',
        } as ApiError;
      }
      throw error;
    }
  }

  async getEvents(): Promise<Event[]> {
    return this.request<Event[]>('/events');
  }

  async getEvent(eventId: string): Promise<Event> {
    return this.request<Event>(`/events/${eventId}`);
  }

  async getAttendees(
    eventId: string,
    params: AttendeeSearchParams = {}
  ): Promise<AttendeesResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.search) searchParams.append('search', params.search);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/events/${eventId}/attendees${queryString ? `?${queryString}` : ''}`;
    
    return this.request<AttendeesResponse>(endpoint);
  }

  async checkIn(eventId: string, attendeeId: string): Promise<CheckInResponse> {
    return this.request<CheckInResponse>(`/events/${eventId}/checkin`, {
      method: 'POST',
      body: JSON.stringify({ attendeeId } as CheckInRequest),
    });
  }
}

export const api = new ApiService();