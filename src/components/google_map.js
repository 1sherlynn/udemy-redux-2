import React, { Component } from 'react'; 

class GoogleMap extends Component {
	componentDidMount() { //lifecycle method
		new google.maps.Map(this.refs.map, { //this.refs.map is where we will render the map
			zoom: 12, //level of zooming in and out 
			center: { //tells google maps where we want to center it 
				lat: this.props.lat,
				lng: this.props.lon //lng versus lon mismatch. Take note.
		}
	}); 
}

	render () {
		// we can then use this.refs.map
		return <div ref="map" />; 
	}
}

export default GoogleMap; 