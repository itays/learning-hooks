import React, { useState, FunctionComponent, useRef, useEffect } from 'react';

const Stopwatch: FunctionComponent<any> = () => {
	const [lapse, setLapse] = useState(0);
	const [running, setRunning] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const clearStopwatch = () => {
		clearInterval(intervalRef.current as NodeJS.Timeout);
	};
	useEffect(() => {
		return () => clearStopwatch();
	}, []);
	const toggleRunning = () => {
		if (running) {
			clearStopwatch();
		} else {
			const startTime = Date.now() - lapse;
			intervalRef.current = setInterval(() => {
				setLapse(Date.now() - startTime);
			}, 0);
		}
		setRunning(!running);
	};
	const onClear = () => {
		clearStopwatch();
		setLapse(0);
		setRunning(false);
	};
	return (
		<div style={{ textAlign: 'center' }}>
			<label style={{ fontSize: '5em', display: 'block' }}>{lapse} ms</label>
			<button onClick={toggleRunning} style={buttonStyles}>
				{running ? 'Stop' : 'Start'}
			</button>
			<button onClick={onClear} style={buttonStyles}>
				Clear
			</button>
		</div>
	);
};

const buttonStyles: React.CSSProperties = {
	display: 'inline-block',
	font: 'normal 14px arial',
	background: 'none',
	padding: '10px'
};

export default Stopwatch;
