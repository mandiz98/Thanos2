import React from "react"
import AppContainer from "./navigation/index"
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'

const initialState = {}
const middleware = [thunk]

import sessions from "./store/reducers/sessions"

const rootReducer = combineReducers({sessions});

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default function App(){
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

