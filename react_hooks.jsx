import "React", {useState} from "react";

function testComponent ({x,y}) {
	const [product, setProduct] = useState("laptop");
	return(
		<div>
			<button onClick={()=> setProduct("mouse")}> change product</button>
			{product}
			{x} + {y}
		</div>
		)

}

export default testComponent;

{/* 
now, let's see:
1- we destruct testComponent(props) to testComponent({x,y}) instead of writing new line
const {x, y} = props , and also we DONT use this.props , because it belongs to class-based
component.
2- we use hooks const[product, setProduct] instead of
state = {
	product: "laptop"
}
and we pass value to useState("laptop")
3- instead of writing function handleClick(){ setProduct("mouse") }, we cut
it and paste it in onClick() function directly and use arrow function to give
control and stop function initialization.
 */}

function testComponent ({x,y}) {

	const [items, setItems] = useState([
		{id:1, name: "laptop"},
		{id:2, name: "mouse"},
		{id:3, name: "monitor"}
		]);
	const addAnotherItem = () => {
		setItems([...items, {id:4, name: "camera"}])
	}
	return(
		<div>
			<button onClick={addAnotherItem} > add item </button>
			{items.map(item => <span key={item.id}> {item.name} </span>)}
			{x} + {y}
		</div>
		)
}

{/* 
here, we can use multiple items as state and map through them, note that state is array of objects.
we can add another object by using arrow function addAnotherItem() but this function will replace
the old state with the new item added, so in order to avoid this, we will pass the spread operator
for the old array, then we will add our new item. at the button, we call on the function by using
onClick={addAnotherItem}
*/}

function testComponent ({x,y}) {

	const [addValue, setAddValue] = useState("");
	const handleChange = (event) => {
		setAddValue(event.target.value)
	}
	return(
		<div>
			<input type="text" onChange={handleChange} />
			{addValue}
			{x} + {y}
		</div>
		)
}

{/* 
here, we can use change-event to capture a value from input field and set it to our state
by using setAddValue(e.target.value). Also, we can use arrow function inside onChange directly
if we don't want to add handleChange function.
*/}

import "React", {useState, useEffect} from "react";

function testComponent ({x,y}) {

	const [addValue, setAddValue] = useState("");
	const handleChange = (event) => {
		setAddValue(event.target.value)
	}

	const [name, setName] = useState("Hassan");

	useEffect(() => {
		console.log("useEffect replaces componentDidMount && componentDidUpdate");
	},[name])


	return(
		<div>
			<input type="text" onChange={handleChange} />
			{addValue}
			<span> my name is {name}</span>
			{x} + {y}
		</div>
		)
}

{/* 
here, useEffect replaces two class-based functions(componentDidMount, componentDidUpdate),
componentDidMount is loaded after the component loaded/mounted, and componentDidUpdate will
load when changes happen in the DOM. useEffect also will load when component mounted and also
when any change happens to the DOM, but by passing the second argument [name], you restrict this
update to only happens when [name] has changed, so if [addValue] changes nothing will happen.
Also, you can pass multiple arguments like [name,addValue] to update state with useEffect.
 */}

 import "React", {useState, useEffect} from "react";
 import "axios" from "axios";

function testComponent () {

	const [posts, setPosts] = useState([]);

	const data_from_api = axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {setPosts(res.data)}).catch((err) => console.log(err));

	useEffect(() => {data_from_api},[])

	return(
		<div>
			{posts.map((post) => 
				<div key={post.id}>
					{post.id} -> {post.title}
				</div>
				)}
		</div>
		)
}

{/* 
now, after knowing how to use useState and useEffect, let's fetch fake api from jsonplaceholder
by using axios and then store posts in empty array into response and get data from it. Also we add 
catch() to get any possible error message. Then, we use useEffect to update/setPosts into this empty
array. After that, to display posts, we've mapped over the posts array to get id and title.
 */}


 function testComponent () {

	const [post, setPost] = useState({});
	const [id, setId] = useState(1);

	const data_from_api = axios.get(`https://jsonplaceholder.typicode.com/post/${id}`).then((res) => {setPost(res.data)}).catch((err) => console.log(err));

	useEffect(() => {data_from_api},[id])

	return(
		<div>
			<input type="text" value={id} onChange=((e) => {setId(e.target.value)}) />
			<div key={post.id}>
				{post.id} -> {post.title} -> {post.body}
			</div>
		</div>
		)
}


{/*
 as you can see, we've got 2 states, one for fetching post, and one for specific id which we will fetch its post. First, we change "" to `` to add this `post/${id}` which will fetch post by id. then we store the post into response.data. Note that setPost-useState({}) accept {object} not [array of objects]. Another thing to mention, setId-useState(1) passed as id=1 to avoid getting error. In addition to this, you have only one post, so you don't need to map over it {it's an object not array}, and you set value={id} with onChange function (setId(e.target.value)). Dont forget that we passed [id] as a second argument because every time you (onChange) the value of id, post will get updated.
  */}

 import "React", {useState, useEffect} from "react";
 import "axios" from "axios";

	function App () {
		return(
			<div className="App">
				<p> Main App Component </p>
				<Widget />
			</div>
			)
	}

	function Widget () {
	 	return(
	 		<div className="Widget">
	 			<p> Widget Component </p>
	 			<Items />
	 		</div>
	 		)
	}

	function Items () {
	 	return (
	 		<div className="Items">
	 			<p>Items Component</p>
	 		</div>
	 		)
	}

{/* 
we have main component as App and we have child component as Widget and grand-child component as Items. Items will be displayed inside Widget and Widget will be displayed inside app. We need to pass a props from app to Items directly without passing it to Widget. So, we will use old createContext() function as follows : 
*/}

import "React", {useState, useEffect, createContext} from "react";

const [product, setProduct] = useState("laptop")

export const ProductContext = createContext();

  function App () {
	return(
		<ProductContext.Provider value={product}>
			<div className="App">
				<Widget />
			</div>
		</ProductContext.Provider>
		)
}


import "React", {useState, useEffect, createContext} from "react";
import {ProductContext} from "../App";

function Items () {
 	return (
 		<ProductContext.Consumer>
	 		{
	 			(product) => <div> {product} </div>
	 		}
 		</ProductContext.Consumer>
 		)
 }

{/* we can replace the </ProductContext.Consumer> with hook-context as follows  : */}

import "React", {useState, useEffect, createContext} from "react";
import {ProductContext} from "../App";

const hookContext = useContext(ProductContext)

function Items () {
 	return (
 		<div>
 			{hookContext}
 		</div>
 		)
 }

{/* note that , by using hookContext we avoid nesting context tags inside like this   :

	 	<ProductContext.Consumer>
	 		<itemContext.Consumer>
	 			<toolContext.Consumer>

	 			</toolContext.Consumer>
	 		</itemContext.Consumer>
 		</ProductContext.Consumer>

and replace all of these with -> 
const hookContext1 = useContext(ProductContext)
const hookContext2 = useContext(itemContext)
const hookContext3 = useContext(toolContext)

 */}

import "React", {useState, useEffect, useRef} from "react";

function App () {

	const [user, setUser] = useState("");

	const refInput = useRef();

	useEffect(() => {
		refInput.current.focus();
		refInput.current.value = "add any value of your choice"
	})

	return (
		<div className="App">
			<input type="text" ref={refInput} onChange={(e) => setUser(e.target.value)}>
			{user}
		</div>
		)
}

{/*
useRef is used to choose an element like (getElementById) and make it either for focus(),
which is usually <input field> or to set count for how many renders happen to the page.
The above example is to set input as refInput and apply useEffect() with focus().
 */}

import "React", {useState, useEffect, useRef} from "react";

function App () {

	const [user, setUser] = useState("");

	const counter = useRef(0);

	const refInput = useRef();

	useEffect(() => {
		refInput.current.focus();
		refInput.current.value = "add any value of your choice";
		counter += 1;
	},[user])

	return (
		<div className="App">
			<input type="text" ref={refInput} onChange={(e) => setUser(e.target.value)}>
			{user}
			{counter.current}
		</div>
		)
}

{/*
the above example of useRef() is to choose another element (counter) and set its initial value to zero, then whenever you change user-input, the counter will be updated by useEffect and add one to it.
We can always trace the counter by its " current " property.
NOTE : we always use (refInput.current.value) to assign values, not (refInput.value).
 */}

import "React", {useState, useEffect, useRef, useReducer} from "react";
import "axios" from "axios";

const state = {
	users : [],
}

const ADD_USER = "ADD_USER";
const REMOVE_USERS = "REMOVE_USERS";
const FETCH_USERS = "FETCH_USERS";
const ERROR = "ERROR";


const reducer = (state, action) => {
	switch(action.type) {
		case (ADD_USER):
			return {users: [...state.users, "hamza" ]};
		case (REMOVE_USERS):
			return {users: []};		
		case (FETCH_USERS):
			return {users: action.data};
		case (ERROR):
			return {users: [], error: error.data };
		default:
			return state;
	}
}



function App () {

	const [state, dispatch] = useReducer(reducer, state);

	const data_from_api = axios.get(`https://jsonplaceholder.typicode.com/post`).then((res) => {dispatch({type: FETCH_USERS, data: res.data })}).catch((error) => {dispatch({type: ERROR, error: error.data })});

	useEffect(() => {data_from_api},[users])

	return (
		<div className="App">
			<button onClick={()=>{dispatch{type: ADD_USER}}}> Add User</button>
			<button onClick={()=>{dispatch{type: REMOVE_USERS}}}> Remove All Users</button>
			{state.error && <p>{state.error}</p>}
			{state.users.length ? state.users.map((user) => <div key={Math.random()} >{user.name}</div>) : "There is no users found!"}
		</div>
		)
}


{/*
the above example of useReducer() is referring to Redux, where you have 3 elements (initial state + reducer + action)
first, we provide initial state, and constants for action, then we define reducer function with switch statments to recieve
action dispatches. After dispatching the constant type from the button, the action goes to the reducer to manipulate the initial
state. Note that we can fetch users.state from jsonplaceholder and display its names by using map() function. 
 */}


import "React", {useState, useEffect, useRef, useReducer} from "react";

function Parent () {
	return(
		<div  className="Parent">
			<Child />
		</div>
		)
}


import "React", {useState, memo} from "react";

function Child () {

	console.log("Child Memoization");


	return(
		<div  className="Child">
			<p>this is child component</p>
		</div>
		)
}

export default memo(Child);

{/*
At first, when Parent component renders, it will render the child component, and with every change to parent, child
component will re-render as well. So, in order to prevent the unnecessary re-rendering of the child component, we can use
memo(Child), this will prevent re-render unless there is (props) form parent to child or vice versa.
Note that, even if you use memo(Child) and you send (props) form parent to child, (Child) component will be re-rendered.
 */}

 import "React", { useState, useCallback } from "react";
 import Child from "./Components/Child";

 const [user, setUser] = setState("");
 const [counter, setCounter] = setState(0);

 const updateCounter = () => setCounter(counter + 1) ;

function Parent () {
	return(
		<div  className="Parent">
			{counter}
			<button onClick={() => setCounter(counter+1)}> Add to counter from Parent Component</button>
			<input type="text" onChange={ (e) => setUser(e.target.value) } />

			<Child counter={counter} updateCounter={updateCounter}/>
			}
		</div>
		)
}

export default app;

import "React", {useState, memo} from "react";

function Child (props) {

	console.log("Child Memoization");

	return(
		<div  className="Child">
			<p>this is child component</p>
			{props.counter}
			<button onClick={() => props.updateCouter()}> Update counter from child component</button>
		</div>
		)
}

export default memo(Child);

{/*
let's see what happened here, we've made a function (updateCounter) to update counter from Child component, and we
sent this function by props. In the same time we've made memo(Child) to prevent re-render for child unless there is 
a change either in props.counter or props.updateCounter(). In case of changing <input> field in parent, it should NOT
affect child at all, but with closer look, we will see that console.log("Child Memoization") will increase in count with
every change in the input field??!!! why is that ?.... because every time parent component updates, the function updateCounter()
will be rendered, although it will NOT change the counter, but the function itself re-defined every time and this will affect on 
Child component and make it re-render and hence memo() function will not take effect. So, in order to avoid this, we need to use
useCallback() function to prevent the updateCounter() function from re-render as so :

 GoToLine(420) ---->  const updateCounter = useCallback(() => setCounter(counter + 1),[counter]) ;

 the second parameter of the useCallback(), which is [counter], means that child component will only updated/rendred if [counter]
 is updated. In case of updating [users], nothing will happen to Child component.

 */}

 import "React", { useState, useMemo, useCallback } from "react";
 function Child (props) {

	console.log("Child Memoization");

	const updateCounter = useCallback(() => setCounter(counter + 1),[counter]) ;

	const largeNumber = useMemo(() => {
		let num = 0;
		for(let i=0; i<20000; i++){
			num++
		}
		return num
		},[]);

	return(
		<div  className="Child">
			<p>this is child component</p>
			{props.counter}
			<button onClick={() => props.updateCouter()}> Update counter from child component</button>
			{largeNumber}
		</div>
		)
}

{/* 
Difference between useCallback() and useMemo() is that useCallback() prevents re-render of the initialization
of the function itself not the return of this function, while useMemo() prevents re-render of the output/return of 
largeNumber() function. It means when largeNumber() calls, if the output of it will not change, no re-render will happen,
and hence useMemo() will cache values of largeNumber() function.
  */}

{/* 
Difference between useEffect() and useLayoutEffect() is in the process steps:
- in useEffect(), which is working Asynchronously :
1- react render DOM
2- screen painted with HTML
3- useEffect() runs and displays its logic

- in useLayoutEffect(), which is working Synchronously :
1- react render DOM
2- useLayoutEffect() runs and displays its logic
3- screen painted with HTML

In conclusion, if you want to run your logic BEFORE painting HTML, use useLayoutEffect(),
whereas if you want to run your logic AFTER painting HTML, use useEffect().

 */}


{/* implementing custom hooks is like making abstract function that can be used in separate components,
imagine that you have two components and you need to use the same logic in both, so you can use DRY concept where you 
don't repeat yourself and make custom hook that can be used in both components.
let's take a look here :
 */}

{/* custom hook named as useCounter() */}

import React, {useState} from "react";

const useCounter = (initialValue) => {

	const [counter, setCounter] = useState(initialValue);

	const increment = () => {setCounter(counter + 1)};

	const decrement = () => {setCounter(counter - 1)};

	return [counter, increment, decrement];
}

export default useCounter;

{/* importing useCounter() into App component */}

import React, {useState} from "react";
import useCounter from "./components/useCounter";

function App () {

	const [state, setState] = useState();
	const [counter, increment, decrement] = useCounter();



	return (
		<div className="App">
			<button onClick={increment}> + </button>
			<p> {counter} </p>
			<button onClick={decrement}> - </button>
		</div>
		)
}


{/* let's take another example of custom hooks */}
{/* let's create useAPI custom hook */}

import React, {useState, useEffect} from "react";
import axios from "axios";

const useAPI = (url) => {

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);


	useEffect(() => {
		setLoading(true);
		axios.get(url).then(res => {setLoading(false); setUsers(res.data)}).catch(error => {setLoading(false); setError("something went wrong!!!")})
	},[])

	return [users, loading, error];

}

export default useAPI ;

{/* importing useAPI() into App component */}

import React, {useState, useEffect} from "react";
import axios from "axios";
import useAPI from "./component/useAPI"


function App () {

	const [users, loading, error] = useAPI(`https://jsonplaceholder.typicode.com/posts`);

	return (
		<div className="App">
			{loading && <p>Loading image .....</p>}
			{users && users.map((user) => <div>{user.name}</div>)}
			{error && <p>{error.message}</p>}
		</div>
		)
}

export default App ;