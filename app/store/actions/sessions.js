import {SESSIONS, STARTSESSION, STOPSESSION, DELETE} from "./types"
import axios from "axios"
const url = "http://thanos2api.herokuapp.com"


export const startSession = () => async dispatch => {
    try {
        const res = await axios.post(url + "/sessions/start")
        dispatch({
            type: STARTSESSION,
            payload: res.data._id
        })
    }catch(err){
        console.error("startSession", err)
    }
}

// TODO: this endpoint bugs or something
export const stopSession = (id) => async dispatch => {
    try {
        const stopUrl = url + "/session/" + id + "/stop"
        const res = await axios.post(stopUrl)
        dispatch({
            type: STOPSESSION,
            payload: res.data
        })
    }catch(err){
        console.error("startSession", err)
    }
}

export const deleteSession = (id) => async dispatch => {
    try {
        const deleteUrl = url + "/session/" + id + "/delete"
        const res = await axios.post(deleteUrl)
        console.log(id)
        dispatch({
            type: DELETE,
            payload: id
        })
    }catch(err){
        console.error("startSession", err)
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

