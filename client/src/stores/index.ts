import { configureStore } from '@reduxjs/toolkit'
import voyageReducer from './voyageSlice'

export const store = configureStore({
    reducer: {
        voyages: voyageReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
