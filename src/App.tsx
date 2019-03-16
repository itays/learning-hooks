// tslint:disable-next-line:quotemark
import React, { Component } from 'react';
// import Counter from './Counter';
// import Tilt from './Tilt';
import Stopwatch from './Stopwatch';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <Counter />
				<hr /> */}
				{/* <Tilt>
					<div>vanilla-tilt.js</div>
				</Tilt> */}
				<Stopwatch />
			</div>
		);
	}
}

export default App;
