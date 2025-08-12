import { configureStore } from '@reduxjs/toolkit'
import appealReducer from './slices/appealSlice'
import calendarReducer from './slices/calendarSlice'
import { AppealState } from '../types/appeal';
import { CalendarState } from '../types/calendar';

export interface RootState {
  appeal: AppealState;
  calendar: CalendarState;
}

const PERSIST_KEY = 'datagain_state_v1'

function loadState(): RootState | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = localStorage.getItem(PERSIST_KEY)
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    // Ensure the loaded state matches our RootState structure
    return {
      appeal: parsed.appeal || { items: [] },
      calendar: parsed.calendar || { events: [] }
    }
  } catch (e) {
    console.warn('Failed to load persisted state', e)
    return undefined
  }
}

function saveState(state: RootState) {
  if (typeof window === 'undefined') return
  try {
    const subset = {
      appeal: state.appeal,
      calendar: state.calendar
    }
    localStorage.setItem(PERSIST_KEY, JSON.stringify(subset))
  } catch (e) {
    console.warn('Failed to save state', e)
  }
}

export const store = configureStore({
  reducer: {
    appeal: appealReducer,
    calendar: calendarReducer
  },
  preloadedState: loadState()
})

// throttle writes to localStorage (basic)
let saveTimer: number | null = null
store.subscribe(() => {
  if (typeof window === 'undefined') return
  if (saveTimer) window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    saveState(store.getState())
    saveTimer = null
  }, 400)
})

export type AppDispatch = typeof store.dispatch