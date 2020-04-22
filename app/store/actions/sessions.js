import {SESSIONS, CURRENTSESSION} from "./types"
import axios from "axios"
const url = "http://thanos2api.herokuapp.com"


export const startSession = () => async dispatch => {
    try {
        const res = await axios.get(url + "/sessions")
        dispatch({
            type: SESSIONS,
            payload: res.data
        })
    }catch(err){
        console.error("getSessions", err)
    }
}

export const getSessions = () => async dispatch => {
    try {
        const res = await axios.get(url + "/sessions")
        dispatch({
            type: SESSIONS,
            payload: res.data
        })
    }catch(err){
        console.error("getSessions", err)
    }
}

