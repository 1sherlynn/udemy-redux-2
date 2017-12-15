import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' }
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({ term: event.target.value});
	}

	onFormSubmit(event) {
		event.preventDefault(); 
		// this tells the browser not to submit the form

		// We need to featch weather data from API: 
		this.props.fetchWeather(this.state.term);

		// to clear the searchbar after entering
		this.setState({ term: '' });  
	}

	render() {
		return (
			<form onSubmit={this.onFormSubmit} className="input-group">
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchWeather }, dispatch); 
	// this allows the action creator (fetchWeather)'s return action to dispatch and flow to the middleware and then to the reducers 
}

export default connect(null, mapDispatchToProps)(SearchBar); 
//we pass null instead of state here because we do not need state in this container















