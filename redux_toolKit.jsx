// npm install @reduxjs/toolkit react-redux
// yarn add @reduxjs/toolkit react-redux

// go to store.js :

import {configureStore} from "@reduxjs/toolkit";
import combineReducers from "./reducers/combineReducers"

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

// const store = createStore(combineReducers, enhancer(applyMiddleware(reduxThunk)));

// instead of using createStore, we will use configureStore like this :

const store = configureStore({
    all_reducers: {
        combined_counter: counterReducer,
        combined_user: userReducer
    }
});

// Create a Redux State Slice:
// redux toolkit combines all of (reducers, actions, state) into one single file,
// you can call it slice of the logic you have (counter,user,company,...)
// now go to folder (store) and make a new file named "counterSlice.js"

import { createSlice } from '@reduxjs/toolkit'

const init_state = {
  count: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  init_state,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

// in redux, the reducer was holding state and actions i.e. const reducer(state,action)
// here in redux-toolkit, state moved out of reducer and reducer holds only (actions)
// so, slice will hold (name, state, reducer(actions)), then you need to edit store.js
// to enable configureStore instead of createStore and add counterSlice instead of counterReducer:

import counterSlice from "./counterSlice"
import userSlice from "./counterSlice"

const store = configureStore({
    all_reducers: {
        combined_counter: counterSlice,
        combined_user: userSlice,
    }
});

// now, in Counter.js, you have to edit dispatch and actions lines :

import { increment, decrement, incrementByAmount } from "./store/counterSlice";

const count_state_from_reducer = useSelector(state => state.combined_counter);
const dispatch_actions_to_reducer = useDispatch();

    const handleIncrement = () => {
        dispatch_actions_to_reducer(increment());
    }

    const handleDecrement = () => {
        dispatch_actions_to_reducer(decrement());
    }

    const handleIncrementByPayload = (payload) => {
        dispatch_actions_to_reducer(incrementByAmount(payload));
    }

////////////////////////////////////////////////////////////////////
// after applying redux toolkit, you don't need anything except the "store"
// where you keep (store.js + counterSlice.js + any extra slices you'll use)
// now, you can delete types.js, actions, action creators, and so on ...
////////////////////////////////////////////////////////////////////

/// updated store.js will be :

import {configureStore} from "@reduxjs/toolkit";
import counterSlice from "./counterSlice"
import userSlice from "./counterSlice"


const store = configureStore({
    reducers: {
        counter: counterSlice,
        user: userSlice
    }
});

/// updated counterSlice.js will be :

import { createSlice } from '@reduxjs/toolkit'

const init_state = {
  count: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  init_state,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    },
  },
})

/// updated Counter.js will be :
import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { increment, decrement, incrementByAmount } from "./store/counterSlice";

const count_state_from_reducer = useSelector(state => state.combined_counter);
const dispatch_actions_to_reducer = useDispatch();

    const handleIncrement = () => {
        dispatch_actions_to_reducer(increment());
    }

    const handleDecrement = () => {
        dispatch_actions_to_reducer(decrement());
    }

    const handleIncrementByPayload = (payload) => {
        dispatch_actions_to_reducer(incrementByAmount(payload));
    }