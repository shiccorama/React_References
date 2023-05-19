//////////// Create a Redux Store :
// // The Redux store is an object which holds and manages application state.
// There is a method called createStore() on the Redux object, which you use 
// to create the Redux store. This method takes a reducer function as a required argument.
// The reducer function is covered in a later challenge, and is already defined for you
// in the code editor. It simply takes state as an argument and returns state.

const reducer = (state = 5) => {
  return state;
}

const store = Redux.createStore(reducer);

//////////// Get State from the Redux Store :

const store = Redux.createStore(
  (state = 5) => state
);
// we've replaced "reducer" with "(state = 5) => state"
const currentState = store.getState();

//////////// Define a redux action :
// Think of Redux actions as messengers that deliver information about events happening in
// your app to the Redux store.The store then conducts the business of updating state based 
// on the action that occurred.

const action = {type: "LOGIN"};

//////////// Define an Action Creator:
// An action creator is simply a JavaScript function that returns an action. 
// In other words, action creators create objects that represent action events.

const actionCreator = () =>{
  return action;
}

//////////// Dispatch an Action Event :
// the following lines are equivalent, and both dispatch the action of type LOGIN:

store.dispatch(actionCreator());
store.dispatch({ type: 'LOGIN' });

// here, we initialized store with login "reducer" with default = "false"
const store = Redux.createStore(
  (state = {login: false}) => state
);

// here, action creater called loginAction() which returns an action of type (LOGIN)
const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};

// Dispatch the action here:
store.dispatch(loginAction());

//////////////// Handle an action in the store :
// A reducer takes state and action as arguments, and it always returns a new state. It is 
// important to see that this is the only role of the reducer. It has no side effects 
// — it never calls an API endpoint and it never has any hidden surprises. 
// Another key principle in Redux is that state is read-only. In other words, the
//  reducer function must always return a new copy of state and never modify state directly.

const defaultState = {
  login: false
};

const reducer = (state = defaultState, action) => {
  // Change code below this line
  if (action.type === "LOGIN") {
    return {login: true};
  } else {
    return state;
  }
  // Change code above this line
};

const store = Redux.createStore(reducer);

const loginAction = () => {
  return {
    type: 'LOGIN'
  }
};


/////////// Use a Switch Statement to Handle Multiple Actions :

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  // Change code below this line
  switch (action.type) {
  case 'LOGIN':
   return {authenticated: true};
    break;
  case 'LOGOUT':
   return {authenticated: false};
    break;
  default:
    return state;
  }
  // Change code above this line
  
};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: 'LOGIN'
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
};

///////// always use const for action types as they are read-only values :


const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const defaultState = {
  authenticated: false
};

const authReducer = (state = defaultState, action) => {

  switch (action.type) {
    case LOGIN: 
      return {
        authenticated: true
      }
    case LOGOUT: 
      return {
        authenticated: false
      }

    default:
      return state;

  }

};

const store = Redux.createStore(authReducer);

const loginUser = () => {
  return {
    type: LOGIN
  }
};

const logoutUser = () => {
  return {
    type: LOGOUT
  }
};

//////////// register a store listener such as "store.subscribe()"  :

const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch(action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

// Global count variable:
let count = 0;
// Change code below this line
const addToCount = () => { 
  return count += 1 
};
store.subscribe(addToCount);
// Change code above this line

store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);
store.dispatch({type: ADD});
console.log(count);

//////////// combine multiple reducers by using Redux.CombineReducers() :

// Typically, it is a good practice to create a reducer for each piece of application state when they are distinct or
// unique in some way. For example, in a note-taking app with user authentication, one reducer could
// handle authentication while another handles the text and notes that the user is submitting. 
// For such an application, we might write the combineReducers() method like this:

const rootReducer = Redux.combineReducers({
  auth: authenticationReducer,
  notes: notesReducer
});

// full example :
// first reducer :
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

// second reducer :
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = {authenticated: false}, action) => {
  switch(action.type) {
    case LOGIN:
      return {
        authenticated: true
      }
    case LOGOUT:
      return {
        authenticated: false
      }
    default:
      return state;
  }
};

// combine the two reducers :
const rootReducer = Redux.combineReducers({
  auth: authReducer,
  count: counterReducer
});

// pass combined reducers to the store :
const store = Redux.createStore(rootReducer);


//////// send action data to store :

const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch(action.type) {
    // Change code below this line
    case ADD_NOTE:
      return action.text
    // Change code above this line
    default:
      return state;
  }
};

const addNoteText = (note) => {
  // Change code below this line
return {
  type: ADD_NOTE,
  text: note,
}
  // Change code above this line
};

const store = Redux.createStore(notesReducer);

console.log(store.getState());
store.dispatch(addNoteText('Hello!'));
console.log(store.getState());


///////////// Use Middleware to Handle Asynchronous Actions (( Redux Thunk middleware )):

const REQUESTING_DATA = 'REQUESTING_DATA'
const RECEIVED_DATA = 'RECEIVED_DATA'

const requestingData = () => {
   return {type: REQUESTING_DATA}
    }
const receivedData = (data) => { 
  return {type: RECEIVED_DATA,
          users: data.users
          }
    }

const handleAsync = () => {
  return function(dispatch) {
    // Dispatch request action here
    dispatch(requestingData());

    setTimeout(function() {
      let data = {
        users: ['Jeff', 'William', 'Alice']
      }
      // Dispatch received data action here
    dispatch(receivedData(data));
    }, 2500);
  }
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch(action.type) {
    case REQUESTING_DATA:
      return {
        fetching: true,
        users: []
      }
    case RECEIVED_DATA:
      return {
        fetching: false,
        users: action.users
      }
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);

///////////// Write a Counter with Redux :

const INCREMENT = "INCREMENT"; // Define a constant for increment action types
const DECREMENT = "DECREMENT"; // Define a constant for decrement action types

const counterReducer = (state = 0, action) => {
    switch(action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}; 
// Define the counter reducer which will increment or decrement the state based on the action it receives

const incAction = () => {
  return {
    type: INCREMENT
  }
}; // Define an action creator for incrementing


const decAction = () => {
  return {
    type: DECREMENT
  }
}; // Define an action creator for decrementing

const store = Redux.createStore(counterReducer); // Define the Redux store here, passing in your reducers

//////////// Never mutate state :

const ADD_TO_DO = 'ADD_TO_DO';

// A list of strings representing tasks to do:
const todos = [
  'Go to the store',
  'Clean the house',
  'Cook dinner',
  'Learn to code',
];

const immutableReducer = (state = todos, action) => {
  switch(action.type) {
    case ADD_TO_DO:
      // Don't mutate state here or the tests will fail
      // you can use state.concate(action.todo) or state.slice(action.todo)
      return [...state,action.todo];
    default:
      return state;
  }
};

const addToDo = (todo) => {
  return {
    type: ADD_TO_DO,
    todo
  }
}

const store = Redux.createStore(immutableReducer);

///////// Remove an item from an array using two methods :
///////// first method :
const immutableReducer = (state = [0, 1, 2, 3, 4, 5], action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      // don't mutate state here or the tests will fail
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1, state.length)
      ];
    // or return state.slice(0, action.index).concat(state.slice(action.index + 1, state.length));
    default:
      return state;
  }
};

const removeItem = index => {
  return {
    type: "REMOVE_ITEM",
    index
  };
};

const store = Redux.createStore(immutableReducer);
///////////////// second method :
const immutableReducer = (state = [0, 1, 2, 3, 4, 5], action) => {
  switch (action.type) {
    case 'REMOVE_ITEM':
      // Don't mutate state here or the tests will fail
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

const removeItem = (index) => {
  return {
    type: 'REMOVE_ITEM',
    index
  }
}

const store = Redux.createStore(immutableReducer);


////////////// Copy an Object with Object.assign :

const defaultState = {
  user: 'CamperBot',
  status: 'offline',
  friends: '732,982',
  community: 'freeCodeCamp'
};

const immutableReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'ONLINE':
      // Don't mutate state here or the tests will fail
  return Object.assign({}, state, {status: 'online'});
    default:
      return state;
  }
};

const wakeUp = () => {
  return {
    type: 'ONLINE'
  }
};

const store = Redux.createStore(immutableReducer);
