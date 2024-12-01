import { VoyageType } from "@/features/api/types"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getVoyages } from "../api/services"

// Thunk pour récupérer les voyages
export const fetchVoyages = createAsyncThunk("voyage/fetchVoyages", async () => {
    try {
        const data = await getVoyages()
        return data.travels as VoyageType[]
    } catch (error) {
        console.error("Erreur lors de la récupération des voyages :", error)
        return []
    }
})

const initialState: { voyages: VoyageType[]; loading: boolean; error: string | null } = {
    voyages: [],
    loading: false,
    error: null
}

export const voyageSlice = createSlice({
    name: "voyage",
    initialState,
    reducers: {
        stateAddVoyage: (state, action: PayloadAction<VoyageType>) => {
            state.voyages.push(action.payload)
        },
        stateAnnulVoyage: (state, action: PayloadAction<number>) => {
            state.voyages = state.voyages.filter(voyage => voyage.id !== action.payload)
        },
        stateCloseVoyage: (state, action: PayloadAction<{ id: number; date: string }>) => {
            const voyage = state.voyages.find(voyage => voyage.id === action.payload.id)
            if (voyage) {
                voyage.ended_at = action.payload.date
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVoyages.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchVoyages.fulfilled, (state, action) => {
                state.loading = false
                state.voyages = action.payload
            })
            .addCase(fetchVoyages.rejected, (state) => {
                state.loading = false
                state.error = "Erreur lors du chargement des voyages."
            })
    },
})

export const {
    stateAddVoyage,
    stateAnnulVoyage,
    stateCloseVoyage
} = voyageSlice.actions

export default voyageSlice.reducer
