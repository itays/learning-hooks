import React, {
	useState,
	FunctionComponent,
	useRef,
	useEffect,
	useReducer
} from 'react';

interface IStateType {
	running: boolean;
	lapse: number;
}

interface IActionType {
	type: string;
	now?: number;
	startTime?: number;
}

const reducer = (state: IStateType, action: IActionType): IStateType => {
	switch (action.type) {
		case 'LAPSE':
			return {
				...state,
				lapse: action.now = action.startTime as number
			};
		case 'TOGGLE_RUNNING':
			return {
				...state,
				running: !state.running
			};
		case 'CLEAR':
			return {
				...state,
				running: false,
				lapse: 0
			};
		default:
			return state;
	}
};

const Stopwatch: FunctionComponent<any> = () => {
	const [{ running, lapse }, dispatch] = useReducer(reducer, {
		running: false,
		lapse: 0
	} as never);
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
				dispatch({ type: 'LAPSE', now: Date.now(), startTime });
			}, 0);
		}
		dispatch({ type: 'TOGGLE_RUNNING' });
	};
	const onClear = () => {
		clearStopwatch();
		dispatch({ type: 'CLEAR' });
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
