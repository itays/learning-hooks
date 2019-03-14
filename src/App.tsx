import React, { Component } from 'react';
import Counter from './Counter';
import Tilt from './Tilt';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <Counter />
				<hr /> */}
				<Tilt>
					<div>vanilla-tilt.js</div>
				</Tilt>
			</div>
		);
	}
}

export default App;
