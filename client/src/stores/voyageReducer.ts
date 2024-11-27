import { VoyageType } from "@/pages/app/types";

const ADD_VOYAGE = 'ADD_VOYAGE'
const DELETE_VOYAGE = 'DELETE_VOYAGE'
const CLOSE_VOYAGE = 'CLOSE_VOYAGE'
const ADD_VOYAGE_DAY = 'ADD_VOYAGE_DAY'

export const addVoyage = (voyage : VoyageType) => ({
    type: ADD_VOYAGE,
    payload: voyage
})

export const closeVoyage = (id : number) => ({
    type: CLOSE_VOYAGE,
    payload: id
})

export const deleteVoyage = (id : number) => ({
    type: DELETE_VOYAGE,
    payload: id
})

export const addVoyageDay = (id: number) => ({
    type: ADD_VOYAGE_DAY,
    payload: id
})

export function VoyageReducer(state: VoyageType[] | null = null, action) {
    switch(action.type) {
        case 'ADD_VOYAGE':
            if(!state) {
                return { id: 0, ...action.payload }
            }
            return [ ...state, { id: state.length - 1, ...action.payload } ]
        case 'DELETE_VOYAGE':
            return state?.map(voyage => { if(voyage.id !== action.payload) return voyage })
        case 'CLOSE_VOYAGE':
            return state?.map(voyage => {
                if(voyage.id === action.payload) voyage.ended_at  = Date.now().toString()
                return voyage
            })
        default:
            return state
    }
}

