import axios from 'axios'; 

const API_KEY = 'b943bdd666e6e1615e575f1e62d4455c'; 
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER'; 

export function fetchWeather(city) {
	const url = `${ROOT_URL}&q=${city},sg`;
	const request = axios.get(url); //returns a promise which is returned on the payload key

	console.log('Request:', request); 

	return {
		type: FETCH_WEATHER,
		payload: request // the promise is returned in the payload key 
	}; 
}