import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppealItem, AppealState } from '@/app/types/appeal'
import { nanoid } from 'nanoid'

const initialState: AppealState = { items: [] }

const appealSlice = createSlice({
  name: 'appeal',
  initialState,
  reducers: {
    addAppeal: {
      reducer(state, action: PayloadAction<AppealItem>) {
        state.items.push(action.payload)
      },
      prepare(payload: Omit<AppealItem, 'id'>) {
        return { payload: { id: nanoid(), ...payload } }
      }
    },
    updateAppeal(state, action: PayloadAction<AppealItem>) {
      const idx = state.items.findIndex(i => i.id === action.payload.id)
      if (idx >= 0) state.items[idx] = action.payload
    },
    removeAppeal(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    setAppeals(state, action: PayloadAction<AppealItem[]>) {
      state.items = action.payload
    }
  }
})

export const { addAppeal, updateAppeal, removeAppeal, setAppeals } = appealSlice.actions
export default appealSlice.reducer
