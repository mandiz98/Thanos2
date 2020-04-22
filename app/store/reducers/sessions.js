import {SESSIONS, STARTSESSION, STOPSESSION} from "../actions/types"

const initialState = {
    sessions: [],
    currentSessionId: "",
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
        case STARTSESSION:
            return{
                ...state,
                currentSessionId: payload,
            }
        case STOPSESSION:
            return{
                sessions: [...state.sessions, payload],
                currentSessionId: "",
            }
        default:
            return state
    }
}