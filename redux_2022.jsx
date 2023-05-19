// create "store" folder inside "src" folder and add these lines :
// create "reducers" folder inside "store" folder :

import {createStore} from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(counterReducer)

export default store

// inside index.js where <App /> component is found, you need to :

import {provider} from "react-redux";
import store from "./store/store";

<Provider store={store}>
    <App />
</Provider>

// create inside "src/store/reducers" a file named as "counterReducer.js":

init_state = {count: 0};

const counterReducer = (state = init_state, action) => {
    return state
}

export default counterReducer

// create inside "src/store" a new folder with name "actions"
// create types.js inside this folder

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"

// now, inside counterReducer.js, adjust method :

import {INCREMENT, DECREMENT} from "../actions/types"

const counterReducer = (state = init_state, action) => {

    switch(action.type){
        case INCREMENT:
            return {...state, count: state.count + 1} ;
        case DECREMENT:
            return {...state, count: state.count - 1}  ;
        default:
            return state
    }

}


// now, go to "components/Counter.js" and add your redux-hooks as follows :

import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";

function Counter () {

    const count_state_from_reducer = useSelector(state => state.count);
    // another way to write the above line by destructing :
    // const {count_state_from_reducer = useSelector(state => state)}
    const dispatch_actions_to_reducer = useDispatch();


    const handleIncrement = () => {
        dispatch_actions_to_reducer({
            type: INCREMENT
        })
    }
    

    const handleDecrement = () => {
        dispatch_actions_to_reducer({
            type: DECREMENT
        })
    }

    return (
        <div>
             <p> { count_state_from_reducer } </p>
             <buttom onClick={handleIncrement}> Increment </buttom>
             <buttom onClick={handleDecrement}> Decrement </buttom>

        </div>
        )

}

export default Counter;

// install redux.devTools chrome extension and then attach it to your redux store as follows :
// in "store.js":

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(counterReducer, enhancer());

// Action creators is a function that return a type of action, and you separate it in a file
// inside actions folder with name actionCreators.js
// then , open "scr/redux/actions/actionCreators.js" and add these lines :
import {INCREMENT, DECREMENT} from "./types";

export const incrementAcionCreator = () => {
    return {
            type: INCREMENT
        }
}

export const decrementAcionCreator = () => {
    return {
            type: DECREMENT
        }
}

// now in the Counter.js, modify the dispatch functions :
import {incrementAcionCreator, decrementAcionCreator} from "../store/actions/actionCreators";

function Counter () {

    const count_state_from_reducer = useSelector(state => state.count);
    // another way to write the above line by destructing :
    // const {count_state_from_reducer = useSelector(state => state)}
    const dispatch_actions_to_reducer = useDispatch();


    const handleIncrement = () => {
        dispatch_actions_to_reducer(
            incrementAcionCreator();
            )
    }
    
    const handleDecrement = () => {
        dispatch_actions_to_reducer(
            decrementAcionCreator();
            )
    }

    return (
        <div>
             <p> { count_state_from_reducer } </p>
             <buttom onClick={handleIncrement}> Increment </buttom>
             <buttom onClick={handleDecrement}> Decrement </buttom>

        </div>
        )

}

export default Counter;

///////////////////////////////////////////////
// how to send "payload" to store and reducers :
///////////////////////////////////////////////

// in types.js:
export const INCREMENT_BY_PAYLOAD = "INCREMENT_BY_PAYLOAD"

// now, inside counterReducer.js:
    switch(action.type){
        case INCREMENT:
            return {...state, count: state.count + 1} ;
        case DECREMENT:
            return {...state, count: state.count - 1}  ;
        case INCREMENT_BY_PAYLOAD:
            return {...state, count: state.count + action.payload}  ;
        default:
            return state
    }

// then , open "scr/redux/actions/actionCreators.js" and add these lines :
export const incrementByPayloadAcionCreator = (payload) = {
        return {
            type: INCREMENT_BY_PAYLOAD,
            payload: payload
        }
}

// now, go to "components/Counter.js" and add your redux-hooks as follows :
    const handleIncrementByPayload = (payload) => {
        dispatch_actions_to_reducer(
            incrementByPayloadAcionCreator(payload);
            )
    }

    return (
        <div>
             <p> { count_state_from_reducer } </p>
             <buttom onClick={handleIncrement}> Increment </buttom>
             <buttom onClick={handleDecrement}> Decrement </buttom>
             <buttom onClick={() => handleIncrementByPayload(3)}> Decrement </buttom>
        </div>
        )

///////////////////////////////////////////////
// how to use redux thunk :
///////////////////////////////////////////////

// npm install redux-thunk
// now, in store.js , import these functions from redux:

import { createStore, applyMiddleware } from "redux";
import counterReducer from "./reducers/counterReducer";
import reduxThunk from "redux-thunk";


const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(counterReducer, enhancer(applyMiddleware(reduxThunk)));

// then , open "scr/redux/actions/actionCreators.js" and edit these lines :

export const incrementByPayloadAcionCreator = async (payload, dispatch) => {
    return dispatch({
        type: INCREMENT_BY_PAYLOAD,
        payload: payload
    })
}

// now, go to "components/Counter.js" and add your redux-thunk as follows :
    const handleIncrementByPayload = (payload) => {
        incrementByPayloadAcionCreator(payload, dispatch_actions_to_reducer);
    }

// by applying thunk, you'll be able to use async function and also create action and dispatch
// in the same file (action creator) and send action creator directly to reducer to modify state.

///////////////////////////////////////////////
// how to handle multiple reducers in the same time :
///////////////////////////////////////////////

// go to reducers folder and create a new file with name : userReducer.js

import {ADD_USER, REMOVE_USER} from "../actions/types"

const userReducer = (state = init_state, action) => {

    switch(action.type){
        case ADD_USER:
            return { ...state } ;
        case REMOVE_USER:
            return { ...state }  ;
        default:
            return state
    }

}

export default userReducer

// go to reducers folder and create a new file with name "index.js",
// to contain all your reducers in one place :

import {combineReducers} from "redux";
import counterReducer from "./counterReducer"
import userReducer from "./userReducer"

export default combineReducers({
        combined_counter: counterReducer,
        combined_user: userReducer
    })

// now go to store.js and remove counterReducer and replace it with combineReducers :
import combineReducers from "./reducers/combineReducers"

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(combineReducers, enhancer(applyMiddleware(reduxThunk)));

// now go to Counter.js to edit the function that holds the state to specify which
// state exactly are you going to use, since you have multiple states from multiple
// reducers (counter, user, company, ......)
// NOTE, we use the same key we provided in "combineReducers" in index.js :
const count_state_from_reducer = useSelector(state => state.combined_counter);
