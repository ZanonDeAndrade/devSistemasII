export interface Event {
    id: string;
    title: string;
    startsAt: string;
    endsAt: string;
    location: string;
    stats: {
      total: number;
      checkedIn: number;
      absent: number;
    };
  }
  
  export interface Attendee {
    id: string;
    name: string;
    email: string;
    document: string;
    checkedInAt?: string;
  }
  
  export interface AttendeesResponse {
    data: Attendee[];
    page: number;
    limit: number;
    total: number;
  }
  
  export interface CheckInRequest {
    attendeeId: string;
  }
  
  export interface CheckInResponse {
    attendeeId: string;
    checkedInAt: string;
  }
  
  export interface ApiError {
    status: number;
    message: string;
  }
  
  export interface AttendeeSearchParams {
    search?: string;
    page?: number;
    limit?: number;
  }