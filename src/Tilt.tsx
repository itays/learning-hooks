import React, { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

const Tilt: React.SFC<any> = (props: any) => {
	const tiltRef = useRef<any>(null);
	useEffect(() => {
		VanillaTilt.init(tiltRef.current as HTMLElement);
		return () => tiltRef.current.vanillaTilt.destroy();
	}, []);
	return (
		<div ref={tiltRef} className="tilt-root">
			<div className="tilt-child">{props.children}</div>
		</div>
	);
};

export default Tilt;
