import { DayType, VoyageType } from "@/features/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadVoyages, storeVoyages } from "./indexedb";

const initialState : VoyageType[] =  await loadVoyages()

export const voyageSlice = createSlice({
    name: 'voyage',
    initialState,
    reducers: {
        refreshVoyageState: (state, action:PayloadAction<VoyageType[]>) => {
            const voyages = action.payload
            state = voyages
            storeVoyages(voyages)
        },
        removeVoyage: (state, action:PayloadAction<number>) => {
            console.log(action.payload)
        },
        closeVoyage: (state, action:PayloadAction<number>) => {
            console.log(action.payload)
        },
        addDay: (state, action:PayloadAction<DayType>) => {
            console.log(action.payload)
        }
    },
})

export const { refreshVoyageState, removeVoyage, closeVoyage, addDay } = voyageSlice.actions
export default voyageSlice.reducer