import { FETCH_WEATHER } from '../actions/index'; 

export default function(state = [], action) {
	switch (action.type) {
	case FETCH_WEATHER: 
		return state.concat(action.payload.data); // identical to the line below 
		return [ action.payload.data, ...state ]; // identical to the line above (ES6 spread operator)
	}
	return state; 
}