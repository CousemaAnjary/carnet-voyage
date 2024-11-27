import { UserType } from "@/pages/auth/types";

const initalState : UserType | null = null

type UserAction = 'ADD_USER' | null

function userReducer(state=initalState, action:UserAction) {
    switch(action) {
        case 'ADD_USER':
            break
        default:
            return state
    }
}