import { DayType, VoyageType } from "@/pages/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadVoyages, storeVoyage } from "./indexedb";

const initialState : VoyageType[] =  await loadVoyages()

export const voyageSlice = createSlice({
    name: 'voyage',
    initialState,
    reducers: {
        addVoyage: (state, action:PayloadAction<VoyageType[]>) => {
            const newVoyages = action.payload
            newVoyages.forEach((newVoyage) => {
                if (!state.some((voyage) => voyage.id === newVoyage.id)) {
                  state.push(newVoyage)
                  storeVoyage(newVoyage)
                }
              })
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

export const { addVoyage, removeVoyage, closeVoyage, addDay } = voyageSlice.actions
export default voyageSlice.reducer