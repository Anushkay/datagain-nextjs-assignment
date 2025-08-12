export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: 'event' | 'reminder';
  time?: string; 
}

export interface CalendarState {
  events: CalendarEvent[];
}
