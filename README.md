# Redux Part 2 (Udemy Stephen Grider)

### Component Setup

- src/containers/search_bar.js:

```javascript
import React, { Component } from 'react'; 

export default class SearchBar extends Component {
	render() {
		return (
			<form className="input-group">
				<input />
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Submit</button>
				</span>
			</form>

			); 
	}
}
```
__________________________________________________

### Controlled Components and Binding Context

- Then, we want to turn the input to a controlled field 
- A **controlled field** is a form element where the value of the input is set by the **state of our component** and not the other way around
- Initialize state first, add onChange property and onInputChange event handler to <input>. Bind **this** for onInputChange in the constructor: 
```javascript
import React, { Component } from 'react'; 

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' }
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		console.log(event.target.value);
		this.setState({ term: event.target.value});
	}

	render() {
		return (
			<form className="input-group">
				<input 
					placeholder="Get a five-day forecast in your favourite cities"
					className="form-control"
					value={this.state.term}
					onChange={this.onInputChange}
				/>
				<span className="input-group-btn">
					<button type="submit" className="btn btn-secondary">Submit</button>
				</span>
			</form>

			); 
	}
}
```

__________________________________________________

### Form Elements in React

- SearchBar was created out of a form element and hence when we click submit or press enter, the browser makes a post request and re-renders the app after that which clears the form out 
- This is the normal HTML form behaviour
- However, we don't want that for our SearchBar 
- We can prevent this behaviour by adding an **event handler**

```javascript
	onFormSubmit(event) {
		event.preventDefault(); 
		// this tells the browser not to submit the form
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="input-group">
			...
			) }
```
- So, why use a **form element** at all? Why not just use a <div>? 
- Because we get some free functionality from using a form 
- Whenever a user sees a SearchBar they have an expectation that they can be able to type something in and then press enter on the keyboard or click submit. When we use a form element, we get those behaviour for free
- We don't have to set up an event handler to for those 
- Just remember to prevent default 

__________________________________________________

### Working with Weather API (openweathermap.org/forecast5)

- Free API to grab weather data in the next 5 days 
- Need to sign up to get API key
- Added **const API_KEY ='';** in src/actions/index.js

__________________________________________________

### Introduction to Middleware

- Doing AJAX requests in Redux is complicated the **first** time you do it 
- **Middlewares** are **functions** that take an **action**, and depending on the action's type/payload or any number of factors, the middleware can choose to let the action pass through, or manipulate it, or console.log it or even stop it altogether before the action reaches any reducers
- Think of Middlewares as gatekeepers between an action getting to reducers 
- All actions we create flow through middlewares which can modify our action 
- We can have many different steps of middleware in our application 

- Install **redux-promise** npm package to help to handle AJAX requests in our application 
- $ npm install --save redux-promise
- Hook it into our app in **src/index.js**:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise'; 

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
//applyMiddleware(ReduxPromise) -> to hook ReduxPromise middleware to our application 

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
```
__________________________________________________

### AJAX Requests with Axios 

- We only change our application state through actions and reducers 
- So to load our weather data (via changing the application state and add weather data), we need to call an action creator to dispatch an action. This is reponsible for making the AJAX request
- Create an action creator which is responsible for fetching our weather API data
- src/actions/index.js: 

```javascript
const API_KEY = 'b943bdd666e6e1615e575f1e62d4455c'; 

export const FETCH_WEATHER = 'FETCH_WEATHER'; 

export function fetchWeather() {
	return {
		type: FETCH_WEATHER
	}; 
}
```

- we do this: **const FETCH_WEATHER = 'FETCH_WEATHER'** to keep our action types consistent between our actions and reducers 
- To make our API request, we need to put together the correct URL

- src/actions/index.js: 
```javascript
const API_KEY = 'b943bdd666e6e1615e575f1e62d4455c'; 
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER'; 

export function fetchWeather(city) {
	const url = `${ROOT_URL}&q=${city},us`;

	return {
		type: FETCH_WEATHER
	}; 
}
```
- Then, we need to make our AJAX request
- **Axios** is a library that is solely made for making AJAX requests from the broswer
- $ npm install --save axios
- updated: 

```javascript
import axios from 'axios'; 

const API_KEY = 'b943bdd666e6e1615e575f1e62d4455c'; 
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER'; 

export function fetchWeather(city) {
	const url = `${ROOT_URL}&q=${city},us`;
	const request = axios.get(url); 

	return {
		type: FETCH_WEATHER
		payload: request 
	}; 
}
```
- we import **axios** at the top and then use **axios.get(url)** to **get** and fetch the data. This returns a **promise** which is assigned to the variable **request**
- Then add **request** to **payload** property


__________________________________________________

### Redux Promise in Practice 

- Need to wire up the SearchBar such that when a user enters a search and hits enter, we fire up the **action creator** and make our actual API request
- That means that we need to connect the SearchBar container to Redux using the **connect** method from the **react-redux** library 
- We are also going to bind the **action creator** (**FETCH_WEATHER**) as a property to the container 


```javascript

```





















