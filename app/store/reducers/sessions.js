import {SESSIONS, STARTSESSION, STOPSESSION, DELETE} from "../actions/types"

// redux reducer
// Sets the initial state of global variables that can be accessed anywhere.
const initialState = {
    sessions: [],
    currentSessionId: "",
}

// Depending on what the redux action function that are executed will the data inside the variable above be updated. 
export default function(state = initialState, action){
    const {
        type,
        payload
    } = action
    switch(type){
        case SESSIONS:
            // sessions will update and contain all the sessions from the database.
            return{
                ...state,
                sessions: payload
            }
        case STARTSESSION:
            return{
                // The id of a started session is stored here, coming from the startSession action. 
                ...state,
                currentSessionId: payload,
            }
        case STOPSESSION:
            return{
                // When a session is stopped the stopSession action will update the database.
                // This however will update the sessions locally. The newly added session will appear in the "visualize.js" list in real-time
                sessions: [...state.sessions, payload],
                currentSessionId: "",
            }
        case DELETE:
            return{
                // This will remove the targeted session from the local sessions array.
                ...state,
                sessions: state.sessions.filter(sessions => payload !== sessions._id)
            }
        default:
            return state
    }
}