import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CalendarEvent, CalendarState } from '@/app/types/calendar'
import { nanoid } from 'nanoid'

const initialState: CalendarState = { events: [] }

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: {
      reducer(state, action: PayloadAction<CalendarEvent>) {
        state.events.push(action.payload)
      },
      prepare(payload: Omit<CalendarEvent, 'id'>) {
        return { payload: { id: nanoid(), ...payload } }
      }
    },
    updateEvent(state, action: PayloadAction<CalendarEvent>) {
      const idx = state.events.findIndex(e => e.id === action.payload.id)
      if (idx >= 0) state.events[idx] = action.payload
    },
    removeEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(e => e.id !== action.payload)
    },
    clearEvents(state) {
      state.events = []
    }
  }
})

export const { addEvent, updateEvent, removeEvent, clearEvents } = calendarSlice.actions
export default calendarSlice.reducer
