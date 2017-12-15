import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 

class WeatherList extends Component {
	renderWeather(cityData){
		const name = cityData.city.name; 
		return (
			<tr key={name}>
				<td>{name}</td>
			</tr>
		); 
	}


	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature</th>
						<th>Pressure</th>
						<th>Humidity</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		); 
	}
}


// function mapStateToProps(state) {
// 	return { weather: state.weather }; 
	// we can use state.weather and 'weather' as a property because we defined 'weather' as a property in reducers/index.js
// }

// ES6 way: 
function mapStateToProps({ weather }) {
	return { weather }; // { weather } === { weather: weather }
}

export default connect(mapStateToProps)(WeatherList); 























