import React, {
	useState,
	FunctionComponent,
	useRef,
	useEffect,
	useReducer
} from 'react';

interface IStateType {
	running?: boolean;
	lapse?: number;
}

interface IActionType {
	type: string;
	now?: number;
	startTime?: number;
}

const reducer = (currentState: IStateType, newState: IStateType): IStateType => {
	return {...currentState, ...newState};
	// switch (action.type) {
	// 	case 'LAPSE':
	// 		return {
	// 			...state,
	// 			lapse: action.now && action.startTime ? action.now - action.startTime : 0
	// 		};
	// 	case 'TOGGLE_RUNNING':
	// 		return {
	// 			...state,
	// 			running: !state.running
	// 		};
	// 	case 'CLEAR':
	// 		return {
	// 			...state,
	// 			running: false,
	// 			lapse: 0
	// 		};
	// 	default:
	// 		return state;
	// }
};

const Stopwatch: FunctionComponent<any> = () => {
	const [{ running, lapse }, setState] = useReducer(reducer, {
		running: false,
		lapse: 0
	});
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
			const startTime = Date.now() - (lapse || 0);
			intervalRef.current = setInterval(() => {
				setState({ lapse: Date.now() - startTime});
			}, 0);
		}
		setState({ running: !running});
	};
	const onClear = () => {
		clearStopwatch();
		setState({ lapse: 0, running: false });
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
