import {SESSIONS, CURRENTSESSION} from "../actions/types"

const initialState = {
    sessions: [],
    currentSession: {}
}

export default function(state = initialState, action){
    const {
        type,
        payload
    } = action

    switch(type){
        case SESSIONS:
            return{
                ...state,
                sessions: payload
            }
        case CURRENTSESSION:
            return{
                ...state,
                currentSession: payload
            }
        default:
            return state
    }
}